import { FC, useContext } from "react";
import { GlobalContext, GlobalContextType, PersonalDataType } from "../GlobalContext/GlobalContext";
import styles from "./PersonalDataTable.module.scss"
import { TableRow } from "./TableRow";


export const PersonalDataTable: FC = () => {

  const { Config, PersonalData, setPersonalData } = useContext(GlobalContext) as GlobalContextType;
  const saveRowInfo = (data: PersonalDataType[0], index: number) => {
    const newPersonalData = [...PersonalData]
    if (index < PersonalData.length) {
      newPersonalData[index] = data
      setPersonalData(newPersonalData)
    } else {
      newPersonalData.push(data)
      setPersonalData(newPersonalData)
    }   
  }

  return(
    <>
      <thead className={styles.thead}>
        <th>N° Orden</th>
        <th>DNI</th>
        <th>Apellido</th>
        <th>Nombre</th>
        <th>Cargo</th>
        <th>Categoria</th>
        <th>Fecha Ingreso</th>
        <th>Titulo</th>
        <th>Guardar</th>
      </thead>
      <tbody className={styles.tbody}>
        {PersonalData.map((data, index) => (
          <TableRow Config={Config} index={index} defaultData={data} saveRowInfo={saveRowInfo} />
        ))}
        <TableRow Config={Config} index={PersonalData.length} saveRowInfo={saveRowInfo} />
      </tbody>
    </>
  )
}