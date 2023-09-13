import { FC } from "react";
import { ConfigType } from "../GlobalContext/GlobalContext";
import { FamilyTab } from "./Tabs/FamilyTab";
import styles from "./FamilyConfig.module.scss"


export const FamilyConfig: FC<{ family: ConfigType['family'], }> = ({ family }) => {
  return (
    <div className={styles.familyConfig}>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <a className={`${styles.tab} ${styles.active}`}>Fijas</a>
        </div>
        <div className={styles.tabsContainer}>
          <FamilyTab family={family} isFixed />
        </div>
      </div>
    </div>
  )
}