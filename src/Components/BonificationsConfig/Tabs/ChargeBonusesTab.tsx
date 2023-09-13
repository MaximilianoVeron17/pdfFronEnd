import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { ConfigType, GlobalContext, GlobalContextType } from "../../GlobalContext/GlobalContext";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from "../../Button";
import styles from "../BonificationConfig.module.scss";

interface IInputRow {
  name: string;
  value: number;
  index: number;
  handleOnDelete?: () => void;
  saveBonification: (newBonificationItem: { name: string, value: number }, index: number) => void;
}

const InputRow: FC<IInputRow> = ({ name, value, index, handleOnDelete, saveBonification }) => {
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [data, setData] = useState<{ name: string, value: number }>({ name, value });
  const [dataPlaceholder, setDataPlacehonder] = useState<{ name: string, value: number }>(data);

  useEffect(() => {
    setData({ name, value })
    setIsEditting(false)
  }, [name, value])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(prevValue => ({ ...prevValue, [event.target.name]: event.target.value }))
  }

  const handleSave = () => {
    saveBonification(data, index)
    setIsEditting(false)
  }

  const handleStartEdit = () => {
    setDataPlacehonder(data)
    setIsEditting(true)
  }
  const handleCancelEdit = () => {
    setData(dataPlaceholder)
    setIsEditting(false)
  }

  return (
    <div className={styles.inputContainer}>
      <input
        className={`${styles.input} ${isEditting ? '' : styles.disabled}`}
        name="name"
        value={data.name}
        readOnly={!isEditting}
        onChange={handleOnChange}
      />
      <input
        className={`${styles.input} ${isEditting ? '' : styles.disabled}`}
        name="value"
        type="number"
        step={0.01}
        value={data.value}
        readOnly={!isEditting}
        onChange={handleOnChange}
      />
      <div className={styles.actionsContainer}>
        {isEditting ?
          <>
            <a className={`${styles.actionButton} ${styles.check}`} onClick={handleSave}>
              <CheckIcon />
            </a>
            <a className={`${styles.actionButton} ${styles.close}`} onClick={handleCancelEdit}>
              <CloseIcon />
            </a>
          </>
          : <>
            <a className={`${styles.actionButton} ${styles.edit}`} onClick={handleStartEdit}>
              <EditOutlinedIcon />
            </a>
            <p className={`${styles.actionButton} ${styles.delete}`} onClick={handleOnDelete}>
              <DeleteForeverOutlinedIcon />
            </p>
          </>
        }
      </div>
    </div>
  )
}

export const ChargeBonusesTab: FC<{ chargeBonuses: ConfigType['bonifications']['chargeBonuses'] }> = ({ chargeBonuses }) => {
  const { setConfig } = useContext(GlobalContext) as GlobalContextType

  const addBonification = () => {
    setConfig(prevConfig => (
      {
        ...prevConfig,
        bonifications: {
          ...prevConfig['bonifications'],
          chargeBonuses: {
            ...prevConfig['bonifications']['chargeBonuses'],
            ['zzz' + (Object.keys(prevConfig['bonifications']['chargeBonuses']).length + 1)]:{
              name: 'Nueva Bonificación',
              value: 0
            }
          }
        }
      }
    ))
  }

  const removeBonification = (index: number) => {
    const newBonification = {...chargeBonuses}
    delete newBonification[Object.keys(chargeBonuses)[index]]
    setConfig(prevConfig => (
      {
        ...prevConfig,
        bonifications: {
          ...prevConfig['bonifications'],
          chargeBonuses: {
            ...newBonification
          }
        }
      }
    ))
  }

  const saveBonification = (newBonificationItem: { name: string, value: number }, index: number) => {
    const newBonification = { ...chargeBonuses }
    delete newBonification[Object.keys(chargeBonuses)[index]]
    setConfig(prevConfig => (
      {
        ...prevConfig,
        bonifications: {
          ...prevConfig['bonifications'],
          chargeBonuses: {
            ...newBonification,
            [newBonificationItem.name.replace(/ /g, "")]: newBonificationItem
          }
        }
      }
    ))
  }

  return (
    <div className={styles.mainTab}>
      <div className={styles.labels}>
        <p>Concepto</p>
        <p>{'Monto ($)'}</p>
      </div>
      <div className={styles.inputList}>
        {Object.values(chargeBonuses).map(({ name, value }, index) => (
          <InputRow
            name={name}
            value={value}
            index={index}
            handleOnDelete={() => removeBonification(index)}
            saveBonification={saveBonification}
          />
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <Button primary onClick={addBonification}>Agregar Categoria</Button>
        <Button>Guardar Cambios</Button>
      </div>
    </div>
  )
}