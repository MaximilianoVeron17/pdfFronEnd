import { FC, createContext, ReactNode, useState, useEffect, Dispatch, SetStateAction} from "react";
import ConfigDB from "../../assets/Config.json";

export type GlobalContextType = {
  currentPage: string;
  Config: ConfigType;
  PersonalData: PersonalDataType;
  Bonifications: BonificationsType;
  Discounts: DiscountsType;
  Family: FamilyType;
  setConfig: Dispatch<SetStateAction<ConfigType>>;
  setPersonalData: Dispatch<SetStateAction<PersonalDataType>>;
  setBonifications: Dispatch<SetStateAction<BonificationsType>>;
  setDiscounts: Dispatch<SetStateAction<DiscountsType>>;
  setFamily: Dispatch<SetStateAction<FamilyType>>;
  updateCurrentPage: (newPage: string) => void 
}

export interface ConfigType {
  personalData: {
    categorys: 
      Array<{
        name: string;
        baseSalary: number;
        chargeBonus?: string;
      }>
    antiquity: {
      [key: number]: number;
    },
    title: {
      [key:string]: {
        name: string;
        value: number;
      } 
    },
    positions: string[];
  },
  bonifications: {
    fixedConcepts: Array<{
      name: string
      value: number
    }>,
    proportionalConcepts: Array<{
      name: string
      value: number
    }>,
    chargeBonuses: {
      [key: string]: {
        name: string
        value: number
      }
    }
  },
  discounts: {
    fixedConcepts: Array<{
      name: string
      value: number
    }>,
    proportionalConcepts: Array<{
      name: string
      value: number
    }>,
  },
  family: Array<{
    name: string
    value: number
  }>
}

export type PersonalDataType = {
    id: number;
    dni: number;
    firstName: string;
    lastName: string;
    charge: string;
    category: string;
    startDate: string;
    title: string;
  }[]

export type BonificationsType = {
    hsExtra: number;
    fixedConcepts: Array<{
      name: string
      value: boolean
    }>,
    proportionalConcepts: Array<{
      name: string
      value: boolean
    }>
  }[]

export type DiscountsType = {
    id: number;
    dni: number;
    firstName: string;
    lastName: string;
    charge: string;
    category: string;
    startDate: string;
    title: string;
  }[]

export type FamilyType = {
    id: number;
    dni: number;
    firstName: string;
    lastName: string;
    charge: string;
    category: string;
    startDate: string;
    title: string;
  }[]

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider: FC<{children: ReactNode | JSX.Element}> = (props) => {
  const [currentPage, updateCurrentPage] = useState<string>('Landing')
  const ConfigData = ConfigDB as ConfigType
  const [Config, setConfig] = useState<ConfigType>(ConfigData)
  const [PersonalData, setPersonalData] = useState<PersonalDataType>([])
  const [Bonifications, setBonifications] = useState<BonificationsType>([])
  const [Discounts, setDiscounts] = useState<DiscountsType>([])
  const [Family, setFamily] = useState<FamilyType>([])

  useEffect(() => {
    console.log(Config)
  },[])
  return (
    <GlobalContext.Provider
      value={{
        currentPage,
        Config,
        PersonalData,
        Bonifications,
        Discounts,
        Family,
        updateCurrentPage,
        setConfig,
        setPersonalData,
        setBonifications,
        setDiscounts,
        setFamily
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}