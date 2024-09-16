import { defineConfig } from 'astro/config'

import cloudflare from '@astrojs/cloudflare'

import react from '@astrojs/react'

const ReactCompilerConfig = {
  /* ... */
}

// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite: {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]]
        }
      })
    ]
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),

  integrations: [react()]
})
