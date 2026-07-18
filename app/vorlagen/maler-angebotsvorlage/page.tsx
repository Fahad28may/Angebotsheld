import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { VorlagenPageTemplate } from "../VorlagenPageTemplate";

const title = "Maler Angebotsvorlage kostenlos (Word / .docx)";
const description =
  "Kostenlose Angebotsvorlage für Malerbetriebe als Word-Dokument. Direkt herunterladen und ausfüllen, oder in 2 Minuten automatisch generieren lassen.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/vorlagen/maler-angebotsvorlage` },
  openGraph: { title, description, url: `${siteConfig.url}/vorlagen/maler-angebotsvorlage` },
};

export default function MalerVorlagePage() {
  return <VorlagenPageTemplate trade="maler" />;
}
