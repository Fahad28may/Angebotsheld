// Generates the three trade Angebotsvorlage .docx files into
// /public/vorlagen/. One-off build script (run via `npm run generate:vorlagen`),
// not part of the Next.js request pipeline — the generated files are checked
// in as static assets and served directly from /public.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "..", "public", "vorlagen");

const ACCENT = "0F3D3E";
const INK = "1C2230";
const INK_SOFT = "4A5164";

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const tableBorders = {
  top: noBorder,
  bottom: noBorder,
  left: noBorder,
  right: noBorder,
  insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: "E4E1DA" },
  insideVertical: noBorder,
};

function label(text) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [new TextRun({ text, size: 15, color: "8A8F9E", allCaps: true })],
  });
}

function bodyLine(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 20 },
    children: [new TextRun({ text, size: 20, color: opts.bold ? INK : INK_SOFT, bold: !!opts.bold })],
  });
}

function headerCell(text, width) {
  return new TableCell({
    width: { size: width, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({
        children: [new TextRun({ text, size: 16, bold: true, color: INK_SOFT, allCaps: true })],
      }),
    ],
  });
}

function bodyCell(text, width, opts = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({
        alignment: opts.right ? AlignmentType.RIGHT : AlignmentType.LEFT,
        children: [new TextRun({ text, size: 18, color: INK_SOFT, bold: !!opts.bold })],
      }),
    ],
  });
}

function positionsTable(rows) {
  const header = new TableRow({
    children: [
      headerCell("Pos.", 8),
      headerCell("Bezeichnung", 42),
      headerCell("Menge", 12),
      headerCell("Einheit", 12),
      headerCell("Einzelpreis", 13),
      headerCell("Gesamtpreis", 13),
    ],
  });

  const body = rows.map(
    (row, index) =>
      new TableRow({
        children: [
          bodyCell(String(index + 1), 8),
          bodyCell(row.description, 42),
          bodyCell(row.quantity, 12, { right: true }),
          bodyCell(row.unit, 12),
          bodyCell(row.unitPrice, 13, { right: true }),
          bodyCell(row.total, 13, { right: true }),
        ],
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBorders,
    rows: [header, ...body],
  });
}

function summaryLine(text, value, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.RIGHT,
    spacing: { after: opts.after ?? 40 },
    children: [
      new TextRun({ text: `${text}   `, size: opts.big ? 22 : 18, color: opts.big ? INK : INK_SOFT, bold: !!opts.big }),
      new TextRun({ text: value, size: opts.big ? 22 : 18, color: opts.big ? ACCENT : INK, bold: true }),
    ],
  });
}

function buildDocument({ tradeLabel, introText, rows, netto, mwst, brutto }) {
  return new Document({
    sections: [
      {
        properties: { page: { margin: { top: 900, bottom: 900, left: 900, right: 900 } } },
        children: [
          // Sender block
          label("Absender"),
          bodyLine("[Ihr Firmenname]", { bold: true }),
          bodyLine("[Rechtsform] · [Straße und Hausnummer]"),
          bodyLine("[PLZ] [Ort] · [Telefon] · [E-Mail]"),
          bodyLine("Steuernummer / USt-IdNr.: [ausfüllen]", { after: 300 }),

          // Recipient block
          label("Empfänger"),
          bodyLine("[Name des Kunden]", { bold: true }),
          bodyLine("[Straße und Hausnummer]"),
          bodyLine("[PLZ] [Ort]", { after: 300 }),

          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 100 },
            children: [new TextRun({ text: "Angebot Nr. A-2026-001", bold: true, size: 32, color: ACCENT })],
          }),
          bodyLine("Datum: [TT.MM.JJJJ]     Gültig bis: [TT.MM.JJJJ]", { after: 240 }),

          new Paragraph({
            spacing: { after: 260 },
            children: [new TextRun({ text: introText, size: 20, color: INK_SOFT })],
          }),

          positionsTable(rows),

          new Paragraph({ spacing: { before: 240, after: 40 } }),
          summaryLine("Zwischensumme (netto)", netto),
          summaryLine("zzgl. MwSt. 19 %", mwst),
          summaryLine("Gesamtbetrag", brutto, { big: true, after: 260 }),

          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({
                text:
                  "Zahlbar innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug. Wir freuen uns auf Ihre Beauftragung.",
                size: 18,
                color: INK_SOFT,
                italics: true,
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 600 },
            children: [new TextRun({ text: "Ort, Datum: ___________________________", size: 18, color: INK_SOFT })],
          }),
          new Paragraph({
            spacing: { before: 200, after: 400 },
            children: [
              new TextRun({ text: `Unterschrift ${tradeLabel}betrieb: ___________________________`, size: 18, color: INK_SOFT }),
            ],
          }),

          new Paragraph({
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: "E4E1DA" } },
            spacing: { before: 200 },
            children: [
              new TextRun({ text: "Erstellt von AngebotsHeld24.de", size: 14, color: "8A8F9E" }),
            ],
          }),
        ],
      },
    ],
  });
}

