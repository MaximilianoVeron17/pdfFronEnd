import React, { FC, useContext, useState } from "react";
import {
  GlobalContext,
  GlobalContextType,
} from "../GlobalContext/GlobalContext";
import Button from "../Button";
import styles from "./UploadDataSection.module.scss";
import PersonalDataTable from "../PersonalDataTable";
import BonificationsTable from "../BonificationsTable";
import DiscountsTable from "../DiscountsTable";
import ModalPagina from "../UploadModalSection/UploadModalSection";
import * as XLSX from 'xlsx';

export const UploadDataSection: FC = () => {
  const { updateCurrentPage } = useContext(GlobalContext) as GlobalContextType;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTable, setCurrentTable] = useState<
    "PersonalData" | "Bonifications" | "Descuentos"
  >("PersonalData");
  const [excelData, setExcelData] = useState<any[][] | null>(null); 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackClick = () => {
    if (currentTable === "PersonalData") {
      updateCurrentPage("Landing");
    } else if (currentTable === "Bonifications") {
      setCurrentTable("PersonalData");
    } else if (currentTable === "Descuentos") {
      setCurrentTable("Bonifications");
    }
  };

  const handleNextClick = () => {
    if (currentTable === "PersonalData") {
      setCurrentTable("Bonifications");
    } else if (currentTable === "Bonifications") {
      setCurrentTable("Descuentos");
    } else if (currentTable === "Descuentos") {
      updateCurrentPage("Preview");
    }
  };

  const titles = {
    PersonalData: "Carga de Datos Personales",
    Bonifications: "Cargar Bonificaciones",
    Descuentos: "Cargar Descuentos",
  };

  const handleFileChange = (file) => {
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
      setExcelData(jsonData); 
    };
  
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={styles.UploadDataSection}>
      <section className={styles.header}>
        <img src="src\assets\Muni-Benitez.png" alt="" />
        <h2 className={styles.title}>{titles[currentTable]}</h2>
      </section>
      <section className={styles.tableSection}>
        <div className={styles.tableContainer}>
          {currentTable === "PersonalData" && <PersonalDataTable excelData={excelData} />}
          {currentTable === "Bonifications" && <BonificationsTable excelData={excelData} />}
          {currentTable === "Descuentos" && <DiscountsTable excelData={excelData} />}
        </div>
      </section>
      <section className={styles.buttonsContainer}>
        <Button size="14px" width="100px" onClick={handleBackClick}>
          {"< Atras"}
        </Button>
        <div className={styles.mainButtons}>
          <Button primary size="20px" width="250px" onClick={openModal}>
            {"Cargar Archivo .xlvs"}
          </Button>
          <Button
            primary
            size="20px"
            width="250px"
            onClick={handleNextClick}
          >
            {currentTable === "Descuentos" ? "Vista Previa" : "Siguiente"}
          </Button>
        </div>
      </section>
      {isModalOpen && <ModalPagina onClose={closeModal} onFileSelect={handleFileChange} />}
    </div>
  );
};