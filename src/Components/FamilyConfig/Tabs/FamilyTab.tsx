import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { GlobalContext, GlobalContextType } from "../../GlobalContext/GlobalContext";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from "../../Button";
import styles from "../FamilyConfig.module.scss"

interface IInputRow {
  name: string;
  value: number;
  index: number;
  handleOnDelete?: () => void;
  saveFamily: (familyItem:{name:string,value:number}, index:number) => void
}

const InputRow: FC<IInputRow> = ({ name, value, index, handleOnDelete, saveFamily }) => {
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [data, setData] = useState<{name: string, value: number}>({name, value});
  const [dataPlaceholder, setDataPlacehonder] = useState<{name: string, value: number}>(data);

  useEffect(() => {
    setData({name, value})
  },[name, value])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(prevValue => ({ ...prevValue, [event.target.name]: event.target.value }))
  }

  const handleSaveFamily = () => {
    saveFamily(data,index)
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
            <a
              className={`${styles.actionButton} ${styles.check}`}
              onClick={handleSaveFamily}
            >
              <CheckIcon/>
            </a>
            <a
              className={`${styles.actionButton} ${styles.close}`}
              onClick={handleCancelEdit}
            >
              <CloseIcon/>
            </a>
          </>
          :<>
            <a
              className={`${styles.actionButton} ${styles.edit}`}
              onClick={handleStartEdit}
            >
              <EditOutlinedIcon />
            </a>
            <p
              className={`${styles.actionButton} ${styles.delete}`}
              onClick={handleOnDelete}
            >
              <DeleteForeverOutlinedIcon />
            </p>
          </>
        }
      </div>
    </div>
  )
}

export const FamilyTab: FC<{ family: Array<{name: string, value: number}>, isFixed?: boolean }> = ({ family, isFixed }) => {
  const { setConfig } = useContext(GlobalContext) as GlobalContextType

  const addFamily = () => {
    setConfig(prevConfig => (
      {
        ...prevConfig,
        family: [
          ...prevConfig['family'],
          {
            name: 'Nueva Categoria',
            value: 0
          }
        ]

      }
    ))
  }

  const removeFamily = (index: number) => {
    const newFamily = [...family]
    newFamily.splice(index, 1)
    setConfig(prevConfig => (
      {
        ...prevConfig,
        family: [...newFamily]
      }
    ))
  }

  const saveFamily = (newFamilyItem: {name : string, value: number}, index: number) => {
    const newFamily = [...family]
    newFamily[index] = newFamilyItem
    setConfig(prevConfig => (
      {
        ...prevConfig,
        family: [...newFamily]
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
        {family.map(({ name, value }, index) => (
          <InputRow
            name={name}
            value={value}
            index={index}
            handleOnDelete={() => removeFamily(index)}
            saveFamily={saveFamily}
          />
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <Button primary onClick={addFamily}>Agregar Categoria</Button>
      </div>
    </div>
  )
}