const templates = [
  {
    file: "maler-angebotsvorlage.docx",
    tradeLabel: "Maler",
    introText:
      "vielen Dank für Ihre Anfrage. Gerne unterbreiten wir Ihnen folgendes Angebot für die geplanten Malerarbeiten:",
    rows: [
      { description: "Innenanstrich Wände, 2-fach", quantity: "40,23", unit: "m²", unitPrice: "17,00 €", total: "683,91 €" },
      { description: "Deckenanstrich, 1-fach", quantity: "20,00", unit: "m²", unitPrice: "9,50 €", total: "190,00 €" },
      { description: "Material: Farbe", quantity: "17", unit: "l", unitPrice: "12,00 €", total: "204,00 €" },
      { description: "Abklebearbeiten / Abdeckmaterial", quantity: "60,23", unit: "m²", unitPrice: "1,20 €", total: "72,28 €" },
    ],
    netto: "1.150,19 €",
    mwst: "218,54 €",
    brutto: "1.368,73 €",
  },
  {
    file: "fliesenleger-angebotsvorlage.docx",
    tradeLabel: "Fliesenleger",
    introText:
      "vielen Dank für Ihre Anfrage. Gerne unterbreiten wir Ihnen folgendes Angebot für die geplanten Fliesenarbeiten:",
    rows: [
      { description: "Untergrundvorbereitung / Ausgleichsmasse", quantity: "12,00", unit: "m²", unitPrice: "9,00 €", total: "108,00 €" },
      { description: "Fliesen verlegen (Boden, Großformat)", quantity: "12,00", unit: "m²", unitPrice: "47,50 €", total: "570,00 €" },
      { description: "Material: Fliesen (inkl. Verschnitt)", quantity: "13,80", unit: "m²", unitPrice: "32,00 €", total: "441,60 €" },
      { description: "Verfugen", quantity: "12,00", unit: "m²", unitPrice: "6,00 €", total: "72,00 €" },
    ],
    netto: "1.191,60 €",
    mwst: "226,40 €",
    brutto: "1.418,00 €",
  },
  {
    file: "geruestbau-angebotsvorlage.docx",
    tradeLabel: "Gerüstbau",
    introText:
      "vielen Dank für Ihre Anfrage. Gerne unterbreiten wir Ihnen folgendes Angebot für die geplanten Gerüstbauarbeiten:",
    rows: [
      { description: "Auf- und Abbau (Fassadengerüst)", quantity: "108,00", unit: "m²", unitPrice: "9,50 €", total: "1.026,00 €" },
      { description: "Grundmiete (4 Wochen inklusive)", quantity: "108,00", unit: "m²", unitPrice: "4,50 €", total: "486,00 €" },
      { description: "Gerüsttreppe", quantity: "1", unit: "Stk.", unitPrice: "120,00 €", total: "120,00 €" },
    ],
    netto: "1.632,00 €",
    mwst: "310,08 €",
    brutto: "1.942,08 €",
  },
];

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const template of templates) {
    const doc = buildDocument(template);
    const buffer = await Packer.toBuffer(doc);
    const outPath = path.join(OUTPUT_DIR, template.file);
    fs.writeFileSync(outPath, buffer);
    console.log(`Generated ${outPath} (${buffer.length} bytes)`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
