import { FC } from "react";
import styles from "./ConfigOption.module.scss"

interface IConfigOption {
  name: string;
  handleOnChange: (name: string) => void
}

export const ConfigOtion: FC<IConfigOption> = ({name, handleOnChange}) => {
  return (
    <a className={styles["nav-link-name"]} onClick={() => handleOnChange(name)}>
      {name}
    </a>
  )
} 