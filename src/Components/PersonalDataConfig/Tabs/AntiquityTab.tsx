import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { ConfigType, GlobalContext, GlobalContextType } from "../../GlobalContext/GlobalContext";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from "../../Button";
import styles from "../PersonalDataConfig.module.scss";

interface IInputRow {
  year: string;
  value: number;
  saveAntiquity: (newValue: number, key: string) => void
}

const InputRow: FC<IInputRow> = ({ year, value, saveAntiquity }) => {
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [data, setData] = useState<number>(value)
  const [dataPlaceholder, setDataPlacehonder] = useState<number>(data);

  useEffect(() => {
    setData(value)
  }, [value])

  const handleSave = () => {
    saveAntiquity(data, year)
    setIsEditting(false)
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(parseFloat(event.target.value))
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
      <p>{year}</p>
      <input 
        className={`${styles.input} ${isEditting ? '' : styles.disabled}`}
        type="number"
        name="porcentage"
        min={0.00}
        step={0.01}
        max={100}
        value={data}
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
          </>
        }
      </div>
    </div>
  )
}

export const AntiquityTab: FC<{ antiquities: ConfigType['personalData']['antiquity'] }> = ({antiquities}) => {
  const { setConfig } = useContext(GlobalContext) as GlobalContextType

  const addCategory = () => {
    setConfig(prevConfig => (
      {
        ...prevConfig,
        personalData: {
          ...prevConfig['personalData'],
          antiquity: {
            ...prevConfig['personalData']['antiquity'],
            [parseInt(Object.keys(antiquities).slice(-1)[0]) + 1]: antiquities[parseInt(Object.keys(antiquities).slice(-1)[0])] + 2
          }
        }
      }
    ))
  }

  const removeCategory = () => {
    const newAntiquities = {...antiquities}
    delete newAntiquities[parseInt(Object.keys(antiquities).slice(-1)[0])]
    setConfig(prevConfig => (
      {
        ...prevConfig,
        personalData: {
          ...prevConfig['personalData'],
          antiquity: {
            ...newAntiquities,
          }
        }
      }
    ))
  }

  const saveAntiquity = (newValue: number, key: string) => {
    setConfig(prevConfig => (
      {
        ...prevConfig,
        personalData: {
          ...prevConfig['personalData'],
          antiquity: {
            ...prevConfig['personalData']['antiquity'],
            [parseInt(key)]: newValue
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
      <div className={styles.antiquityInputList}>
        {Object.keys(antiquities).map((key) => (
          <InputRow
            year={key}
            value={antiquities[parseInt(key)]}
            saveAntiquity={saveAntiquity}
          />
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <Button primary onClick={addCategory}>Agregar Año</Button>
        <Button primary onClick={removeCategory}>Quitar Año</Button>
      </div>
    </div>
  )
}