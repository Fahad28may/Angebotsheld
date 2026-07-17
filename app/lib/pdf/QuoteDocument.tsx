import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import type { BaseQuoteState } from "@/lib/types";
import { calculateTotals, lineItemTotal } from "@/lib/calculations/totals";
import { formatCurrency, formatDateDE, formatNumber, addDays } from "@/lib/format";
import { siteConfig } from "@/lib/siteConfig";

const ACCENT = "#0F3D3E";
const INK = "#1C2230";
const INK_SOFT = "#4A5164";
const LINE = "#D9D6CE";

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 64,
    paddingHorizontal: 48,
    fontSize: 9.5,
    fontFamily: "Helvetica",
    color: INK,
  },
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  addressBlock: {
    maxWidth: 220,
  },
  senderLine: {
    fontSize: 7.5,
    color: INK_SOFT,
    marginBottom: 8,
  },
  blockLabel: {
    fontSize: 7,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: INK_SOFT,
    marginBottom: 4,
  },
  companyName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  addressText: {
    fontSize: 9.5,
    lineHeight: 1.4,
  },
  metaBlock: {
    alignItems: "flex-end",
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  metaLabel: {
    fontSize: 8.5,
    color: INK_SOFT,
    marginRight: 8,
  },
  metaValue: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
  },
  title: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: ACCENT,
    marginBottom: 6,
  },
  intro: {
    fontSize: 9.5,
    color: INK_SOFT,
    marginBottom: 18,
    lineHeight: 1.5,
  },
  table: {
    marginTop: 6,
  },
  tableHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: ACCENT,
    paddingBottom: 6,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: LINE,
    paddingVertical: 6,
  },
  colPos: { width: 26, fontSize: 8.5 },
  colDesc: { flex: 1, fontSize: 8.5, paddingRight: 8 },
  colQty: { width: 55, fontSize: 8.5, textAlign: "right" },
  colUnit: { width: 40, fontSize: 8.5, textAlign: "right" },
  colPrice: { width: 65, fontSize: 8.5, textAlign: "right" },
  colTotal: { width: 70, fontSize: 8.5, textAlign: "right" },
  headerText: {
    fontSize: 7.5,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    color: INK_SOFT,
  },
  totalsBlock: {
    marginTop: 14,
    alignSelf: "flex-end",
    width: 220,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  totalsRowFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 6,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: ACCENT,
  },
  totalsLabel: { fontSize: 9, color: INK_SOFT },
  totalsValue: { fontSize: 9, fontFamily: "Helvetica-Bold" },
  totalsValueFinal: { fontSize: 11, fontFamily: "Helvetica-Bold", color: ACCENT },
  kleinunternehmerNote: {
    fontSize: 8,
    color: INK_SOFT,
    marginTop: 6,
    textAlign: "right",
  },
  section: {
    marginTop: 26,
  },
  paragraph: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: INK_SOFT,
    marginBottom: 10,
  },
  signatureRow: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBlock: {
    width: 200,
  },
  signatureLine: {
    borderTopWidth: 0.75,
    borderTopColor: INK,
    marginTop: 32,
    paddingTop: 4,
  },
  signatureLabel: {
    fontSize: 8,
    color: INK_SOFT,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.5,
    color: INK_SOFT,
    borderTopWidth: 0.5,
    borderTopColor: LINE,
    paddingTop: 8,
  },
});

interface QuoteDocumentProps {
  quote: BaseQuoteState;
  tradeLabel: string;
  isPro?: boolean;
}

