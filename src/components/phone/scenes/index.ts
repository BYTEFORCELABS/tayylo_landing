import type { ComponentType } from "react";
import { HistoryScene, historySteps } from "./history-scene";
import { MeasureScene, measureSteps } from "./measure-scene";
import { OrderScene, orderSteps } from "./order-scene";
import { ShareScene, shareSteps } from "./share-scene";
import { TodayScene, todaySteps } from "./today-scene";
import { TrackerScene, trackerSteps } from "./tracker-scene";

export interface SceneDef {
  id: string;
  title: string;
  kicker: string;
  body: string;
  steps: readonly number[];
  Component: ComponentType<{ step: number }>;
}

/** The six product demonstrations, in the order a real job happens. */
export const scenes: SceneDef[] = [
  {
    id: "today",
    kicker: "Home",
    title: "Your day at a glance",
    body: "This month’s takings, balances still owed and orders in production, with alerts for anything overdue, ready or due soon.",
    steps: todaySteps,
    Component: TodayScene,
  },
  {
    id: "measure",
    kicker: "Measure",
    title: "A keypad made for the tape",
    body: "One measurement in focus, the body diagram showing where the tape goes, ¼ ½ ¾ keys, and last visit’s number for a quick check.",
    steps: measureSteps,
    Component: MeasureScene,
  },
  {
    id: "history",
    kicker: "Clients",
    title: "Every visit, kept as a version",
    body: "Nothing gets overwritten. See what changed since the last visit, compare any two sets side by side and restore an old one in a tap.",
    steps: historySteps,
    Component: HistoryScene,
  },
  {
    id: "order",
    kicker: "Orders",
    title: "A new order in under a minute",
    body: "Pick the garment, snap the fabric, set the price, deposit and delivery date. The invoice is ready as soon as you save.",
    steps: orderSteps,
    Component: OrderScene,
  },
  {
    id: "tracker",
    kicker: "Production",
    title: "From cutting to collection",
    body: "Move each order through cutting, sewing, fitting and ready. Record every payment and watch the balance count down to zero.",
    steps: trackerSteps,
    Component: TrackerScene,
  },
  {
    id: "share",
    kicker: "Documents",
    title: "Invoices that carry your name",
    body: "Branded invoices and receipts with your logo and bank details, sent on WhatsApp, shared, printed or saved as a PDF.",
    steps: shareSteps,
    Component: ShareScene,
  },
];
