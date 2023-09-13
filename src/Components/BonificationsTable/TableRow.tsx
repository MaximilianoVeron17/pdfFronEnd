import { ChangeEvent, FC, useState } from "react";
import { BonificationsType, ConfigType, PersonalDataType } from "../GlobalContext/GlobalContext";
import styles from "./BonificationsTable.module.scss"
import CheckIcon from '@mui/icons-material/Check';

export const TableRow: FC<{
    Config: ConfigType,
    index: number,
    saveRowInfo?: (data: PersonalDataType[0], index: number) => void,
    data: PersonalDataType[0]
  }> = ({ Config, index, saveRowInfo, data }) => {
  const categorias = Config.personalData.categorys
  const degrees = Config.personalData.title
  const positions = Config.personalData.positions

  const [rowData, setRowData] = useState<BonificationsType[0]>({

  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRowData(prevValue => ({ ...prevValue, [event.target.name]: event.target.value }))
  }
  const handleSelectOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRowData(prevValue => ({ ...prevValue, [event.target.name]: event.target.value }))
  }

  return (
    <tr>
      <td>{index}</td>
      <td>
        {data.dni}
      </td>
      <td>
        {`${data.lastName} ${data.firstName}`}
      </td>
      <td>
        <input name="hsExtra" max={40} className={styles.fechaIngreso} type="number" placeholder="Hs Extra" onChange={handleOnChange} />
      </td>
      <td>
        <input name="hsExtra" max={40} className={styles.fechaIngreso} type="number" placeholder="% Sueldo Basico" onChange={handleOnChange} />
      </td>
      <td>
        <div className={styles.checkbocContainer}>
          <input className={styles.checkbox} type="checkbox" />
        </div>
      </td>
      <td>
        <div className={styles.checkbocContainer}>
          <input className={styles.checkbox} type="checkbox" />
        </div>
      </td>
      <td>
        <div className={styles.checkbocContainer}>
          <input className={styles.checkbox} type="checkbox" />
        </div>
      </td>
      <td>
        <div className={styles.checkbocContainer}>
          <input className={styles.checkbox} type="checkbox" />
        </div>
      </td>
      <td>
        <div className={styles.checkbocContainer}>
          <input className={styles.checkbox} type="checkbox" />
        </div>
      </td>
      <td>
        <a className={`${styles.actionButton} ${styles.check}`}>
          <CheckIcon />
        </a>
      </td>
    </tr>
  )
}