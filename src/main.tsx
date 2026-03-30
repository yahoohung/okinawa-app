import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'
import heroImage from './assets/hero1.jpg'

// Set Open Graph image dynamically so Vite can hash it
const ogImageMeta = document.querySelector('meta[property="og:image"]')
if (ogImageMeta) {
  ogImageMeta.setAttribute('content', heroImage)
}

render(<App />, document.getElementById('app')!)
