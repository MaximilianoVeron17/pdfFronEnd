import { FC, useContext } from "react";
import { ConfigOtion } from "../ConfigOption/ConfigOption";
import Button from "../Button";
import { GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";
import styles from "./ConfigNavigation.module.scss"

interface IConfigNavigation {
  options: string[]
  handlePageChange: (name:string) => void
}

export const ConfigNavigation: FC<IConfigNavigation> = ({ options, handlePageChange }) => {
  const {updateCurrentPage} = useContext(GlobalContext) as GlobalContextType;
  
  const names:{[key:string]:string} = {
    "personalData": "Información Personal",
    "bonifications": "Bonificaciones",
    "discounts": "Descuentos",
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.options}>
        {options.map((name, index) => (
          <ConfigOtion
            name={names[name]}
            handleOnChange={() => handlePageChange(Object.keys(names)[index])}
          />
        ))}
      </div>
      <Button onClick={() => updateCurrentPage('Landing')} >{'< Cancelar'}</Button>
    </nav>
  )
}