import { FC, useContext } from "react";
import { ConfigOtion } from "../ConfigOption/ConfigOption";
import Button from "../Button";
import { GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";
import styles from "./ConfigNavigation.module.scss"

interface IConfigNavigation {
  options: string[];
  currentPage: string;
  handlePageChange: (name:string) => void
}

export const ConfigNavigation: FC<IConfigNavigation> = ({ options, currentPage, handlePageChange }) => {
  const {updateCurrentPage, Config} = useContext(GlobalContext) as GlobalContextType;
  
  const names:{[key:string]:string} = {
    "personalData": "Información Personal",
    "bonifications": "Bonificaciones",
    "discounts": "Retenciones al Empleado",
    "family": "Asignaciones Familiares",
  }

  const handleSaveConfig = () => {
    const data = JSON.stringify(Config, null, 2);
    window.electronAPI.saveData(data, (response) => {
      console.log("Main: ", response);
    });
  }
  return (
    <nav className={styles.nav}>
      <div className={styles.options}>
        {options.map((name, index) => (
          <ConfigOtion
            name={names[name]}
            handleOnChange={() => handlePageChange(Object.keys(names)[index])}
            key={name}
            active={currentPage == Object.keys(names)[index]}
          />
        ))}
      </div>
      <div className={styles.buttonsContainer}>

        <Button primary onClick={handleSaveConfig} >{'Guardar Cambios'}</Button>
        <Button onClick={() => updateCurrentPage('Landing')} >{'< Cancelar'}</Button>
      </div>
    </nav>
  )
}