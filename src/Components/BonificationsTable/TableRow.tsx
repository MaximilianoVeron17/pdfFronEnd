import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect } from "react";
import { BonificationsType, ConfigType, PersonalDataType } from "../GlobalContext/GlobalContext";
import styles from "./BonificationsTable.module.scss"

export const TableRow: FC<{
  Config: ConfigType,
  index: number,
  saveRowInfo: Dispatch<SetStateAction<BonificationsType>>,
  personalData: PersonalDataType[0],
  data: BonificationsType,
}> = ({ Config, index, saveRowInfo, personalData, data }) => {

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newData = [...data]
    newData[index][event.target.name as ('hsExtra' | 'medDedication')] = Number(event.target.value)
    saveRowInfo(newData)
  }
  const handleFixedCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const newData = [...data]
    const newFixedConcepts = [...data[index].fixedConcepts]
    newFixedConcepts[parseInt(event.target.name)] = { name: data[index].fixedConcepts[parseInt(event.target.name)].name, value: event.target.checked}
    newData[index]['fixedConcepts'] = newFixedConcepts
    saveRowInfo(newData)
  }
  const handleProportionalCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const newData = [...data]
    const newProportionalConcepts = [...data[index].proportionalConcepts]
    newProportionalConcepts[parseInt(event.target.name)] = { name: data[index].proportionalConcepts[parseInt(event.target.name)].name, value: event.target.checked}
    newData[index]['proportionalConcepts'] = newProportionalConcepts
    saveRowInfo(newData)
  }

  useEffect(() => {
    if (data[index].proportionalConcepts[2].value) {
      const newData = [...data]
      newData[index]['medDedication'] = 0
      saveRowInfo(newData)
    } 
  }, [data[index].proportionalConcepts[2].value])

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
        <input name="hsExtra" max={40} value={data[index].hsExtra} className={styles.fechaIngreso} type="number" placeholder="Hs Extra" onChange={handleOnChange} />
      </td>
      <td>
        <input name="medDedication" disabled={data[index].proportionalConcepts[2].value} max={40} value={data[index].medDedication} className={styles.fechaIngreso} type="number" placeholder="% Sueldo Basico" onChange={handleOnChange} />
      </td>
      {Config.bonifications.fixedConcepts.map(({ }, conceptIndex) => (
        <td>
          <div className={styles.checkbocContainer}>
            <input name={conceptIndex.toString()} className={styles.checkbox} checked={data[index].fixedConcepts[conceptIndex]?.value} type="checkbox" onChange={handleFixedCheckbox} />
          </div>
        </td>
      ))}
      {Config.bonifications.proportionalConcepts.map(({}, conceptIndex)=> (
        <td>
          <div className={styles.checkbocContainer}>
            <input name={conceptIndex.toString()} className={styles.checkbox} type="checkbox" checked={data[index].proportionalConcepts[conceptIndex]?.value} onChange={handleProportionalCheckbox}/>
          </div>
        </td>
      ))}
    </tr>
  )
}