import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { VorlagenPageTemplate } from "../VorlagenPageTemplate";

const title = "Gerüstbau Angebotsvorlage kostenlos (Word / .docx)";
const description =
  "Kostenlose Angebotsvorlage für Gerüstbaubetriebe als Word-Dokument. Direkt herunterladen und ausfüllen, oder in 2 Minuten automatisch generieren lassen.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/vorlagen/geruestbau-angebotsvorlage` },
  openGraph: { title, description, url: `${siteConfig.url}/vorlagen/geruestbau-angebotsvorlage` },
};

export default function GeruestbauVorlagePage() {
  return <VorlagenPageTemplate trade="geruestbau" />;
}
