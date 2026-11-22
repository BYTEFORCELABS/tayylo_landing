"use client";

import { motion } from "motion/react";
import { ArrowDown, FileJson, FileSpreadsheet } from "lucide-react";
import { Avatar } from "@/components/phone/app-ui";
import { EASE } from "@/lib/motion";

const ROWS = [
  ["Claire Moreau", "+33 6 12 48 90 17"],
  ["Kofi Mensah", "+233 24 555 0187"],
  ["Nadia Haddad", "+971 50 555 0133"],
];

/** Spreadsheet rows becoming Tayylo clients, with the export options below. */
export function DataVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]" role="img" aria-label="Clients imported from a spreadsheet into Tayylo, and export as a CSV spreadsheet or full JSON backup">
      <div className="rounded-[24px] bg-surface-raised p-5 shadow-[var(--shadow-float)] ring-1 ring-border/60">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-text-secondary">
          <FileSpreadsheet size={17} strokeWidth={1.75} className="text-success" /> clients.csv
        </p>
        <div className="tabular mt-3 overflow-hidden rounded-[12px] border border-border text-[12.5px]">
          <div className="grid grid-cols-2 bg-surface px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
            <span>Name</span>
            <span>Phone</span>
          </div>
          {ROWS.map(([n, p], i) => (
            <motion.div
              key={n}
              className="grid grid-cols-2 border-t border-divider px-3 py-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12 }}
            >
              <span>{n}</span>
              <span className="text-text-secondary">{p}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center py-3 text-olive">
        <motion.span initial={{ y: -6, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 0.5 }}>
          <ArrowDown size={22} strokeWidth={1.75} />
        </motion.span>
      </div>

      <div className="rounded-[24px] bg-surface-raised p-3 shadow-[var(--shadow-float)] ring-1 ring-border/60">
        {ROWS.map(([n, p], i) => (
          <motion.div
            key={n}
            className="flex items-center gap-3 rounded-[14px] px-2 py-2.5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 + i * 0.12, duration: 0.5, ease: EASE.emphasized }}
          >
            <Avatar name={n} size={38} rounded />
            <span className="min-w-0 flex-1">
              <span className="block text-[14.5px] font-semibold">{n}</span>
              <span className="tabular block text-[12.5px] text-text-tertiary">{p}</span>
            </span>
            <span className="rounded-full bg-olive-soft px-2 text-[11px] font-semibold leading-5 text-olive-deep">Imported</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-[18px] border border-border bg-surface p-4">
          <FileSpreadsheet size={20} strokeWidth={1.75} className="text-olive" />
          <p className="mt-2 text-[14px] font-semibold">Clients spreadsheet</p>
          <p className="text-[12px] text-text-tertiary">CSV · opens in Excel, Sheets or Numbers</p>
        </div>
        <div className="rounded-[18px] border border-border bg-surface p-4">
          <FileJson size={20} strokeWidth={1.75} className="text-olive" />
          <p className="mt-2 text-[14px] font-semibold">Full backup</p>
          <p className="text-[12px] text-text-tertiary">JSON · clients, measurement history and orders</p>
        </div>
      </div>
    </div>
  );
}
