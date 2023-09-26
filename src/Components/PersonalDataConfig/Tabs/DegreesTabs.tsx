import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { ConfigType, GlobalContext, GlobalContextType } from "../../GlobalContext/GlobalContext";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from "../../Button";
import styles from "../PersonalDataConfig.module.scss";

interface IInputRow {
  name: string;
  value: number;
  keyValue: string;
  handleDeleteClick: () => void;
  saveDegree: (newDegree: { name: string, value: number }, key: string) => void
}

const InputRow: FC<IInputRow> = ({ name, value, keyValue, handleDeleteClick, saveDegree }) => {
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [data, setData] = useState<ConfigType['personalData']['title'][0]>({name, value})
  const [dataPlaceholder, setDataPlacehonder] = useState<ConfigType['personalData']['title'][0]>(data);

  useEffect(() => {
    setData({name, value})
    setIsEditting(false)
  }, [name, value, keyValue])

  const handleOnChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setData(prevState => ({name: event.target.value, value: prevState.value}))
  }
  const handleOnChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setData(prevState => ({ name: prevState.name, value: parseFloat(event.target.value) }))
  }

  const handleSave = () => {
    saveDegree(data, keyValue)
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
        type="text"
        value={data.name}
        readOnly={!isEditting}
        onChange={handleOnChangeName}
      />
      <input
        className={`${styles.input} ${isEditting ? '' : styles.disabled}`}
        type="number"
        name="porcentage"
        min={0.00}
        step={0.01}
        max={100}
        value={data.value}
        readOnly={!isEditting}
        onChange={handleOnChangeValue}
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
            <p className={`${styles.actionButton} ${styles.delete}`} onClick={handleDeleteClick}>
              <DeleteForeverOutlinedIcon />
            </p>
          </>
        }
      </div>
    </div>
  )
}

export const DegreesTab: FC<{ degrees: ConfigType['personalData']['title'] }> = ({ degrees }) => {
  const { setConfig } = useContext(GlobalContext) as GlobalContextType

  const addCategory = () => {
    setConfig(prevConfig => (
      {
        ...prevConfig,
        personalData: {
          ...prevConfig['personalData'],
          title: {
            ...prevConfig['personalData']['title'],
            ['NuevoTitulo' + Object.keys(degrees).length]: {
              name: 'Nuevo Titulo ' + Object.keys(degrees).length,
              value: 10,
            }
          }
        }
      }
    ))
  }

  const removeCategory = (key: string) => {
    const newDegrees = { ...degrees }
    delete newDegrees[key]
    setConfig(prevConfig => (
      {
        ...prevConfig,
        personalData: {
          ...prevConfig['personalData'],
          title: {
            ...newDegrees,
          }
        }
      }
    ))
  }

  const saveDegree = (newDegree: {name: string, value:number}, key: string) => {
    const newDegrees = {...degrees}
    delete newDegrees[key]
    setConfig(prevConfig => (
      {
        ...prevConfig,
        personalData: {
          ...prevConfig['personalData'],
          title: {
            ...newDegrees,
            [newDegree.name.replace(/ /g, "")]: newDegree
          }
        }
      }
    ))
  }

  return (
    <div className={styles.mainTab}>
      <div className={styles.labels}>
        <p>Concepto</p>
        <p>{'Porcentaje ( % )'}</p>
      </div>
      <div className={styles.inputList}>
        {Object.keys(degrees).map((key, keyIndex) => (
          Object.values(degrees).map(({name,value}, valueIndex) => {
            if (keyIndex == valueIndex) {
              return (
                <InputRow
                name={name}
                value={value}
                keyValue={key}
                handleDeleteClick={() => removeCategory(key)}
                saveDegree={saveDegree}
                key={valueIndex}
                />
              )
            }
          }
          )
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <Button primary onClick={() => addCategory()}>Agregar Categoria</Button>
      </div>
    </div>
  )
}