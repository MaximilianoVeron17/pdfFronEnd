import { FC, useContext } from "react";
import Button from "../Button";
import styles from "./PreviewNavigation.module.scss"
import { GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";

export const PreviewNavigation: FC<{ onClick: () => void}> = ({onClick}) => {
  const {updateCurrentPage} = useContext(GlobalContext) as GlobalContextType

  return (
    <div className={styles.previewNavigation}>
      <h2 className={styles.header}>Vista Previa</h2>
      <div className={styles.optionsContainer}>
        <p>Guardar en:</p>
        <input type="text" defaultValue={'C:/desktop'}/>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center'}}>
        <Button primary onClick={onClick}>Guardar Datos Usados</Button>
        <Button onClick={() => updateCurrentPage('Datos')}>{'< Cancelar'}</Button>
      </div>
    </div>
  )
}