import { FC, createRef } from "react";
import PDFTemplate from "../../assets/PDFTemplate";
import styles from "./PDFPreview.module.scss"
import { PreviewNavigation } from "../PreviewNavigation/PreviewNavigation";
import data from "../../assets/PDFTemplateMock.json"
import { useReactToPrint } from "react-to-print";

export const PDFPreview: FC = () => {
  const PDFRef = createRef()

  // Send print request to the Main process
  const handlePrint = function (target) {
    return new Promise(() => {
      console.log("forwarding print request to the main process...");

      const data = target.contentWindow.document.documentElement.outerHTML;
      //console.log(data);
      const blob = new Blob(["\uFEFF" + data], { type: "text/html;charset=utf-8",  });
      const url = URL.createObjectURL(blob);

      window.electronAPI.printComponent(url, (response) => {
        console.log("Main: ", response);
      });
      //console.log('Main: ', data);
    });
  };

  const handleChartPrint = useReactToPrint({
    content: () => PDFRef.current,
    documentTitle: "Chart component",
    print: handlePrint,
  });

  return (
    <div className={styles.PDFPreview}>
      <PreviewNavigation onClick={handleChartPrint} />
      <div className={styles.previewContainer}>
        <PDFTemplate 
          personalData={data.personalData} 
          haberesYDescuentos={data.haberesYDescuentos}
          totals={data.totals}
          month="JUNIO"
          year={2023}
          ref={PDFRef}
        />
        <PDFTemplate 
          personalData={data.personalData} 
          haberesYDescuentos={data.haberesYDescuentos}
          totals={data.totals}
          month="JUNIO"
          year={2023}
        />
        <PDFTemplate 
          personalData={data.personalData} 
          haberesYDescuentos={data.haberesYDescuentos}
          totals={data.totals}
          month="JUNIO"
          year={2023}
        />
        <PDFTemplate 
          personalData={data.personalData} 
          haberesYDescuentos={data.haberesYDescuentos}
          totals={data.totals}
          month="JUNIO"
          year={2023}
        />
      </div>
    </div>
  )
}