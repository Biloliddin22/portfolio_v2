import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { registerOfflineSupport } from './offline'
import globalStyles from './styles/global.css?inline'

// Keep the inline loading screen visible while the main bundle downloads.
const styles = document.getElementById('portfolio-styles') ?? document.createElement('style')
styles.id = 'portfolio-styles'
styles.textContent = globalStyles
document.head.append(styles)

registerOfflineSupport()

const root = document.getElementById('root')

function renderPortfolio(ProjectPage) {
  createRoot(root).render(
    <StrictMode>
      <App ProjectPage={ProjectPage} />
    </StrictMode>,
  )
}

if (root.dataset.page === 'bilkin') {
  import('./components/BilKinPage.jsx').then(({ default: BilKinPage }) => renderPortfolio(BilKinPage))
} else {
  renderPortfolio()
}
