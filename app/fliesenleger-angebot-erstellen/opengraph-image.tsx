import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Angebot erstellen für Fliesenleger – kostenloser Generator";

export default function Image() {
  return renderOgImage("Angebot für Fliesenarbeiten in wenigen Minuten erstellen", "Für Fliesenleger");
}
