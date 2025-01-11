import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { ion, resolve } from 'starlight-ion-theme';

// https://astro.build/config
export default defineConfig({
  site: 'https://louisescher.github.io',
  base: '/starlight-ion-theme',
  integrations: [starlight({
    title: 'Ion',
    logo: {
      src: './src/assets/ion-logo.svg'
    },
    social: {
      github: 'https://github.com/louisescher/starlight-ion-theme'
    },
    sidebar: [{
      label: '[home] Home',
      link: '/'
    }, {
      label: '[list] Features',
      link: '/features/'
    }, {
      label: '[box] Guides',
      autogenerate: {
        directory: 'guides'
      }
    }, {
      label: '[book] Reference',
      autogenerate: {
        directory: 'reference'
      }
    }],
    customCss: [
      '@fontsource-variable/space-grotesk/index.css',
      '@fontsource/space-mono/400.css',
      '@fontsource/space-mono/700.css',
      './src/styles/global.css'
    ],
    expressiveCode: {
      themes: ['github-dark']
    },
    lastUpdated: true,
    pagination: false,
    plugins: [
      ion({
        iconDir: resolve('./src/icons', import.meta.url),
      })
    ]
  })],
  output: "static"
});