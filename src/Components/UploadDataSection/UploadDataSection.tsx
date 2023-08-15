import { FC, useContext } from "react";
import { GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";
import Button from "../Button";
import styles from "./UploadDataSection.module.scss"
import UploadDataTable from "../UploadDataTable";

export const UploadDataSection: FC = () => {
  const {updateCurrentPage} = useContext(GlobalContext) as GlobalContextType;
  return (
    <div className={styles.UploadDataSection}>
      <section className={styles.header}>
        <img className={styles.image} src="src\assets\Muni-Benitez.png" alt="Colinia Benitez Logo" />
        <h2 className={styles.title}>Carga de Datos</h2>
        <img style={{opacity: 0}} src="src\assets\Muni-Benitez.png" alt="Colinia Benitez Logo" />
      </section>
      <section className={styles.tableContainer}>
        <UploadDataTable />
      </section>
      <section className={styles.buttonsContainer}>
        <Button size="14px" width="100px" onClick={() => updateCurrentPage('Landing')}>{'< Atras'}</Button>
        <div className={styles.mainButtons}>
          <Button primary size="20px" width="250px" onClick={() => updateCurrentPage('Landing')}>{'Cargar Archivo .xlvs'}</Button>
          <Button primary size="20px" width="250px" onClick={() => updateCurrentPage('Preview')}>{'Vista Previa'}</Button>
        </div>
      </section>
    </div>
  )
}