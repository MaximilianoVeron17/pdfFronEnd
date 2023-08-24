import { FC, useContext, useState } from "react";
import {
  GlobalContext,
  GlobalContextType,
} from "../GlobalContext/GlobalContext";
import Button from "../Button";
import styles from "./UploadDataSection.module.scss";
import UploadDataTable from "../UploadDataTable";
import ModalPagina from "../UploadModalSection/UploadModalSection";

export const UploadDataSection: FC = () => {
  const { updateCurrentPage } = useContext(GlobalContext) as GlobalContextType;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTable, setCurrentTable] = useState<'PersonalData' | 'Bonifications' | 'Descuentos'>('PersonalData');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackClick = () => {
    if (currentTable == "PersonalData") updateCurrentPage("Landing")
    if (currentTable == "Bonifications") setCurrentTable("PersonalData")
    if (currentTable == "Descuentos") setCurrentTable("Bonifications")
  }

  const handleNextClick = () => {
    if (currentTable == "PersonalData") setCurrentTable("Bonifications")
    if (currentTable == "Bonifications") setCurrentTable("Descuentos")
    if (currentTable == "Descuentos") updateCurrentPage("Preview")
  }

  const titles = {
    "PersonalData": "Carga de Datos Personales",
    "Bonifications": "Cargar Bonificaciones",
    "Descuentos": "Cargar Descuentos"
  }

  return (
    <div className={styles.UploadDataSection}>
      <section className={styles.header}>
        <img src="src\assets\Muni-Benitez.png" alt="" />
        <h2 className={styles.title}>{titles[currentTable]}</h2>
      </section>
      <section className={styles.tableSection}>
        <div className={styles.tableContainer}>
          <UploadDataTable currentTable={currentTable}/>
        </div>
      </section>
      <section className={styles.buttonsContainer}>
        <Button
          size="14px"
          width="100px"
          onClick={handleBackClick}
        >
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
            {currentTable == "Descuentos" ? "Vista Previa" : "Siguiente"}
          </Button>
        </div>
      </section>
      {isModalOpen && <ModalPagina onClose={closeModal} />}
    </div>
  );
};