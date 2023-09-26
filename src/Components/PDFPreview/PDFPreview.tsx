import { FC, useContext } from "react";
import PDFTemplate from "../../assets/PDFTemplate";
import styles from "./PDFPreview.module.scss"
import { PreviewNavigation } from "../PreviewNavigation/PreviewNavigation";
import { GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";

export const PDFPreview: FC = () => {
  const { finalData, handleSaveToDatabase, PersonalData, Bonifications, Discounts, Family } = useContext(GlobalContext) as GlobalContextType

  const handleOnSave = () => {
    handleSaveToDatabase({
      PersonalData,
      Bonifications,
      Discounts,
      Family
    })
  }
  return (
    <div className={styles.PDFPreview}>
      <PreviewNavigation onClick={handleOnSave}/>
      <div className={styles.previewContainer} style={{alignItems: 'center'}}>
        {finalData.map((data) => (
          <PDFTemplate 
            personalData={data.personalData} 
            haberesYDescuentos={data.haberesYDescuentos}
            totals={data.totals}
            family={data.family}
            month="JUNIO"
            year={2023}
          />
        ))}
      </div>
    </div>
  )
}