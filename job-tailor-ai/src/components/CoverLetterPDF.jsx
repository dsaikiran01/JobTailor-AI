// components/CoverLetterPDF.jsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
    fontFamily: "Times-Roman",
    lineHeight: 1.6,
  },
  section: {
    marginBottom: 12,
  },
  fromBlock: {
    marginBottom: 20,
  },
  toBlock: {
    marginBottom: 20,
  },
  date: {
    marginBottom: 20,
  },
  salutation: {
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 12,
  },
  closing: {
    marginTop: 20,
  },
  signature: {
    marginTop: 8,
  },
});

const CoverLetterPDF = ({ content }) => {
  const lines = content.split("\n").map((line) => line.trim());
  const fromBlock = lines.slice(0, 4).filter(Boolean);
  const dateLine = lines[4] || "";
  const toBlock = lines.slice(5, 8).filter(Boolean);
  const salutation = lines[8] || "";

  const bodyLines = lines.slice(9);
  const bodyText = bodyLines.join("\n").trim();

  // Split paragraphs by double line breaks
  const paragraphs = bodyText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* From Block */}
        <View style={styles.fromBlock}>
          {fromBlock.map((line, idx) => (
            <Text key={`from-${idx}`}>{line}</Text>
          ))}
        </View>

        {/* Date */}
        {dateLine && (
          <View style={styles.date}>
            <Text>{dateLine}</Text>
          </View>
        )}

        {/* To Block */}
        <View style={styles.toBlock}>
          {toBlock.map((line, idx) => (
            <Text key={`to-${idx}`}>{line}</Text>
          ))}
        </View>

        {/* Salutation */}
        <View style={styles.salutation}>
          <Text>{salutation}</Text>
        </View>

        {/* Body Paragraphs */}
        {paragraphs.map((para, idx) => (
          <Text key={`para-${idx}`} style={styles.paragraph}>
            {para}
          </Text>
        ))}
      </Page>
    </Document>
  );
};

export default CoverLetterPDF;
