import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({

  components: [
    { path: '~/components/atoms', prefix: 'Atoms' },
    { path: '~/components/molecules', prefix: 'Molecules' },
    { path: '~/components/organisms', prefix: 'Organisms' },
    { path: '~/components/templates', prefix: 'Templates' },
    '~/components'
  ],  
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/variables_mixins.scss";',
        },
      },
    }
  },
  nitro: {
    devProxy: {
      prerender: {
        routes: ['/sitemap.xml']
      },  
      '/uploads': {
        target: process.env.TEXT_CONTENT_API + '/uploads',
        change0rigin: true,
      },
    },
  },
  runtimeConfig: {  
    // contact form  vars 
    MAIL_TRANSPORT_HOST: process.env.MAIL_TRANSPORT_HOST,
    MAIL_TRANSPORT_PORT: process.env.MAIL_TRANSPORT_PORT,
    MAIL_TRANSPORT_USER: process.env.MAIL_TRANSPORT_USER,
    MAIL_TRANSPORT_PASSWORD: process.env.MAIL_TRANSPORT_PASSWORD,
    MAIL_TRANSPORT_TO_ADDRESS: process.env.MAIL_TRANSPORT_TO_ADDRESS,    

    
    "public": {
      secret: process.env.SECRET ?? 'secret',
      textContentBaseUri: process.env.TEXT_CONTENT_API ?? '/',
      /// gmap vars
      GMAP_API_KEY: process.env.GMAP_API_KEY,      
    }
  },
  modules: [
    '@pinia/nuxt',
    ['@dargmuesli/nuxt-cookie-control', {
      isControlButtonEnabled: false,
      isCookieIdVisible: false,
      cookies: {
        necessary: [
          {
            description: {
              en:  'Cookie for matomo tracking.'
            },
            id: 'matomo-cookie',
            name: {
              en: 'Matomo Cookie' // you always have to specify a cookie name (in English)
            },
            targetCookieIds: ['cookie_control_consent', 'cookie_control_enabled_cookies']
          }             
       
        ],
        optional: [],
      }      
    }],
    // supposed to be always at end of array
    '~/modules/sitemap'
  ],  
  buildModules: [
    //'@pinia/nuxt'
  ],
  sitemap: {
    hostname: 'https://immateriell.smb.museum/', 
  },
  app: {
    head: {
      title: 'Materialisierung des Immateriellen im Museum',
      meta: [
        { name: 'description', content: 'Über die Website: Materialisierung des Immateriellen im Museum' },
        { name: 'robots', content: 'index, follow' },
        { name: 'google-site-verification', content: 'uSf1NKNK39JHg7NkxjFB6LN1OOtsl3brggq7oUdTTtk' }
      ],
    }
  },
  build: {
    transpile: ['gsap'],
  },  
})
