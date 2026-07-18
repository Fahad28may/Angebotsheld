import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Maler Angebotsvorlage kostenlos";

export default function Image() {
  return renderOgImage("Maler-Angebotsvorlage kostenlos", "Vorlage");
}
