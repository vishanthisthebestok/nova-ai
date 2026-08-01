import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { initAccent } from '@/lib/accent'
initAccent()

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

// Register service worker for installable desktop app (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}