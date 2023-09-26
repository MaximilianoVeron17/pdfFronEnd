import { FC, useContext, useEffect, useState } from "react";
import styles from "./DiscountsTable.module.scss";
import { DiscountsType, GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";
import { TableRow } from "./TableRow";

export const DiscountsTable: FC<{save: number}> = ({save}) => {
  const { Config, PersonalData, Discounts, setDiscounts } = useContext(GlobalContext) as GlobalContextType;
  const [data, setData] = useState<DiscountsType>(Discounts)

  useEffect(() => {
    setDiscounts(data)
  }, [save])

  return (
    <>
      <thead className={styles.thead}>
        <th>N° Orden</th>
        <th>DNI</th>
        <th>Nombre</th>
        <th>Inasistencias</th>
        {Config.discounts.fixedConcepts.map((value) => (
          <th>{value.name}</th>
        ))}
        {Config.discounts.proportionalConcepts.map((value) => (
          <th>{value.name}</th>
        ))}
      </thead>
      <tbody className={styles.tbody}>
        {PersonalData.map((personalData, index) => (
          <TableRow personalData={personalData} index={index} Config={Config} saveRowInfo={setData} data={data} />
        ))}
      </tbody>
    </>
  )
}