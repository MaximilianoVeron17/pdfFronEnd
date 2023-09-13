import { GlobalContextProvider } from './Components/GlobalContext/GlobalContext.tsx'
import { PagesComponent } from "./Components/PagesComponent/PagesComponent.tsx"

function App() {

  return (
    <GlobalContextProvider> 
      <PagesComponent/>
    </GlobalContextProvider>
  )
}

export default App
