import cloudflare from '@astrojs/cloudflare'
import { defineConfig } from 'astro/config'
import AutoImport from 'unplugin-auto-import/astro'

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

  integrations: [
    AutoImport({
      defaultExportByFilename: false,
      include: [
        /\.md$/, // .md
        /\.[tj]sx?$/ // .ts, .tsx, .js, .jsx
      ],
      packagePresets: ['detect-browser-es'],
      viteOptimizeDeps: true,
      imports: ['react', 'react-router'],
      dirs: ['./src/utils/*.ts', './src/hooks/*'],
      dts: './src/auto-imports.d.ts',
      biomelintrc: {
        enabled: false, // Default `false`
        filepath: './.biomelintrc-auto-import.json' // Default `./.biomelintrc-auto-import.json`
      }
    }),
    react()
  ]
})
