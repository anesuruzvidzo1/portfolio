import type { ImageMetadata } from "astro";
import argus from "../assets/screenshots/argus.png";
import basiniq from "../assets/screenshots/basiniq.jpeg";
import flareiq from "../assets/screenshots/flareiq.png";
import closureiq from "../assets/screenshots/closureiq.jpeg";
import lumin from "../assets/screenshots/lumin.jpeg";
import munda from "../assets/screenshots/munda.jpeg";

// Maps a project id to its hero screenshot. Projects not listed here fall back
// to the metric placeholder until a screenshot is added. "focus" controls how
// the image is cropped inside the frame: "top" suits dashboards (keep the
// header), "center" suits maps and charts.
export interface Screenshot {
  src: ImageMetadata;
  focus: "top" | "center";
}

export const screenshots: Record<string, Screenshot> = {
  argus: { src: argus, focus: "top" },
  basiniq: { src: basiniq, focus: "top" },
  flareiq: { src: flareiq, focus: "center" },
  closureiq: { src: closureiq, focus: "top" },
  lumin: { src: lumin, focus: "top" },
  munda: { src: munda, focus: "top" },
};
