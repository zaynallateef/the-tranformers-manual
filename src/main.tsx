import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/space-grotesk/latin-400.css'
import '@fontsource/space-grotesk/latin-500.css'
import '@fontsource/space-grotesk/latin-600.css'
import '@fontsource/space-grotesk/latin-700.css'
import '@fontsource/space-mono/latin-400.css'
import '@fontsource/space-mono/latin-700.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-500.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-600.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-700.css'
import App from './App'
import { applyReadingPreferences, readingPreferences } from './reading'
import './styles.css'

const { language, theme } = readingPreferences(window.location.search)
applyReadingPreferences(language, theme)

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App language={language} theme={theme} /></React.StrictMode>)
