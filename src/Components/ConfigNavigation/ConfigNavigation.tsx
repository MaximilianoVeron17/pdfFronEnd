import { FC, useContext, useState } from "react";
import { ConfigOtion } from "../ConfigOption/ConfigOption";
import Button from "../Button";
import { GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";
import styles from "./ConfigNavigation.module.scss"
import * as XLSX from "xlsx";

interface IConfigNavigation {
  options: Array<{name: string, type: string}>
  handlePageChange: (name:string) => void
}

export const ConfigNavigation: FC<IConfigNavigation> = ({ options, handlePageChange }) => {
  const {updateCurrentPage} = useContext(GlobalContext) as GlobalContextType;
  const [optionsxlsx, setOptionsxlsx] = useState(async () => {
    const  workbook = XLSX.readFile("src/assets/dataBase.xlsx")
    const worksheet = workbook.Sheets["Hoja1"]
    const data = XLSX.utils.sheet_to_json(worksheet) 
    return data
  })

  return (
    <nav className={styles.nav}>
      <div className={styles.options}>
        {options.map(({ name },) => (
          <ConfigOtion name={name} handleOnChange={handlePageChange} />
        ))}
      </div>
      {console.log(optionsxlsx)}
      <Button onClick={() => updateCurrentPage('Landing')} >{'< Cancelar'}</Button>
    </nav>
  )
}