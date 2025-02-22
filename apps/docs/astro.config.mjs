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
      dark: './src/assets/ion-logo.svg',
      light: './src/assets/ion-logo-light.svg',
    },
    social: {
      github: 'https://github.com/louisescher/starlight-ion-theme'
    },
    sidebar: [{
      label: '[home] Home',
      link: '/'
    }, {
      label: '[list] Getting Started',
      link: '/getting-started/'
    },{
      label: '[changelog] Changelog',
      link: '/changelog/',
      badge: {
        variant: 'tip',
        text: 'New'
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
    lastUpdated: true,
    pagination: false,
    plugins: [
      ion({
        icons: {
          iconDir: './src/icons',
        },
        footer: {
          text: '©️ Louis Escher 2025',
          links: [{
            text: 'Homepage',
            href: 'https://louisescher.dev',
          }],
          icons: [{
            name: 'github',
            href: 'https://github.com/louisescher/starlight-ion-theme'
          }]
        }
      })
    ]
  })],
  output: "static"
});