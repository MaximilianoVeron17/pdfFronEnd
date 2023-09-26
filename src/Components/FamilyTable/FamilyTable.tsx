import { FC, useContext, useEffect, useState } from "react";
import styles from "./FamilyTable.module.scss";
import { FamilyType, GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";
import { TableRow } from "./TableRow";

export const FamilyTable: FC<{save: number}> = ({save}) => {
  const { Config, PersonalData, Family, setFamily } = useContext(GlobalContext) as GlobalContextType;
  const [data, setData] = useState<FamilyType>(Family)

  useEffect(() => {
    setFamily(data)
  }, [save])

  return (
    <>
      <thead className={styles.thead}>
        <th>N° Orden</th>
        <th>DNI</th>
        <th>Nombre</th>
        {Config.family.fixedConcepts.map(({name}) => (
          <th>{name}</th>
        ))}
        {Config.family.proportionalConcepts.map(({name}) => (
          <th>{name}</th>
        ))}
        {Config.family.acumulativeConcepts.map(({name}) => (
          <th>{name}</th>
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