import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { ConfigType, GlobalContext, GlobalContextType } from "../../GlobalContext/GlobalContext";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from "../../Button";
import styles from "../PersonalDataConfig.module.scss";

interface IInputRow {
  nameProp: string;
  index: number;
  savePosition: (newPosition: string, index: number) => void
  handleDeleteCategory: () => void;
}

const InputRow: FC<IInputRow> = ({ nameProp, index, handleDeleteCategory, savePosition }) => {
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [name, setData] = useState<string>(nameProp)
  const [dataPlaceholder, setDataPlacehonder] = useState<string>(name);

  useEffect(() => {
    setData(nameProp)
  }, [nameProp])

  const handleOnChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value)
  }

  const handleSave = () => {
    savePosition(name, index)
    setIsEditting(false)
  }

  const handleStartEdit = () => {
    setDataPlacehonder(name)
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
        value={name}
        readOnly={!isEditting}
        onChange={handleOnChangeName}
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
            <p className={`${styles.actionButton} ${styles.delete}`} onClick={handleDeleteCategory}>
              <DeleteForeverOutlinedIcon/>
            </p>
          </>
        }
      </div>
    </div>
  )
}

export const PositionsTab: FC<{positions: ConfigType['personalData']['positions'] }> = ({ positions }) => {
  const { setConfig } = useContext(GlobalContext) as GlobalContextType

  const addCategory = () => {
    setConfig(prevConfig => (
      {
        ...prevConfig,
        personalData: {
          ...prevConfig['personalData'],
          positions: [
            ...prevConfig['personalData']['positions'],
            "New Position"
          ]
        }
      }
    ))
  }

  const removeCategory = (index: number) => {
    const newPositions = [...positions]
    newPositions.splice(index, 1)
    console.log(newPositions)
    setConfig(prevConfig => (
      {
        ...prevConfig,
        personalData: {
          ...prevConfig['personalData'],
          positions: [
            ...newPositions,
          ]
        }
      }
    ))
  }

  const savePosition = (newPosition: string, index:number) => {
    const newPositions = [...positions]
    newPositions[index] = newPosition
    setConfig(prevConfig => (
      {
        ...prevConfig,
        personalData: {
          ...prevConfig['personalData'],
          positions: [...newPositions]
        }
      }
    ))
  }

  return (
    <div className={styles.mainTab}>
      <div className={styles.labels}>
        <p>Nombre del Cargo</p>
      </div>
      <div className={styles.inputList}>
        {positions.map((value , index) => (
          <InputRow
            nameProp={value}
            key={index}
            index={index}
            savePosition={savePosition}
            handleDeleteCategory={() => removeCategory(index)}
          />
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <Button primary onClick={addCategory}>Agregar Categoria</Button>
      </div>
    </div>
  )
}