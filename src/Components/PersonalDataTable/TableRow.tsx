import { ChangeEvent, FC, useEffect, useState } from "react";
import { ConfigType, PersonalDataType } from "../GlobalContext/GlobalContext";
import styles from "./PersonalDataTable.module.scss"
import CheckIcon from '@mui/icons-material/Check';

export const TableRow: FC<{
  Config: ConfigType,
  index: number,
  defaultData?: PersonalDataType[0]
  saveRowInfo: (data: PersonalDataType[0], index: number) => void
}> = ({ Config, index, defaultData, saveRowInfo }) => {
  const categorias = Config.personalData.categorys
  const degrees = Config.personalData.title
  const positions = Config.personalData.positions
  const [isDisabled, setIsDisabled] = useState(false)
  const [data, setData] = useState<PersonalDataType[0]>({
    id: index,
    dni: 0,
    firstName: "",
    lastName: "",
    charge: "",
    category: "",
    startDate: "",
    title: ""
  });

  useEffect(() => {
    if (defaultData) setData(defaultData)
    else setData({
      id: index,
      dni: 0,
      firstName: "",
      lastName: "",
      charge: "",
      category: "",
      startDate: "",
      title: ""
    })
  }, [defaultData, index])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(prevValue => ({ ...prevValue, [event.target.name]: event.target.value }))
  }

  const handleOnNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(prevValue => ({ ...prevValue, [event.target.name]: Number(event.target.value) }))
  }
  
  const handleSelectOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setData(prevValue => ({ ...prevValue, [event.target.name]: event.target.value }))
  }

  const handleOnSave = () => {
    if (!isDisabled) saveRowInfo(data, index)
  }

  useEffect(() => {
    if (data.category && data.charge && data.dni && data.firstName && data.lastName && data.startDate) setIsDisabled(false)
    else setIsDisabled(true)
  }, [data])
  return (
    <tr>
      <td>{index}</td>
      <td>
        <input name="dni" type="number" min={0} max={99999999} value={data.dni > 0 ? data.dni : ""} placeholder="N° DNI" onChange={handleOnNumberChange}/>
      </td>
      <td>
        <input value={data.lastName} name="lastName" type="text" placeholder="Apellido" onChange={handleOnChange} />
      </td>
      <td>
        <input value={data.firstName} name="firstName" type="text" placeholder="Nombre" onChange={handleOnChange} />
      </td>
      <td className={styles.categoryContainer}>
        <select className={styles.categoryOptions} name="charge" id="" value={data.charge} onChange={handleSelectOnChange}>
          <option value="">---</option>
          {positions.map((position, index) => {
            return (
              <option key={index} value={`${position}`}>{position}</option>
            )
          })}
        </select>
      </td>
      <td className={styles.categoryContainer}>
        <select className={styles.categoryOptions} name="category" id="" value={data.category} onChange={handleSelectOnChange}>
          {categorias.map((categoria, index) => {
            return (
              <option key={index} value={`${categoria.name}`}>{categoria.name}</option>
            )
          })}
        </select>
      </td>
      <td>
        <input value={data.startDate} name="startDate" className={styles.fechaIngreso} type="date" placeholder="Fecha Ingreso" onChange={handleOnChange} />
      </td>
      <td className={styles.categoryContainer}>
        <select className={styles.categoryOptions} name="title" id="" value={data.title} onChange={handleSelectOnChange}>
          <option value="">---</option>
          {Object.keys(degrees).map((key, index) => {
            return (
              <option key={index} value={key}>{degrees[key].name}</option>
            )
          })}
        </select>
      </td>
      <td>
        <a className={`${styles.actionButton} ${styles.check} ${isDisabled && styles.disabled}`} onClick={handleOnSave}>
          <CheckIcon />
        </a>
      </td>
    </tr>
  )
}