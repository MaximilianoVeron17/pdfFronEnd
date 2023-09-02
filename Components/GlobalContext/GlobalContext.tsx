import { FC, createContext, ReactNode, useState, useEffect, Dispatch, SetStateAction} from "react";
import ConfigDB from "../../assets/Config.json";

export type GlobalContextType = {
  currentPage: string;
  Config: ConfigType;
  setConfig: Dispatch<SetStateAction<ConfigType>>;
  updateCurrentPage: (newPage: string) => void 
}

export interface ConfigType {
  personalData: {
    categorys: {
      // pasar a Array
      [key:string]: {
        name: string;
        baseSalary: number;
        chargeBonus?: string;
      } 
    },
    antiquity: {
      [key: number]: number 
    },
    title: {
      [key:string]: number
    },
    positions: {
      [key: string] : {
        name: string;
        categorys: string[];
        lifeDanger: boolean;
      }
    }
  },
  bonifications: {
    fixedConcepts: {
      [key: string]: number 
    },
    proportionalConcepts: {
      [key:string]: number
    },
    chargeBonuses: {
      [key: string]: {
        name: string
        value: number
      }
    }
  },
  discounts?: {
    proportionalConcepts: {
      [key: string]: number
    },
    fixedConcepts: {
      [key: string]: number
    }
  },
  family?: {
    [key:string]: {
      name: string
      value: number
    }
  },
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider: FC<{children: ReactNode | JSX.Element}> = (props) => {
  const [currentPage, updateCurrentPage] = useState<string>('Landing')
  const ConfigData = ConfigDB as ConfigType
  const [Config, setConfig] = useState<ConfigType>(ConfigData)

  useEffect(() => {
    console.log(Config)
  },[])
  return (
    <GlobalContext.Provider value={{ currentPage, Config, updateCurrentPage, setConfig }}>
      {props.children}
    </GlobalContext.Provider>
  )
}