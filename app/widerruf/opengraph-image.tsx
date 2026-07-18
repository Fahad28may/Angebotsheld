import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Widerruf & Kündigung – AngebotsHeld";

export default function Image() {
  return renderOgImage("Widerruf & Kündigung");
}
