import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@material-design-icons/font'
import '@fontsource-variable/montserrat'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/700.css'
import '@fontsource-variable/noto-sans-jp'
import '@fontsource/noto-sans-jp/500.css'
import '@fontsource/poppins/500.css'
import '@fontsource/ubuntu-mono'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
