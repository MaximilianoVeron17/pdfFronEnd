import { FC, useContext, useState } from "react";
import styles from "./ConfigSection.module.scss";
import { GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";
import { ConfigNavigation } from "../ConfigNavigation/ConfigNavigation";
import { PersonalDataConfig } from "../PersonalDataConfig/PersonalDataConfig";
import { BonificationsConfig } from "../BonificationsConfig/BonificationsConfig";
import { DiscountsConfig } from "../DiscountsConfig/DiscountsConfig";
import { FamilyConfig } from "../FamilyConfig/FamilyConfig";

export const ConfigSection: FC = () => {
  const {Config} = useContext(GlobalContext) as GlobalContextType;
  const options = Object.keys(Config)

  const [currentPage, setCurrentPage] = useState(options[0]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <main className={styles["space-toggle"]}>
      <aside className={styles.sidebar}>
        <h2 className={styles.header}>
          Configuracion
        </h2>
        <ConfigNavigation currentPage={currentPage} options={options} handlePageChange={handlePageChange} />
      </aside>
      {currentPage == options[0] && <PersonalDataConfig personalData={Config.personalData} bonuses={Config.bonifications.chargeBonuses} />}
      {currentPage == options[1] && <BonificationsConfig bonifications={Config.bonifications} />}
      {currentPage == options[2] && <DiscountsConfig discounts={Config.discounts} />}
      {currentPage == options[3] && <FamilyConfig family={Config.family} />}
    </main>
  );
}