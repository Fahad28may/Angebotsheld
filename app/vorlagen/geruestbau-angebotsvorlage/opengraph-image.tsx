import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Gerüstbau Angebotsvorlage kostenlos";

export default function Image() {
  return renderOgImage("Gerüstbau-Angebotsvorlage kostenlos", "Vorlage");
}
