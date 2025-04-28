import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
const MyPreset = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{sky.50}',
          100: '{sky.100}',
          200: '{sky.200}',
          300: '{sky.300}',
          400: '{sky.400}',
          500: '{sky.500}',
          600: '{sky.600}',
          700: '{sky.700}',
          800: '{sky.800}',
          900: '{sky.900}',
          950: '{sky.950}'
      }
  }
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,  
  sanctum: {
    mode: 'cookie',
    baseUrl: process.env.API_URL,
    redirectIfAuthenticated: true,
    redirectIfUnauthenticated: true,
    redirect: {
      keepRequestedRoute: true,
      onAuthOnly: '/login',
      onGuestOnly: '/',
      onLogout: '/login'
    },
    globalMiddleware: {
      enabled: true,
      allow404WithoutAuth: true,
    },
    logLevel: 1,
  },
  primevue: {
    autoImport: true,
    options: {
        theme: {
            preset: MyPreset,
            options: {
              darkModeSelector: '.dark',
            }
        }
    }
  }, 
  tailwindcss: {   
    config: { 
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: 'theme(colors.sky.500)',
              50: 'theme(colors.sky.50)',
              100: 'theme(colors.sky.100)',
              200: 'theme(colors.sky.200)',
              300: 'theme(colors.sky.300)',
              400: 'theme(colors.sky.400)',
              500: 'theme(colors.sky.500)',
              600: 'theme(colors.sky.600)',
              700: 'theme(colors.sky.700)',
              800: 'theme(colors.sky.800)',
              900: 'theme(colors.sky.900)',
            },
            secondary: {
              DEFAULT: 'theme(colors.yellow.500)',
              50: 'theme(colors.yellow.50)',
              100: 'theme(colors.yellow.100)',
              200: 'theme(colors.yellow.200)',
              300: 'theme(colors.yellow.300)',
              400: 'theme(colors.yellow.400)',
              500: 'theme(colors.yellow.500)',
              600: 'theme(colors.yellow.600)',
              700: 'theme(colors.yellow.700)',
              800: 'theme(colors.yellow.800)',
              900: 'theme(colors.yellow.900)',
            },
          },
        },
      },
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-auth-sanctum',
    '@primevue/nuxt-module',
    '@nuxt/icon',
    '@pinia/nuxt',
    'dayjs-nuxt',
    '@nuxt/fonts'
  ]
})