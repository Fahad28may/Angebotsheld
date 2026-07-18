import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Preise – AngebotsHeld";

export default function Image() {
  return renderOgImage("Einfach, transparent, ohne Überraschungen", "Preise");
}
