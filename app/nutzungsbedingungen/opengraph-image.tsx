import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Nutzungsbedingungen – AngebotsHeld";

export default function Image() {
  return renderOgImage("Nutzungsbedingungen");
}
