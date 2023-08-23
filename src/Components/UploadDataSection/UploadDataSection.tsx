import React, { FC, useContext, useState } from "react";
import {
  GlobalContext,
  GlobalContextType,
} from "../GlobalContext/GlobalContext";
import Button from "../Button";
import styles from "./UploadDataSection.module.scss";
import UploadDataTable from "../UploadDataTable";
import ModalPagina from "../UploadModalSection/UploadModalSection";
import modalStyles from "../UploadModalSection/modal.module.scss";

export const UploadDataSection: FC = () => {
  const { updateCurrentPage } = useContext(GlobalContext) as GlobalContextType;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.UploadDataSection}>
      <section className={styles.header}>

      </section>
      <section className={styles.tableContainer}>
        <UploadDataTable />
      </section>
      <section className={styles.buttonsContainer}>
        <Button
          size="14px"
          width="100px"
          onClick={() => updateCurrentPage("Landing")}
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
            onClick={() => updateCurrentPage("Preview")}
          >
            {"Vista Previa"}
          </Button>
        </div>
      </section>
      {isModalOpen && <ModalPagina onClose={closeModal} />}
    </div>
  );
};