import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Ratgeber für Handwerksbetriebe – AngebotsHeld";

export default function Image() {
  return renderOgImage("Wissen für Handwerksbetriebe", "Ratgeber");
}
