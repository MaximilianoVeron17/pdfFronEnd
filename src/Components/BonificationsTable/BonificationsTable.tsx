import { FC, useContext } from "react";
import styles from "./BonificationsTable.module.scss"
import { BonificationsType, GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";
import { TableRow } from "./TableRow";

export const BonificationsTable: FC = () => {
  const { Config, PersonalData, Bonifications, setBonifications } = useContext(GlobalContext) as GlobalContextType;
  const saveRowInfo = (data: BonificationsType[0], index: number) => {
    const newBonifications = [...Bonifications]
    if (index < Bonifications.length) {
      newBonifications[index] = data
      setBonifications(newBonifications)
    } else {
      newBonifications.push(data)
      setBonifications(newBonifications)
    }
  }

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
        <th>Guardar</th>
      </thead>
      <tbody className={styles.tbody}>
        {PersonalData.map((data, index) => (
          <TableRow data={data} index={index} Config={Config} />
        ))}
      </tbody>
    </>
  )
}