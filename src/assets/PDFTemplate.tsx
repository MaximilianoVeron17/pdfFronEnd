import { Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {}
})
const PDFTemplate = () => (
  <Page size="A4" style={styles.page}>
    <Text>Hola</Text>
  </Page>
)

export default PDFTemplate