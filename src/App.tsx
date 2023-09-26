import {HashRouter as Router, Routes, Route } from 'react-router-dom'
import { GlobalContextProvider } from './Components/GlobalContext/GlobalContext.tsx'
import { PagesComponent } from "./Components/PagesComponent/PagesComponent.tsx"
import { PDFPreview } from './Components/PDFPreview/PDFPreview.tsx'

function App() {

  return (
    <Router >
        <GlobalContextProvider>
          <Routes>
              <Route path='/' element={<PagesComponent/>} />
              <Route path='/pdf' element={<PDFPreview/>} />
          </Routes>
        </GlobalContextProvider>
      </Router>
  )
}

export default App
