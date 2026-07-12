import type { ImageMetadata } from "astro";
import argusTraces from "../assets/screenshots/argus-traces.jpeg";

// Optional extra image shown inside a case study, below "What I built".
export interface DetailShot {
  src: ImageMetadata;
  caption: string;
}

export const detailShots: Record<string, DetailShot> = {
  argus: {
    src: argusTraces,
    caption:
      "Per-call trace view: model, token counts, cost, latency, and status for every step in a session.",
  },
};
