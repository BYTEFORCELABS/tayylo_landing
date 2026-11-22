// Sample studio shown inside the phone demonstrations. Every screen, status,
// field and label mirrors the real Tayylo app; only the people are examples.

export type OrderStatus = "pending" | "cutting" | "sewing" | "fitting" | "alterations" | "ready" | "delivered" | "overdue";

export const studio = {
  owner: "Adaeze",
  name: "Adaeze Atelier",
  currency: "USD",
} as const;

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: studio.currency, maximumFractionDigits: 0 });
export const formatMoney = (n: number) => money.format(n);

export interface DemoOrder {
  number: string;
  garment: string;
  client: string;
  note: string;
  price: number;
  status: OrderStatus;
  due: string;
  dueTone: "danger" | "warning" | "muted";
  image?: string;
  icon: string;
}

export const orders: DemoOrder[] = [
  {
    number: "ORD-1006",
    garment: "Agbada",
    client: "Ngozi Eze",
    note: "For her father, cream and gold embroidery",
    price: 950,
    status: "overdue",
    due: "2 days overdue",
    dueTone: "danger",
    image: "/images/fabrics/aso-oke.jpg",
    icon: "agbada",
  },
  {
    number: "ORD-1009",
    garment: "Suit",
    client: "John Smith",
    note: "Navy two-piece, half lining",
    price: 1850,
    status: "fitting",
    due: "Due tomorrow",
    dueTone: "warning",
    image: "/images/fabrics/indigo-print.jpg",
    icon: "two-piece-suit",
  },
  {
    number: "ORD-1011",
    garment: "Senator Suit",
    client: "Kofi Mensah",
    note: "Wedding guest, charcoal linen",
    price: 720,
    status: "sewing",
    due: "Due in 5 days",
    dueTone: "muted",
    image: "/images/fabrics/charcoal-linen.jpg",
    icon: "senator-wear",
  },
  {
    number: "ORD-1012",
    garment: "Saree Blouse",
    client: "Priya Nair",
    note: "Boat neck, elbow sleeves",
    price: 260,
    status: "cutting",
    due: "Due 4 Dec",
    dueTone: "muted",
    image: "/images/fabrics/lace.jpg",
    icon: "blouse",
  },
];

export const clients = [
  { name: "Claire Moreau", phone: "+33 6 12 48 90 17", last: "Measured 3 days ago" },
  { name: "Ngozi Eze", phone: "+234 803 555 0192", last: "Measured 2 weeks ago" },
  { name: "Priya Nair", phone: "+91 98200 55142", last: "Measured last month" },
  { name: "Kofi Mensah", phone: "+233 24 555 0187", last: "Measured 6 months ago" },
  { name: "John Smith", phone: "+1 415 555 0142", last: "Measured in March" },
  { name: "Nadia Haddad", phone: "+971 50 555 0133", last: "Measured last week" },
];

export const categories = [
  { label: "Suits", image: "/images/garments/suit.jpg" },
  { label: "Senator", image: "/images/garments/senator.jpg" },
  { label: "Dresses", image: "/images/garments/dress.jpg" },
  { label: "Agbada", image: "/images/garments/agbada.jpg" },
  { label: "Kaftan", image: "/images/garments/kaftan.jpg" },
];

/** Suit template fields used by the capture demo (labels and groups as in the seed templates). */
export const captureFields = [
  { key: "chest", label: "Chest", group: "Torso", overlay: "chest", value: ["4", "2", "½"], last: "41½" },
  { key: "waist", label: "Waist", group: "Torso", overlay: "waist", value: ["3", "6"], last: "35" },
  { key: "shoulder", label: "Shoulder", group: "Torso", overlay: "shoulder-width", value: ["1", "8", "¼"], last: "18¼" },
] as const;

/** Measurement history: the current set compared with the March set. */
export const measurementSet = [
  { label: "Chest", value: "42½", delta: "+1" },
  { label: "Waist", value: "36", delta: "+1" },
  { label: "Shoulder", value: "18¼", delta: null },
  { label: "Sleeve length", value: "25", delta: null },
  { label: "Neck", value: "16½", delta: "+½" },
  { label: "Bicep", value: "14", delta: null },
  { label: "Trouser length", value: "41", delta: null },
  { label: "Inseam", value: "32", delta: null },
];

export const measurementHistory = [
  { date: "19 Nov 2026", template: "Suit", current: true, fields: 18 },
  { date: "11 Mar 2026", template: "Suit", current: false, fields: 18 },
  { date: "02 Oct 2025", template: "Shirt", current: false, fields: 8 },
];

/** Production path exactly as the app's tracker draws it. */
export const productionPath = [
  { key: "pending", label: "Pending", line: "Order received, waiting to be cut" },
  { key: "cutting", label: "Cutting", line: "Fabric is being marked and cut" },
  { key: "sewing", label: "Sewing", line: "Panels are being stitched together" },
  { key: "fitting", label: "Fitting", line: "Ready for the client to try on" },
  { key: "ready", label: "Ready", line: "Finished and waiting for pickup" },
  { key: "delivered", label: "Delivered", line: "Collected by the client" },
] as const;

export const paymentMethods = ["Transfer", "Cash", "Card / POS", "Mobile money"] as const;
