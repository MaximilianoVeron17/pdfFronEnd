import { FC, useState } from "react";
import PDFTemplate from "../../assets/PDFTemplate";
import styles from "./PDFPreview.module.scss"
import { PreviewNavigation } from "../PreviewNavigation/PreviewNavigation";
import data from "../../assets/PDFTemplateMock.json"

export const PDFPreview: FC = () => {
  // const [print, setPrint] = useState<Array<boolean>>([false,false,false,false])

  // const handlePrint = () => {
  //   print.forEach((value, index) => {
  //     const newPrint = [...print]
  //     newPrint[index] = true
  //     setPrint(newPrint)
  //   })
  // }

  return (
    <div className={styles.PDFPreview}>
      <PreviewNavigation onClick={() => console.log('print')}/>
      <div className={styles.previewContainer}>
        <PDFTemplate 
          personalData={data.personalData} 
          haberesYDescuentos={data.haberesYDescuentos}
          totals={data.totals}
          month="JUNIO"
          year={2023}
          // print={print[0]}
          // timeout={0}
        />
        <PDFTemplate 
          personalData={data.personalData} 
          haberesYDescuentos={data.haberesYDescuentos}
          totals={data.totals}
          month="JULIO"
          year={2023}
          // print={print[1]}
          // timeout={10}
        />
        <PDFTemplate 
          personalData={data.personalData} 
          haberesYDescuentos={data.haberesYDescuentos}
          totals={data.totals}
          month="MARZO"
          year={2023}
          // print={print[2]}
          // timeout={20}
        />
        <PDFTemplate 
          personalData={data.personalData} 
          haberesYDescuentos={data.haberesYDescuentos}
          totals={data.totals}
          month="ABRIL"
          year={2023}
          // print={print[3]}
          // timeout={30}
        />
      </div>
    </div>
  )
}