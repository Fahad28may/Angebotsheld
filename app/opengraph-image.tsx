import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "AngebotsHeld – Angebote für Handwerksbetriebe";

export default function Image() {
  return renderOgImage("Angebote, die Ihre Kunden überzeugen. In 2 Minuten fertig.", "Für Maler, Fliesenleger & Gerüstbauer");
}