export function QuoteDocument({ quote, tradeLabel, isPro = false }: QuoteDocumentProps) {
  const { company, customer, meta, lineItems } = quote;
  const totals = calculateTotals(lineItems, meta);
  const quoteDate = meta.quoteDate ? new Date(meta.quoteDate) : new Date();
  const validUntil = addDays(quoteDate, meta.validityDays);

  return (
    <Document
      title={`Angebot ${meta.quoteNumber} – ${company.companyName || siteConfig.name}`}
      author={company.companyName || siteConfig.name}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.addressRow}>
          <View style={styles.addressBlock}>
            <Text style={styles.senderLine}>
              {[company.companyName, company.street, `${company.postalCode} ${company.city}`]
                .filter(Boolean)
                .join(" · ")}
            </Text>
            <Text style={styles.blockLabel}>Empfänger</Text>
            <Text style={styles.addressText}>{customer.name}</Text>
            <Text style={styles.addressText}>{customer.street}</Text>
            <Text style={styles.addressText}>
              {customer.postalCode} {customer.city}
            </Text>
          </View>

          <View style={styles.metaBlock}>
            <Text style={styles.companyName}>{company.companyName}</Text>
            <Text style={styles.addressText}>{company.legalForm}</Text>
            <Text style={styles.addressText}>{company.street}</Text>
            <Text style={styles.addressText}>
              {company.postalCode} {company.city}
            </Text>
            {company.contactName ? <Text style={styles.addressText}>{company.contactName}</Text> : null}
            {company.phone ? <Text style={styles.addressText}>Tel. {company.phone}</Text> : null}
            {company.email ? <Text style={styles.addressText}>{company.email}</Text> : null}
            {company.taxNumber ? <Text style={styles.addressText}>Steuernr. {company.taxNumber}</Text> : null}
            {company.vatId ? <Text style={styles.addressText}>USt-IdNr. {company.vatId}</Text> : null}
          </View>
        </View>

        <Text style={styles.title}>Angebot Nr. {meta.quoteNumber}</Text>
        <View style={{ marginBottom: 14 }}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Datum:</Text>
            <Text style={styles.metaValue}>{formatDateDE(quoteDate)}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Gültig bis:</Text>
            <Text style={styles.metaValue}>{formatDateDE(validUntil)}</Text>
          </View>
        </View>

        <Text style={styles.intro}>
          Sehr geehrte(r) {customer.name}, vielen Dank für Ihre Anfrage. Gerne unterbreiten wir Ihnen
          folgendes Angebot für die geplanten {tradeLabel}-Arbeiten:
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.colPos, styles.headerText]}>Pos.</Text>
            <Text style={[styles.colDesc, styles.headerText]}>Bezeichnung</Text>
            <Text style={[styles.colQty, styles.headerText]}>Menge</Text>
            <Text style={[styles.colUnit, styles.headerText]}>Einheit</Text>
            <Text style={[styles.colPrice, styles.headerText]}>Einzelpreis</Text>
            <Text style={[styles.colTotal, styles.headerText]}>Gesamtpreis</Text>
          </View>
          {lineItems.map((item, index) => (
            <View style={styles.tableRow} key={item.id} wrap={false}>
              <Text style={styles.colPos}>{index + 1}</Text>
              <Text style={styles.colDesc}>{item.description}</Text>
              <Text style={styles.colQty}>{formatNumber(item.quantity)}</Text>
              <Text style={styles.colUnit}>{item.unit}</Text>
              <Text style={styles.colPrice}>{formatCurrency(item.unitPrice)}</Text>
              <Text style={styles.colTotal}>{formatCurrency(lineItemTotal(item))}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsBlock}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Zwischensumme (netto)</Text>
            <Text style={styles.totalsValue}>{formatCurrency(totals.netTotal)}</Text>
          </View>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>
              {meta.vatMode === "kleinunternehmer" ? "Umsatzsteuer" : `MwSt. ${formatNumber(meta.vatRate)}%`}
            </Text>
            <Text style={styles.totalsValue}>{formatCurrency(totals.vatAmount)}</Text>
          </View>
          <View style={styles.totalsRowFinal}>
            <Text style={styles.totalsLabel}>Gesamtbetrag</Text>
            <Text style={styles.totalsValueFinal}>{formatCurrency(totals.grossTotal)}</Text>
          </View>
        </View>

        {meta.vatMode === "kleinunternehmer" ? (
          <Text style={styles.kleinunternehmerNote}>
            Gemäß §19 UStG wird keine Umsatzsteuer berechnet.
          </Text>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.paragraph}>{meta.paymentTermsText}</Text>
          <Text style={styles.paragraph}>{meta.closingText}</Text>
        </View>

        <View style={styles.signatureRow}>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine}>
              <Text style={styles.signatureLabel}>Ort, Datum</Text>
            </View>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine}>
              <Text style={styles.signatureLabel}>Unterschrift {company.companyName || "Auftragnehmer"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>
            {isPro ? company.companyName : `Erstellt mit ${siteConfig.name} – kostenloser Angebots-Generator`}
          </Text>
          <Text
            render={({ pageNumber, totalPages }) => `Seite ${pageNumber} von ${totalPages}`}
            fixed
          />
        </View>
      </Page>
    </Document>
  );
}
