import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { GlobalContext, GlobalContextType } from "../../GlobalContext/GlobalContext";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from "../../Button";
import styles from "../DiscountsConfig.module.scss"

interface IInputRow {
  name: string;
  value: number;
  isFixed?: boolean;
  index: number;
  handleOnDelete?: () => void;
  saveDiscount: (newDiscountsItem: { name: string, value: number }, index: number) => void;
}

const InputRow: FC<IInputRow> = ({ name, value, isFixed, index, handleOnDelete, saveDiscount }) => {
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [data, setData] = useState<{name: string, value: number}>({name, value})
  const [dataPlaceholder, setDataPlacehonder] = useState<{ name: string, value: number }>(data);

  useEffect(() => {
    setData({name, value})
  },[name, value])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(prevValue => ({ ...prevValue, [event.target.name]: event.target.value }))
  }

  const handleSave = () => {
    saveDiscount(data, index)
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
        name={isFixed ? "value" : "porcentage"}
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

export const DiscountsTab: FC<{ discounts: Array<{name: string, value: number}>, isFixed?: boolean }> = ({ discounts, isFixed }) => {
  const { setConfig } = useContext(GlobalContext) as GlobalContextType

  const addDiscount = () => {
    setConfig(prevConfig => (
      {
        ...prevConfig,
        discounts: {
          ...prevConfig['discounts'],
          [isFixed ? 'fixedConcepts' : 'proportionalConcepts']: [
            ...prevConfig['discounts'][isFixed ? 'fixedConcepts' : 'proportionalConcepts'],
            {
              name: 'Nueva Categoria',
              value: 0
            }
          ]
        }
      }
    ))
  }

  const removeDiscount = (index: number) => {
    const newDiscount = [...discounts]
    newDiscount.splice(index, 1)
    setConfig(prevConfig => (
      {
        ...prevConfig,
        discounts: {
          ...prevConfig['discounts'],
          [isFixed ? 'fixedConcepts' : 'proportionalConcepts']: newDiscount
        }
      }
    ))
  }

  const saveDiscount = (newDiscountsItem: { name: string, value: number }, index: number) => {
    const newDiscounts = [...discounts]
    newDiscounts[index] = newDiscountsItem
    setConfig(prevConfig => (
      {
        ...prevConfig,
        discounts: {
          ...prevConfig['discounts'],
          [isFixed ? 'fixedConcepts' : 'proportionalConcepts']: newDiscounts
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
        {discounts.map(({ name, value }, index) => (
          <InputRow
            name={name}
            value={value}
            isFixed={isFixed}
            index={index}
            handleOnDelete={() => removeDiscount(index)}
            saveDiscount={saveDiscount}
          />
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <Button primary onClick={addDiscount}>Agregar Categoria</Button>
      </div>
    </div>
  )
}