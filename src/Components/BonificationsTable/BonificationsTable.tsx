import { FC, useContext, useEffect, useState } from "react";
import styles from "./BonificationsTable.module.scss"
import { BonificationsType, GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";
import { TableRow } from "./TableRow";

export const BonificationsTable: FC<{save: number}> = ({save}) => {
  const { Config, PersonalData, Bonifications, setBonifications } = useContext(GlobalContext) as GlobalContextType;
  const [data, setData] = useState<BonificationsType>(Bonifications)
  
  useEffect(() => {
    setBonifications(data)
  }, [save])

  return (
    <>
      <thead className={styles.thead}>
        <th >N° Orden</th>
        <th>DNI</th>
        <th>Nombre</th>
        <th>Hs Extra</th>
        <th>Mayor Dedicacion</th>
        {Config.bonifications.fixedConcepts.map((value) => (
          <th>{value.name}</th>
          ))}
        {Config.bonifications.proportionalConcepts.map((value) => (
          <th>{value.name}</th>
          ))}
      </thead>
      <tbody className={styles.tbody}>
        {/* Agregar sort, para ordenar por categoria */}
        {PersonalData.map((personalData, index) => (
          <TableRow personalData={personalData} index={index} Config={Config} saveRowInfo={setData} data={data} />
        ))}
      </tbody>
    </>
  )
}