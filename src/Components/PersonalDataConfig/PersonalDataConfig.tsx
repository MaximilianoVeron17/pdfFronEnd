import { FC, useState } from "react";
import { ConfigType } from "../GlobalContext/GlobalContext";
import { CategoriesTab } from "./Tabs/CategoriesTab";
import { AntiquityTab } from "./Tabs/AntiquityTab";
import { DegreesTab } from "./Tabs/DegreesTabs";
import { PositionsTab } from "./Tabs/PositionsTab";
import styles from "./PersonalDataConfig.module.scss"

export const PersonalDataConfig: FC<{ personalData: ConfigType['personalData'], bonuses: ConfigType['bonifications']['chargeBonuses'] }> = ({ personalData, bonuses }) => {
  const [currentTab, setCurrentTab] = useState('Categorias')
  return(
    <div className={styles.personalDataConfig}>
      <div className={styles.header}>
        <a className={`${styles.tab} ${currentTab == 'Categorias' ? styles.active : ''}`} onClick={() => setCurrentTab('Categorias')}>Categorias</a>
        <a className={`${styles.tab} ${currentTab == 'Antiguedad' ? styles.active : ''}`} onClick={() => setCurrentTab('Antiguedad')}>Antiguedad</a>
        <a className={`${styles.tab} ${currentTab == 'Titulos' ? styles.active : ''}`} onClick={() => setCurrentTab('Titulos')}>Titulos</a>
        <a className={`${styles.tab} ${currentTab == 'Posiciones' ? styles.active : ''}`} onClick={() => setCurrentTab('Posiciones')}>Posiciones</a>
      </div>
      <div className={styles.tabsContainer}>
        {currentTab == 'Categorias' && <CategoriesTab categorias={personalData.categorys} bonuses={bonuses}/>}
        {currentTab == 'Antiguedad' && <AntiquityTab antiquities={personalData.antiquity} />}
        {currentTab == 'Titulos' && <DegreesTab degrees={personalData.title} />}
        {currentTab == 'Posiciones' && <PositionsTab positions={personalData.positions}  />}
      </div>
    </div>
  )
}