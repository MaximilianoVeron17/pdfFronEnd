import { FC, createContext, ReactNode, useState, useEffect, Dispatch, SetStateAction} from "react";
import ConfigDB from "../../assets/Config.json";
import UsersDataDB from "../../assets/Users.json"
import { calculateFinalData } from "../../assets/utils";

export type GlobalContextType = {
  currentPage: string;
  Config: ConfigType;
  PersonalData: PersonalDataType;
  Bonifications: BonificationsType;
  Discounts: DiscountsType;
  Family: FamilyType;
  finalData: FinalDataType;
  setConfig: Dispatch<SetStateAction<ConfigType>>;
  setPersonalData: Dispatch<SetStateAction<PersonalDataType>>;
  setBonifications: Dispatch<SetStateAction<BonificationsType>>;
  setDiscounts: Dispatch<SetStateAction<DiscountsType>>;
  setFamily: Dispatch<SetStateAction<FamilyType>>;
  setFinalData: Dispatch<SetStateAction<FinalDataType>>;
  updateCurrentPage: (newPage: string) => void,
  handleSaveToDatabase: (data: {
    PersonalData: PersonalDataType,
    Bonifications: BonificationsType,
    Discounts: DiscountsType,
    Family: FamilyType
  }) => void
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
  family: {
    fixedConcepts: Array<{
      name: string
      value: number
    }>,
    proportionalConcepts: Array<{
      name: string
      value: number
    }>,
    acumulativeConcepts: Array<{
      name: string
      value: number
    }>
  }
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
    medDedication: number;
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
  inasistency: number,
  fixedConcepts: Array<{
    name: string
    value: boolean
  }>,
  proportionalConcepts: Array<{
    name: string
    value: boolean
  }>
  }[]

export type FamilyType = Array<{
  fixedConcepts: Array<{
    name: string
    value: boolean
  }>,
  proportionalConcepts: Array<{
    name: string
    value: boolean
  }>,
  acumulativeConcepts: Array<{
    name: string
    value: number
  }>
}>

export type FinalDataType = Array<{
  personalData: {
    lastName: string;
    firstName: string;
    charge: string;
    fechaIngreso: string;
    dni: number;
    category: string;
    antiguedad: string;
  };
  haberesYDescuentos: Array<{
    haber?: {
      name: string;
      value: number;
    };
    descuento?: {
      name: string;
      value: number
    }
  }>;
  totals: {
    subTotal: number;
    hTotal: number;
    dTotal: number;
    netTotal: number
  };
  family: Array<{name: string, value: number}>
}>

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider: FC<{children: ReactNode | JSX.Element}> = (props) => {
  const [currentPage, updateCurrentPage] = useState<string>('Landing')
  const ConfigData = ConfigDB as ConfigType
  const UsersData = UsersDataDB as {
    PersonalData: PersonalDataType,
    Bonifications: BonificationsType,
    Discounts: DiscountsType,
    Family: FamilyType
  }
  const [Config, setConfig] = useState<ConfigType>(ConfigData)
  const [PersonalData, setPersonalData] = useState<PersonalDataType>(UsersData.PersonalData ?? [])
  const [Bonifications, setBonifications] = useState<BonificationsType>(UsersData.Bonifications ?? [])
  const [Discounts, setDiscounts] = useState<DiscountsType>(UsersData.Discounts ?? [])
  const [Family, setFamily] = useState<FamilyType>(UsersData.Family ?? [])
  const [finalData, setFinalData] = useState<FinalDataType>([])

  const checkBonificationsLength = () => {
    if (PersonalData.length > Bonifications.length) {
      for (let index = 1; index <= PersonalData.length - Bonifications.length; index++) {
        const newBonifications = [...Bonifications];
        const defaultFixedConceps = Config.bonifications.fixedConcepts.map(({name}) => (
          {name, value: false}
        ))
        const defaultProportionalConcepts = Config.bonifications.proportionalConcepts.map(({name}) => (
          {name, value: false}
        ))
        newBonifications.push({
          hsExtra: 0,
          medDedication: 0,
          fixedConcepts: defaultFixedConceps,
          proportionalConcepts: defaultProportionalConcepts
        })
        setBonifications(newBonifications)
      }
    }
  }

  const checkDiscountsLength = () => {
    if (PersonalData.length > Discounts.length) {
      for (let index = 1; index <= PersonalData.length - Discounts.length; index++) {
        const newDiscounts = [...Discounts];
        const defaultFixedConceps = Config.discounts.fixedConcepts.map(({name}) => (
          {name, value: false}
        ))
        const defaultProportionalConcepts = Config.discounts.proportionalConcepts.map(({name}) => (
          {name, value: false}
        ))
        newDiscounts.push({
          inasistency: 0,
          fixedConcepts: defaultFixedConceps,
          proportionalConcepts: defaultProportionalConcepts
        })
        setDiscounts(newDiscounts)
      }
    }
  }

  const checkFamilyLength = () => {
    if (PersonalData.length > Family.length) {
      for (let index = 1; index <= PersonalData.length - Family.length; index++) {
        const newFamily = [...Family];
        const newFamilyFixedItem = Config.family.fixedConcepts.map(({name}) => ({
          name, value: false
        }))
        const newFamilyProportionalItem = Config.family.proportionalConcepts.map(({name}) => ({
          name, value: false
        }))
        const newFamilyAcumulativeItem = Config.family.acumulativeConcepts.map(({name}) => ({
          name, value: 0
        }))
        
        newFamily.push({
          fixedConcepts: newFamilyFixedItem,
          proportionalConcepts: newFamilyProportionalItem,
          acumulativeConcepts: newFamilyAcumulativeItem
        })

        setFamily(newFamily)
      }
    }
  }

  useEffect(() => {
    checkBonificationsLength()
    checkDiscountsLength()
    checkFamilyLength()   
  }, [PersonalData.length])

  useEffect(() => {
    if (PersonalData.length > 0 && Bonifications.length > 0 && Discounts.length > 0 && Family.length > 0) {
      const finalData = calculateFinalData(Config, PersonalData, Bonifications, Discounts, Family)
      setFinalData(finalData);
    }
  },[Config, Bonifications, Discounts, Family])


  const handleSaveToDatabase = (data: {
    PersonalData: PersonalDataType,
    Bonifications: BonificationsType,
    Discounts: DiscountsType,
    Family: FamilyType
  }) => {
    const dataToSave = JSON.stringify(data, null, 2);
    window.electronAPI.saveUsersInfo(dataToSave, (response) => {
      console.log(response);
      
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        currentPage,
        Config,
        PersonalData,
        Bonifications,
        Discounts,
        Family,
        finalData,
        updateCurrentPage,
        setConfig,
        setPersonalData,
        setBonifications,
        setDiscounts,
        setFamily,
        setFinalData,
        handleSaveToDatabase
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}