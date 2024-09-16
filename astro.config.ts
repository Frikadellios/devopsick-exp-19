import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import AutoImport from 'unplugin-auto-import/astro'
import { SITE } from './src/site-config.ts'
import { remarkReadingTime } from './src/utils/readTime.ts'

const ReactCompilerConfig = {
  /* ... */
}

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]]
        }
      })
    ],
    build: {
      cssMinify: 'lightningcss'
    }
  },
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  prefetch: {
    prefetchAll: true
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: true
    }
  },
  site: SITE,
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
      dirs: ['./src/utils/*.ts', './src/hooks/*', './src/types/*'],
      dts: './src/auto-imports.d.ts',
      biomelintrc: {
        enabled: false, // Default `false`
        filepath: './.biomelintrc-auto-import.json' // Default `./.biomelintrc-auto-import.json`
      }
    }),
    react()
  ]
})
