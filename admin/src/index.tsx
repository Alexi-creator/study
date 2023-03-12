import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import ThemeProvider from './providers/ThemeProvider'

import { App } from './App'

import './global.scss'

const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
)
