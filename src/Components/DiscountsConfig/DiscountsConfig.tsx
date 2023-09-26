import { FC, useState } from "react";
import { ConfigType } from "../GlobalContext/GlobalContext";
import { DiscountsTab } from "./Tabs/DiscountsTab";
import styles from "./DiscountsConfig.module.scss"


export const DiscountsConfig: FC<{ discounts: ConfigType['discounts'], }> = ({ discounts }) => {
  const [currentTab, setCurrentTab] = useState('Fijas')
  return (
    <div className={styles.bonificationsConfig}>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <a className={`${styles.tab} ${currentTab == 'Fijas' ? styles.active : ''}`} onClick={() => setCurrentTab('Fijas')}>Retenc. Fijas</a>
          <a className={`${styles.tab} ${currentTab == 'Prop' ? styles.active : ''}`} onClick={() => setCurrentTab('Prop')}>Retenc. Procentuales</a>
        </div>
        <div className={styles.tabsContainer}>
          {currentTab == 'Fijas' && <DiscountsTab discounts={discounts.fixedConcepts} isFixed />}
          {currentTab == 'Prop' && <DiscountsTab discounts={discounts.proportionalConcepts} />}
        </div>
      </div>
    </div>
  )
}