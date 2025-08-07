// components/CoverLetterPDF.jsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Times-Roman",
  },
  section: {
    marginBottom: 10,
    lineHeight: 1.5,
  },
});

const CoverLetterPDF = ({ content }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {content.split("\n").map((line, idx) => (
            <Text key={idx}>{line}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CoverLetterPDF;
