import { FC, useContext } from "react";
import styles from './LandingSection.module.scss'
import Button from "../Button";
import { GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";

export const LandingSection: FC = () => {
  const {updateCurrentPage} = useContext(GlobalContext) as GlobalContextType;
  return (
    <div className={styles.LandingSectionContainer}>
      <div className={styles.mainButtonsContainer}>
        <div className={styles.imageContainer}>
          <img src="src\assets\Muni-Benitez.png" alt="Colinia Benitez Logo"/>
        </div>
        <Button primary size="32px" width="250px" onClick={() => updateCurrentPage('Datos')}>Cargar Datos</Button>
        <Button primary size="32px" width="250px" onClick={() => updateCurrentPage('Config')}>Configuración</Button>
      </div>
      <Button size="32px">Salir</Button>
    </div>
  )
}