import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Fliesenleger Angebotsvorlage kostenlos";

export default function Image() {
  return renderOgImage("Fliesenleger-Angebotsvorlage kostenlos", "Vorlage");
}
