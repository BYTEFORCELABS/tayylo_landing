import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#F4F2EC",
    theme_color: "#454F2C",
    icons: [
      { src: "/brand/icon_olive.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/icon_beige.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
