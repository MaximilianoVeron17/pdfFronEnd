import { FC, useContext } from "react"
import Button from "../Button"
import { GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";
import styles from "./ConfigSection.module.scss";

export const ConfigSection: FC = () => {

  const { updateCurrentPage } = useContext(GlobalContext) as GlobalContextType;
  return (
    <>
      <main>
        <header className={styles.header}>
          <div className={styles["header-toggle"]}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </header>
        <aside className={styles["Sidebar"]}>
          <nav className={styles["nav"]}>
            <div>
              <a href="" className={styles["nav-logo"]}></a>
            </div>
            <div className={styles["nav-link"]}>
              <i className={styles["header-toggle"]}></i>
              <a className={styles["nav-link"]}>
                <span className={styles["nav-logo-name"]}>Antiguedad</span>
              </a>
            </div>
            <div>
              <a className={styles["nav-link"]}>
                <span className={styles["nav-logo-name"]}>Categoria</span>
              </a>
            </div>
            <div>
              <a className={styles["nav-link"]}>
                <span className={styles["nav-logo-name"]}>Hijos</span>
              </a>
            </div>
            <div>
              <a className={styles["nav-link"]}>
                <span className={styles["nav-logo-name"]}>Hora Extra</span>
              </a>
            </div>
          </nav>
        </aside>
      </main>
      <Button
        size="32px"
        width="250px"
        onClick={() => updateCurrentPage("Landing")}
      >
        {"< Atras"}
      </Button>
    </>
  )
} 