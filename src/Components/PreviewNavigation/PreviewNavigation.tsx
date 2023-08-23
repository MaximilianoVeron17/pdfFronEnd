import { FC, RefObject, createRef, useContext } from "react";
import Button from "../Button";
import styles from "./PreviewNavigation.module.scss"
import { GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";
import { useReactToPrint } from "react-to-print";
import { Chart } from "./chart";

export const PreviewNavigation: FC<{ onClick: () => void}> = ({onClick}) => {
  const {updateCurrentPage} = useContext(GlobalContext) as GlobalContextType

  return (
    <div className={styles.previewNavigation}>
      <h2 className={styles.header}>Vista Previa</h2>
      <div className={styles.optionsContainer}>
        <p>Guardar en:</p>
        <input type="text" defaultValue={'C:/desktop'}/>
        <Button primary onClick={onClick}>Generar PDFs</Button>
      </div>
      <Button onClick={() => updateCurrentPage('Datos')}>{'< Cancelar'}</Button>
    </div>
  )
}