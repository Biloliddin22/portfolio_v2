import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import globalStyles from './styles/global.css?inline'

// Keep the inline loading screen visible while the main bundle downloads.
const styles = document.getElementById('portfolio-styles') ?? document.createElement('style')
styles.id = 'portfolio-styles'
styles.textContent = globalStyles
document.head.append(styles)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
