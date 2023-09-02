import { ChangeEvent, FC, useContext, useState } from "react";
import { ConfigType, GlobalContext, GlobalContextType } from "../../GlobalContext/GlobalContext";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from "../../Button";

interface IInputRow {
  name: string;
  baseSalary: number;
  bonuses: ConfigType['bonifications']['chargeBonuses'];
  bonus?: string
}

const InputRow: FC<IInputRow> = ({name, baseSalary, bonuses, bonus}) => {
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [data, setData] = useState<ConfigType['personalData']['categorys'][0]>({name, baseSalary, chargeBonus: bonus})

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(prevValue => ({ ...prevValue, [event.target.name]: event.target.value }))
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setData(prevValue => ({...prevValue, chargeBonus: e.target.value}))
  }
  return (
    <div style={{ display: 'flex', gap: 25 }}>
      <input name="name" value={data.name} readOnly={!isEditting} onChange={handleOnChange} />
      <input name="baseSalary" type="number" step={0.01} value={data.baseSalary} readOnly={!isEditting} onChange={handleOnChange} />
      <select disabled={!isEditting} name="chargeBonus" value={data.chargeBonus} onChange={handleSelectChange}>
        <option value="">Sin extra</option>
        {Object.keys(bonuses).map((key) => (
          <option value={key}>{bonuses[key].name}</option>
        ))}
      </select>
      <div style={{ display: 'flex', gap: 25 }}>
        { isEditting ?
          <>
            <a onClick={() => setIsEditting(false)}>
            <CheckIcon/>
          </a>
            <a onClick={() => setIsEditting(false)}>
            <CloseIcon/>
          </a>
          </>
          :<>
            <a onClick={() => setIsEditting(true)}>
              <EditOutlinedIcon />
            </a>
            <DeleteForeverOutlinedIcon />
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
          categorys: {
            ...prevConfig['personalData']['categorys'],
            [Object.keys(prevConfig['personalData']['categorys']).length + 2]: {
              name: 'Nueva Categoria',
              baseSalary: 50000,
              chargeBonus: ''
            }
          }
        }
      }
    ))
  }

  return (
    <div>
      <div>
        {Object.values(categorias).map(({baseSalary, name, chargeBonus}, index) => (
          <InputRow name={name} baseSalary={baseSalary} bonuses={bonuses} bonus={chargeBonus} key={index} />
          ))}
      </div>
      <div>
        <Button primary onClick={addCategory}>Agregar Categoria</Button>
        <Button>Guardar Cambios</Button>
      </div>
    </div>
  )
}