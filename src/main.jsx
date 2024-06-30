
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClimaContextProvider } from './contexto/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClimaContextProvider >
    <App />
  </ClimaContextProvider>,
)
