import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { ConfigType, GlobalContext, GlobalContextType } from "../../GlobalContext/GlobalContext";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from "../../Button";
import styles from "../PersonalDataConfig.module.scss";

interface IInputRow {
  name: string;
  baseSalary: number;
  bonuses: ConfigType['bonifications']['chargeBonuses'];
  bonus?: string;
  handleDeleteCategory: (index:number) => void;
  saveCategory: (newCategory: ConfigType['personalData']['categorys'][0], index: number) => void;
  index: number;
}

const InputRow: FC<IInputRow> = ({ name, baseSalary, bonuses, bonus, handleDeleteCategory, saveCategory, index}) => {
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [data, setData] = useState<ConfigType['personalData']['categorys'][0]>({name, baseSalary, chargeBonus: bonus})
  const [dataPlaceholder, setDataPlacehonder] = useState<ConfigType['personalData']['categorys'][0]>(data);

  useEffect(() => {
    setData({name, baseSalary, chargeBonus: bonus})
  },[name])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(prevValue => ({ ...prevValue, [event.target.name]: event.target.value }))
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setData(prevValue => ({...prevValue, chargeBonus: e.target.value}))
  }

  const handleSave = () => {
    saveCategory(data, index)
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
        name="baseSalary"
        type="number"
        step={0.01}
        value={data.baseSalary}
        readOnly={!isEditting}
        onChange={handleOnChange}
      />
      <select
        className={`${styles.input} ${isEditting ? '' : styles.disabled}`}
        disabled={!isEditting}
        name="chargeBonus"
        value={data.chargeBonus}
        onChange={handleSelectChange}
      >
        <option value="">Sin extra</option>
        {Object.keys(bonuses).map((key) => (
          <option value={key} key={key}>{bonuses[key].name}</option>
        ))}
      </select>
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
            <p className={`${styles.actionButton} ${styles.delete}`} onClick={(e) => {
              e.preventDefault()
              handleDeleteCategory(index)
              }}>
              <DeleteForeverOutlinedIcon />
            </p>
          </>
        }
      </div>
    </div>
  )
}

export const CategoriesTab: FC<{ categorias: ConfigType['personalData']['categorys'], bonuses: ConfigType['bonifications']['chargeBonuses'] }> = ({categorias, bonuses}) => {
  const { setConfig } = useContext(GlobalContext) as GlobalContextType

  const addCategory = () => {
    setConfig(prevConfig => (
      {
        ...prevConfig,
        personalData: {
          ...prevConfig['personalData'],
          categorys: [
            ...prevConfig['personalData']['categorys'],
            {
              name: 'Nueva Categoria',
              baseSalary: 50000,
              chargeBonus: ''
            }
          ]
        }
      }
    ))
  }

  const removeCategory = (index: number) => {
    const newCategories = [...categorias]
    newCategories.splice(index, 1)
    setConfig(prevConfig => (
      {
        ...prevConfig,
        personalData: {
          ...prevConfig['personalData'],
          categorys: [
            ...newCategories,
          ]
        }
      }
    ))
  }

  const saveCategory = (newCategory: ConfigType['personalData']['categorys'][0], index: number) => {
    const newCategories = [...categorias]
    newCategories[index] = {name: newCategory.name, baseSalary: Number(newCategory.baseSalary), chargeBonus: newCategory.chargeBonus}
    setConfig(prevConfig => (
      {
        ...prevConfig,
        personalData: {
          ...prevConfig['personalData'],
          categorys: [...newCategories]
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
        {categorias.map(({baseSalary, name, chargeBonus}, index) => (
          <InputRow
            name={name}
            baseSalary={baseSalary}
            bonuses={bonuses}
            bonus={chargeBonus}
            key={index}
            index={index}
            handleDeleteCategory={removeCategory}
            saveCategory={saveCategory}
          />
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <Button primary onClick={addCategory}>Agregar Categoria</Button>
      </div>
    </div>
  )
}