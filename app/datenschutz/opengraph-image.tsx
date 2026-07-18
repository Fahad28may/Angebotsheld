import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Datenschutzerklärung – AngebotsHeld";

export default function Image() {
  return renderOgImage("Datenschutzerklärung");
}
