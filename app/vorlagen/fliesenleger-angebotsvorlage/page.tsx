import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { VorlagenPageTemplate } from "../VorlagenPageTemplate";

const title = "Fliesenleger Angebotsvorlage kostenlos (Word / .docx)";
const description =
  "Kostenlose Angebotsvorlage für Fliesenlegerbetriebe als Word-Dokument. Direkt herunterladen und ausfüllen, oder in 2 Minuten automatisch generieren lassen.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/vorlagen/fliesenleger-angebotsvorlage` },
  openGraph: { title, description, url: `${siteConfig.url}/vorlagen/fliesenleger-angebotsvorlage` },
};

export default function FliesenlegerVorlagePage() {
  return <VorlagenPageTemplate trade="fliesenleger" />;
}
