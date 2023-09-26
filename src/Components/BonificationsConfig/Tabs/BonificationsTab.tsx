import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { GlobalContext, GlobalContextType } from "../../GlobalContext/GlobalContext";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from "../../Button";
import styles from "../BonificationConfig.module.scss"

interface IInputRow {
  name: string;
  value: number;
  index: number;
  isFixed?: boolean;
  handleOnDelete?: () => void;
  saveBonification: (newBonificationItem: { name: string, value: number }, index: number) => void;
}

const InputRow: FC<IInputRow> = ({ name, value, isFixed, index, handleOnDelete, saveBonification }) => {
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [data, setData] = useState<{name: string, value: number}>({name, value})
  const [dataPlaceholder, setDataPlacehonder] = useState<{name: string, value: number}>({name, value})
  useEffect(() => {
    setData({name, value})
  },[name, value])

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
        { isEditting ?
          <>
            <a className={`${styles.actionButton} ${styles.check}`} onClick={handleSave}>
            <CheckIcon/>
          </a>
            <a className={`${styles.actionButton} ${styles.close}`} onClick={handleCancelEdit}>
            <CloseIcon/>
          </a>
          </>
          :<>
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

export const BonificationsTab: FC<{ bonifications: Array<{name: string, value: number}>, isFixed?: boolean }> = ({ bonifications, isFixed }) => {
  const { setConfig } = useContext(GlobalContext) as GlobalContextType

  const addBonification = () => {
    setConfig(prevConfig => (
      {
        ...prevConfig,
        bonifications: {
          ...prevConfig['bonifications'],
          [isFixed ? 'fixedConcepts' : 'proportionalConcepts']: [
            ...prevConfig['bonifications'][isFixed ? 'fixedConcepts' : 'proportionalConcepts'],
            {
              name: 'Nueva Categoria',
              value: 0
            }
          ]
        }
      }
    ))
  }

  const removeBonification = (index: number) => {
    const newBonification = [...bonifications]
    newBonification.splice(index, 1)
    setConfig(prevConfig => (
      {
        ...prevConfig,
        bonifications: {
          ...prevConfig['bonifications'],
          [isFixed ? 'fixedConcepts' : 'proportionalConcepts']: [
            ...newBonification,
          ]
        }
      }
    ))
  }

  const saveBonification = (newBonificationItem: { name: string, value: number }, index: number) => {
    const newBonifications = [...bonifications]
    newBonifications[index] = newBonificationItem
    setConfig(prevConfig => (
      {
        ...prevConfig,
        bonifications: {
          ...prevConfig['bonifications'],
          [isFixed ? 'fixedConcepts' : 'proportionalConcepts']: [...newBonifications]
        }
      }
    ))
  }

  return (
    <div className={styles.mainTab}>
      <div className={styles.labels}>
        <p>Concepto</p>
        <p>{isFixed ? 'Monto ( $ )' : 'Porcentaje ( % )'}</p>
      </div>
      <div className={styles.inputList}>
        {bonifications.map(({ name, value }, index) => (
          <InputRow
            name={name}
            value={value}
            isFixed={isFixed}
            index={index}
            handleOnDelete={() => removeBonification(index)}
            saveBonification={saveBonification}
          />
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <Button primary onClick={addBonification}>Agregar Categoria</Button>
      </div>
    </div>
  )
}