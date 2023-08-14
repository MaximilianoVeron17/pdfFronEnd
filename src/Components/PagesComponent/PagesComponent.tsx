import { FC, useContext } from "react";
import { GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";
import LandingSection from "../LandingSection";
import Button from "../Button";

export const PagesComponent: FC = () => {
  const {currentPage, updateCurrentPage} = useContext(GlobalContext) as GlobalContextType
  return (
    <>
      {currentPage == 'Landing' && <LandingSection/>}
      {currentPage == 'Datos' && <Button size="32px" width="250px" onClick={() => updateCurrentPage('Landing')}>{'< Atras'}</Button>}
      {currentPage == 'Config' && <Button size="32px" width="250px" onClick={() => updateCurrentPage('Landing')}>{'< Atras'}</Button>}
    </>
  )
}