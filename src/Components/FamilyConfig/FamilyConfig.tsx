import { FC, useState } from "react";
import { ConfigType } from "../GlobalContext/GlobalContext";
import { FamilyTab } from "./Tabs/FamilyTab";
import styles from "./FamilyConfig.module.scss"


export const FamilyConfig: FC<{ family: ConfigType['family'], }> = ({ family }) => {
  const [currentTab, setCurrentTab] = useState('Fijas');

  return (
    <div className={styles.familyConfig}>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <a className={`${styles.tab} ${currentTab == 'Fijas' ? styles.active : ''}`} onClick={() => setCurrentTab('Fijas')}> Fijas</a>
          <a className={`${styles.tab} ${currentTab == 'Prop' ? styles.active : ''}`} onClick={() => setCurrentTab('Prop')}>Procentuales</a>
          <a className={`${styles.tab} ${currentTab == 'Acc' ? styles.active : ''}`} onClick={() => setCurrentTab('Acc')}>Acumulativas</a>
        </div>
        <div className={styles.tabsContainer}>
          {currentTab == 'Fijas' && <FamilyTab family={family.fixedConcepts} isFixed />}
          {currentTab == 'Prop' && <FamilyTab family={family.proportionalConcepts}  />}
          {currentTab == 'Acc' && <FamilyTab family={family.acumulativeConcepts} isFixed />}
        </div>
      </div>
    </div>
  )
}