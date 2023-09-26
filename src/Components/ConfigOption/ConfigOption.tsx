import { FC } from "react";
import styles from "./ConfigOption.module.scss"

interface IConfigOption {
  name: string;
  active: boolean;
  handleOnChange: () => void;
}

export const ConfigOtion: FC<IConfigOption> = ({ name, active, handleOnChange }) => {
  return (
    <a className={`${styles["nav-link-name"]} ${active ? styles.active: ''}`} onClick={() => handleOnChange()}>
      {name}
    </a>
  )
} 