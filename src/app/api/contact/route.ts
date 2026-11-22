// ------------------------------------------------------------------
// Contact form endpoint.
//
// Messages are delivered with Resend (https://resend.com) over its REST
// API, so no extra package is needed. Set these on the server:
//
//   RESEND_API_KEY        API key from Resend
//   CONTACT_TO_EMAIL      Inbox that receives messages (falls back to NEXT_PUBLIC_CONTACT_EMAIL)
//   CONTACT_FROM_EMAIL    Verified sender, e.g. "Tayylo <hello@yourdomain.com>"
//
// Without them the endpoint answers 503 and the form offers the visitor
// a pre-filled email instead, so nothing is ever silently dropped.
// ------------------------------------------------------------------

import { CONTACT_TOPICS } from "@/content/contact";

const MAX = { name: 120, email: 200, studio: 160, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (str(body.company, 200)) return Response.json({ ok: true });

  const name = str(body.name, MAX.name);
  const email = str(body.email, MAX.email);
  const studio = str(body.studio, MAX.studio);
  const message = str(body.message, MAX.message);
  const topic = CONTACT_TOPICS.find(t => t === body.topic) ?? "Something else";

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please write a little more so we can help.";
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Studio", studio || "Not given"],
    ["Topic", topic],
  ];
  const html = `
    <h2 style="font-family:sans-serif">New message from the Tayylo website</h2>
    <table style="font-family:sans-serif;font-size:14px">${rows
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#6b6d62">${k}</td><td>${escapeHtml(v)}</td></tr>`)
      .join("")}</table>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Tayylo contact: ${topic} from ${name}`,
      html,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
