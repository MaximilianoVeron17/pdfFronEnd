import { FC, createContext, ReactNode, useState} from "react";

export type GlobalContextType = {
  currentPage: string;
  updateCurrentPage: (newPage: string) => void 
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider: FC<{children: ReactNode | JSX.Element}> = (props) => {
  const [currentPage, updateCurrentPage] = useState<string>('Landing')
  return (
    <GlobalContext.Provider value={{ currentPage, updateCurrentPage }}>
      {props.children}
    </GlobalContext.Provider>
  )
}