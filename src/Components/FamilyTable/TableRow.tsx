import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { ConfigType, FamilyType, PersonalDataType } from "../GlobalContext/GlobalContext";
import styles from "./FamilyTable.module.scss"

export const TableRow: FC<{
  Config: ConfigType,
  index: number,
  saveRowInfo: Dispatch<SetStateAction<FamilyType>>,
  personalData: PersonalDataType[0],
  data: FamilyType,
  }> = ({ Config, index, saveRowInfo, data, personalData }) => {

  const handleFixedCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const newFamilyData = [...data]
    newFamilyData[index].fixedConcepts[parseInt(event.target.name)] = { name: data[index].fixedConcepts[parseInt(event.target.name)].name, value: event.target.checked }
    saveRowInfo(newFamilyData)
  }

  const handleProportionalCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const newFamilyData = [...data]
    newFamilyData[index].proportionalConcepts[parseInt(event.target.name)] = { name: data[index].proportionalConcepts[parseInt(event.target.name)].name, value: event.target.checked }
    saveRowInfo(newFamilyData)
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFamilyData = [...data]
    newFamilyData[index].acumulativeConcepts[parseInt(event.target.name)] = { name: data[index].acumulativeConcepts[parseInt(event.target.name)].name, value: Number(event.target.value) }
    saveRowInfo(newFamilyData)
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
      {Config.family.fixedConcepts.map(({ }, conceptIndex) => (
        <td>
          <div className={styles.checkbocContainer}>
            <input name={conceptIndex.toString()} className={styles.checkbox} type="checkbox" checked={data[index].fixedConcepts[conceptIndex]?.value} onChange={handleFixedCheckbox} />
          </div>
        </td>
      ))}
      {Config.family.proportionalConcepts.map(({ }, conceptIndex) => (
        <td>
          <div className={styles.checkbocContainer}>
            <input name={conceptIndex.toString()} className={styles.checkbox} type="checkbox" checked={data[index].proportionalConcepts[conceptIndex]?.value} onChange={handleProportionalCheckbox} />
          </div>
        </td>
      ))}
      {Config.family.acumulativeConcepts.map(({ }, conceptIndex) => (
        <td>
          <div className={styles.checkbocContainer}>
            <input name={conceptIndex.toString()} className={styles.checkbox} type="number" min={0} value={data[index].acumulativeConcepts[conceptIndex]?.value} onChange={handleOnChange} />
          </div>
        </td>
      ))}
    </tr>
  )
}