import type { ImageMetadata } from "astro";
import flare0 from "../assets/carousel/flareiq-000.jpg";
import flare1 from "../assets/carousel/flareiq-001.jpg";
import flare2 from "../assets/carousel/flareiq-002.jpg";
import flare3 from "../assets/carousel/flareiq-003.jpg";
import flare4 from "../assets/carousel/flareiq-004.jpg";

// Optional multi-image galleries shown on a case-study page, in order.
// FlareIQ's is the data-story carousel that ran on LinkedIn.
export const galleries: Record<string, ImageMetadata[]> = {
  flareiq: [flare0, flare1, flare2, flare3, flare4],
};
