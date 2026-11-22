import Image from "next/image";
import { GarmentGlyph } from "@/components/brand/garment-glyph";
import { formatMoney, type DemoOrder } from "@/content/demo";
import { cn } from "@/lib/utils";
import { Avatar, StatusTag } from "./app-ui";

const DUE: Record<DemoOrder["dueTone"], string> = {
  danger: "text-danger",
  warning: "text-warning",
  muted: "text-text-tertiary",
};

/** The app's phone-first order row (photo + number, garment, client chip, price/status/due). */
export function OrderRow({ order, className }: { order: DemoOrder; className?: string }) {
  return (
    <div className={cn("flex items-center gap-[14px] px-1 py-3", className)}>
      <div className="relative flex size-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-border/60 bg-surface-raised">
        {order.image ? (
          <Image src={order.image} alt="" fill sizes="72px" className="object-cover" />
        ) : (
          <GarmentGlyph icon={order.icon} size={34} className="text-ink/80" />
        )}
        <span className="tabular absolute inset-x-1 bottom-1 rounded-[6px] bg-white/90 py-px text-center text-[9px] font-semibold">
          #{order.number}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[16px] font-medium leading-[22px]">{order.garment}</p>
        <p className="mt-0.5 truncate text-[13px] text-text-secondary">{order.note}</p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <Avatar name={order.client} size={20} rounded />
          <span className="truncate text-[13px] text-text-secondary">{order.client}</span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="tabular text-[15px] font-semibold">{formatMoney(order.price)}</span>
        <StatusTag status={order.status} size="sm" />
        <span className={cn("tabular text-[11.5px] font-medium", DUE[order.dueTone])}>{order.due}</span>
      </div>
    </div>
  );
}
