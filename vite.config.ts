import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// Plugin to replace og:image with the correct hashed filename
function updateOgImagePlugin() {
  let viteConfig: any
  return {
    name: 'update-og-image',
    configResolved(config: any) {
      viteConfig = config
    },
    async generateBundle(_options: any, bundle: any) {
      // Find the hashed hero1.jpg filename
      let heroImagePath = '/hero1.jpg'
      for (const [fileName, fileInfo] of Object.entries(bundle)) {
        if (fileName.startsWith('hero1') && fileName.endsWith('.jpg')) {
          heroImagePath = `/${fileName}`
          break
        }
      }

      // Read and update index.html
      const htmlFileName = 'index.html'
      if (bundle[htmlFileName]) {
        const htmlSource = bundle[htmlFileName].source as string
        const domainUrl = process.env.VITE_DOMAIN_URL || 'https://okinawa-26.vercel.app'
        const ogImageContent = `${domainUrl}${heroImagePath}`
        const updatedHtml = htmlSource.replace(
          /og:image" content="[^"]*"/,
          `og:image" content="${ogImageContent}"`
        )
        bundle[htmlFileName].source = updatedHtml
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [preact(), updateOgImagePlugin()],
})
