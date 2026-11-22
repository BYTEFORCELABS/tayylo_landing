import { links } from "@/config/site";

function availability() {
  const ios = Boolean(links.appStore);
  const android = Boolean(links.playStore);
  if (ios && android) return "Download Tayylo from the App Store or Google Play using the buttons on this page.";
  if (ios) return "Tayylo is on the App Store now, and the Android app is coming soon to Google Play.";
  if (android) return "Tayylo is on Google Play now, and the iPhone app is coming soon to the App Store.";
  return "The iPhone and Android apps are coming soon to the App Store and Google Play. The buttons on this page will take you straight to them as soon as they are live.";
}

export function getFaqs() {
  return [
    {
      q: "What is Tayylo?",
      a: "Tayylo is a workspace for made-to-measure professionals. It keeps every client’s measurements, history and orders in one place, with a fast measuring keypad, production tracking, payments, and branded invoices and receipts.",
    },
    {
      q: "Who is Tayylo for?",
      a: "Tailors, dressmakers, bespoke studios and alteration shops, especially those who already run their business from a phone. Clients can also create a customer account to browse style inspiration on Explore and save the looks they love.",
    },
    {
      q: "How does Tayylo help a tailoring business?",
      a: "It replaces the notebook. You can find any client in seconds, keep every measurement as a dated version, follow each order from pending to delivered, record payments so balances are always right, and send clients invoices, receipts and measurement cards with your studio’s name on them.",
    },
    {
      q: "Can I manage customer measurements?",
      a: "Yes. Choose from 15 starter templates across Western and traditional wear, record each point with the tape keypad (with ¼ ½ ¾ keys), and see a diagram of where the tape goes. Every session is saved as a new version, so you can compare visits and restore an older set.",
    },
    {
      q: "Does Tayylo work in inches and centimetres?",
      a: "Both. Pick your unit when you set up your studio and switch at any time in settings. You also choose the currency used on prices, invoices and receipts.",
    },
    {
      q: "Can I bring in my existing clients?",
      a: "Yes. Import clients from a CSV file or spreadsheet. You can also export a clients spreadsheet or a full backup of your clients, measurement history and orders whenever you like.",
    },
    {
      q: "Is Tayylo available on mobile?",
      a: "Tayylo is built for the phone first, with native apps for iPhone and Android. There is also a web app for working at a desk, and the same account works on both.",
    },
    {
      q: "How can I download Tayylo?",
      a: availability(),
    },
  ];
}
