import { FC, useState } from "react";
import { ConfigType } from "../GlobalContext/GlobalContext";
import { CategoriesTab } from "./Tabs/CategoriesTab";

export const PersonalDataConfig: FC<{ personalData: ConfigType['personalData'], bonuses: ConfigType['bonifications']['chargeBonuses'] }> = ({ personalData, bonuses }) => {
  const [currentTab, setCurrentTab] = useState('Categorias')
  const { title, positions, antiquity, categorys } = personalData
  return(
    <div>
      <h2>Personal Data Config</h2>
      <div>
        <div style={{display: 'flex'}}>
          <a onClick={() => setCurrentTab('Categorias')}>Categorias</a>
          <a onClick={() => setCurrentTab('Antiguedad')}>Antiguedad</a>
          <a onClick={() => setCurrentTab('Titulos')}>Titulos</a>
          <a onClick={() => setCurrentTab('Posiciones')}>Posiciones</a>
        </div>
        <div>
          {currentTab == 'Categorias' && <CategoriesTab categorias={categorys} bonuses={bonuses}/>}
          {currentTab == 'Antiguedad' && <p>Antiguedad</p>}
          {currentTab == 'Titulos' && <p>Titulos</p>}
          {currentTab == 'Posiciones' && <p>Posiciones</p>}
        </div>
      </div>
    </div>
  )
}