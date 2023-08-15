import { Document, Page, Text, View, PDFViewer } from "@react-pdf/renderer";
import { FC, useContext } from "react";
import Button from "../Button";
import { GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";

export const PDFPreview: FC = () => {
  const {updateCurrentPage} = useContext(GlobalContext) as GlobalContextType;
  return (
    <div>
      <PDFViewer>
        <Document>
          <Page size="A4">
            <View>
              <Text>Hola</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
      <Button onClick={() => updateCurrentPage('Datos')}>{'< Back'}</Button>
    </div>
  )
}