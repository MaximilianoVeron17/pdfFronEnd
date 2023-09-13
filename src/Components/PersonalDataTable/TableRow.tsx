import { ChangeEvent, FC, useState } from "react";
import { ConfigType, PersonalDataType } from "../GlobalContext/GlobalContext";
import styles from "./PersonalDataTable.module.scss"
import CheckIcon from '@mui/icons-material/Check';

export const TableRow: FC<{ Config: ConfigType, index: number, saveRowInfo: (data: PersonalDataType[0], index: number) => void }> = ({ Config, index, saveRowInfo }) => {
  const categorias = Config.personalData.categorys
  const degrees = Config.personalData.title
  const positions = Config.personalData.positions

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

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(prevValue => ({ ...prevValue, [event.target.name]: event.target.value }))
  }
  const handleSelectOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setData(prevValue => ({ ...prevValue, [event.target.name]: event.target.value }))
  }

  return (
    <tr>
      <td>{index}</td>
      <td>
        <input name="dni" type="number" min={0} max={99999999} value={data.dni > 0 ? data.dni : ""} placeholder="N° DNI" onChange={handleOnChange}/>
      </td>
      <td>
        <input name="lastName" type="text" placeholder="Apellido" onChange={handleOnChange} />
      </td>
      <td>
        <input name="firstName" type="text" placeholder="Nombre" onChange={handleOnChange} />
      </td>
      <td className={styles.categoryContainer}>
        <select className={styles.categoryOptions} name="charge" id="" defaultValue="" onChange={handleSelectOnChange}>
          <option value="">---</option>
          {positions.map((position, index) => {
            return (
              <option key={index} value={`${position}`}>{position}</option>
            )
          })}
        </select>
      </td>
      <td className={styles.categoryContainer}>
        <select className={styles.categoryOptions} name="category" id="" onChange={handleSelectOnChange}>
          {categorias.map((categoria, index) => {
            return (
              <option key={index} value={`${categoria.name}`}>{categoria.name}</option>
            )
          })}
        </select>
      </td>
      <td>
        <input name="startDate" className={styles.fechaIngreso} type="date" placeholder="Fecha Ingreso" onChange={handleOnChange} />
      </td>
      <td className={styles.categoryContainer}>
        <select className={styles.categoryOptions} name="title" id="" defaultValue="" onChange={handleSelectOnChange}>
          <option value="">---</option>
          {Object.values(degrees).map((degree, index) => {
            return (
              <option key={index} value={`${degree.name}`}>{degree.name}</option>
            )
          })}
        </select>
      </td>
      <td>
        <a className={`${styles.actionButton} ${styles.check}`} onClick={() => saveRowInfo(data, index)}>
          <CheckIcon />
        </a>
      </td>
    </tr>
  )
}