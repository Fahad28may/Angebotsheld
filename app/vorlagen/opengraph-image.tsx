import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Angebotsvorlagen kostenlos – AngebotsHeld";

export default function Image() {
  return renderOgImage("Angebotsvorlagen zum Herunterladen", "Vorlagen");
}
