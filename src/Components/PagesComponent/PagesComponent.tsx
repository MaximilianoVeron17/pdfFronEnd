import { FC, useContext } from "react";
import { GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";
import LandingSection from "../LandingSection";
import { UploadDataSection } from "../UploadDataSection/UploadDataSection";
import PDFPreview from "../PDFPreview";
import { ConfigSection } from "../ConfigSection/ConfigSection";

export const PagesComponent: FC = () => {
  const {currentPage} = useContext(GlobalContext) as GlobalContextType
  return (
    <>
      {currentPage == 'Landing' && <LandingSection />}
      {currentPage == 'Datos' && <UploadDataSection />}
      {currentPage === "Config" && <ConfigSection />}
      {currentPage == 'Preview' && <PDFPreview />}
    </>
  )
}