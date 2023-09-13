import { FC, useState } from "react";
import { ConfigType } from "../GlobalContext/GlobalContext";
import { BonificationsTab } from "./Tabs/BonificationsTab";
import { ChargeBonusesTab } from "./Tabs/ChargeBonusesTab";
import styles from "./BonificationConfig.module.scss"


export const BonificationsConfig: FC<{ bonifications: ConfigType['bonifications'], }> = ({ bonifications }) => {
  const [currentTab, setCurrentTab] = useState('Fijas')
  return(
    <div className={styles.bonificationsConfig}>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <a className={`${styles.tab} ${currentTab == 'Fijas' ? styles.active : ''}`} onClick={() => setCurrentTab('Fijas')}>Bonif. Fijas</a>
          <a className={`${styles.tab} ${currentTab == 'Prop' ? styles.active : ''}`} onClick={() => setCurrentTab('Prop')}>Bonif. Procentuales</a>
          <a className={`${styles.tab} ${currentTab == 'porCargo' ? styles.active : ''}`} onClick={() => setCurrentTab('porCargo')}>Bonif. por Cargo</a>
        </div>
        <div className={styles.tabsContainer}>
          {currentTab == 'Fijas' && <BonificationsTab bonifications={bonifications.fixedConcepts} isFixed/>}
          {currentTab == 'Prop' && <BonificationsTab bonifications={bonifications.proportionalConcepts} />}
          {currentTab == 'porCargo' && <ChargeBonusesTab chargeBonuses={bonifications.chargeBonuses} />}
        </div>
      </div>
    </div>
  )
}