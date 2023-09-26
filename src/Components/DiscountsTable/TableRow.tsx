import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { ConfigType, DiscountsType, PersonalDataType } from "../GlobalContext/GlobalContext";
import styles from "./DiscountsTable.module.scss"

export const TableRow: FC<{
  Config: ConfigType,
  index: number,
  saveRowInfo: Dispatch<SetStateAction<DiscountsType>>,
  personalData: PersonalDataType[0],
  data: DiscountsType,
}> = ({ Config, index, saveRowInfo, data, personalData }) => {

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newData = [...data]
    newData[index]['inasistency'] = Number(event.target.value)
    saveRowInfo(newData)
  }
  const handleFixedCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const newData = [...data]
    const newFixedConcepts = [...data[index].fixedConcepts]
    newFixedConcepts[parseInt(event.target.name)] = { name: data[index].fixedConcepts[parseInt(event.target.name)].name, value: event.target.checked }
    newData[index]['fixedConcepts'] = newFixedConcepts
    saveRowInfo(newData)
  }
  const handleProportionalCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const newData = [...data]
    const newProportionalConcepts = [...data[index].proportionalConcepts]
    newProportionalConcepts[parseInt(event.target.name)] = { name: data[index].proportionalConcepts[parseInt(event.target.name)].name, value: event.target.checked }
    newData[index]['proportionalConcepts'] = newProportionalConcepts
    saveRowInfo(newData)
  }

  return (
    <tr>
      <td>{index}</td>
      <td>
        {personalData.dni}
      </td>
      <td>
        {`${personalData.lastName} ${personalData.firstName}`}
      </td>
      <td>
        <input name="inasistency" max={40} value={data[index].inasistency} className={styles.fechaIngreso} type="number" placeholder="Hs Extra" onChange={handleOnChange} />
      </td>
      {Config.discounts.fixedConcepts.map(({ }, conceptIndex) => (
        <td>
          <div className={styles.checkbocContainer}>
            <input name={conceptIndex.toString()} className={styles.checkbox} checked={data[index].fixedConcepts[conceptIndex]?.value} type="checkbox" onChange={handleFixedCheckbox} />
          </div>
        </td>
      ))}
      {Config.discounts.proportionalConcepts.map(({ }, conceptIndex) => (
        <td>
          <div className={styles.checkbocContainer}>
            <input name={conceptIndex.toString()} className={styles.checkbox} type="checkbox" checked={data[index].proportionalConcepts[conceptIndex]?.value} onChange={handleProportionalCheckbox} />
          </div>
        </td>
      ))}
    </tr>
  )
}