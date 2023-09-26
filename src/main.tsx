import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import '../src/fonts/Syne/Syne-Regular.ttf';
import '../src/fonts/Nova_Mono/NovaMono-Regular.ttf';
import '../src/fonts/Montserrat_Alternates/MontserratAlternates-Bold.ttf';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
