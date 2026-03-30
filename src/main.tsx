import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'
import heroImage from './assets/hero1.jpg'

// Set Open Graph image dynamically with full URL from .env
const ogImageMeta = document.querySelector('meta[property="og:image"]')
if (ogImageMeta) {
  const baseUrl = `${import.meta.env.VITE_DOMAIN_URL}${import.meta.env.BASE_URL}`
  const fullImageUrl = `${baseUrl}${heroImage}`
  ogImageMeta.setAttribute('content', fullImageUrl)
}

render(<App />, document.getElementById('app')!)
