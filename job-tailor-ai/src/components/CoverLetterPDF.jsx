// components/CoverLetterPDF.jsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Times-Roman",
    lineHeight: 1.6,
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 30,
    margin: 10,
  },
  section: {
    marginBottom: 12,
  },
  fromBlock: {
    marginBottom: 16,
  },
  toBlock: {
    marginBottom: 16,
  },
  date: {
    marginBottom: 16,
  },
  salutation: {
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 12,
  },
  closing: {
    marginTop: 8,
  },
  signature: {
    marginTop: 2,
  },
});

// Helper function to parse content
function parseCoverLetter(content) {
  const lines = content.split("\n").map((line) => line.trim()).filter(Boolean);

  let fromBlock = [];
  let toBlock = [];
  let salutation = "";
  let closing = "";
  let signature = "";
  let dateLine = "";

  const bodyLines = [];

  let state = "from";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect date line (e.g., August 8, 2025)
    if (!dateLine && /^\w+ \d{1,2}, \d{4}$/.test(line)) {
      dateLine = line;
      state = "to";
      continue;
    }

    // Detect salutation
    if (/^Dear\s.+[,|:]?$/.test(line)) {
      salutation = line;
      state = "body";
      continue;
    }

    // Detect closing (e.g., Sincerely,)
    if (/^(Sincerely|Regards|Thank you)[,]?$/.test(line)) {
      closing = line;
      signature = lines[i + 1] || "";
      break; // Done processing body
    }

    // Collect based on state
    if (state === "from") {
      fromBlock.push(line);
    } else if (state === "to") {
      toBlock.push(line);
    } else if (state === "body") {
      bodyLines.push(line);
    }
  }

  // Split body into paragraphs using empty lines
  const paragraphs = [];
  let currentParagraph = [];

  for (const line of bodyLines) {
    if (line.trim() === "") {
      if (currentParagraph.length > 0) {
        paragraphs.push(currentParagraph.join(" "));
        currentParagraph = [];
      }
    } else {
      currentParagraph.push(line.trim());
    }
  }

  // Push the last paragraph if any
  if (currentParagraph.length > 0) {
    paragraphs.push(currentParagraph.join("\n\n"));
  }

  return {
    fromBlock,
    dateLine,
    toBlock,
    salutation,
    paragraphs,
    closing,
    signature,
  };
}

const CoverLetterPDF = ({ content }) => {
  const {
    fromBlock,
    dateLine,
    toBlock,
    salutation,
    paragraphs,
    closing,
    signature,
  } = parseCoverLetter(content);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.borderContainer}>
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
          {salutation && (
            <View style={styles.salutation}>
              <Text>{salutation}</Text>
            </View>
          )}

          {/* Body Paragraphs */}
          {paragraphs.map((para, idx) => (
            <Text key={`para-${idx}`} style={styles.paragraph}>
              {para}
            </Text>
          ))}

          {/* Closing */}
          {closing && (
            <View style={styles.closing}>
              <Text>{closing}</Text>
            </View>
          )}

          {/* Signature */}
          {signature && (
            <View style={styles.signature}>
              <Text>{signature}</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default CoverLetterPDF;
