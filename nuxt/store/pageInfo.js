import { defineStore, acceptHMRUpdate } from 'pinia'
export const usePageInfoStore = defineStore('pageInfo', { 
  state: () => ({ 
    // title: 'Bad Salzuflen',
  }),
  getters: {
    getIntroTitle: (state) => {
      const route = useRoute();
      if(route.path === '/' ) return 'Materialisierung des<br><i>Immateriellen</i><br>im Museum'
      if(route.path === '/anwendungen' && !route.path.includes( '/anwendungen/')) return 'Anwendungen'
      if(route.path.includes( '/anwendungen/') ) return 'Anwendung'
      if(route.path === '/haeuser' && !route.path.includes( '/haeuser/') ) return 'Häuser'
      if(route.path.includes( '/haeuser/') ) return 'Haus'      
      if(route.path === '/good-practices' ) return 'Good Practices'
      if(route.path === '/empirische-grundlagen' ) return 'Empirische<br>Grundlagen'
      if(route.path === '/about' ) return 'Über das Projekt'
      if(route.path === '/impressum' ) return 'Impressum'
      if(route.path === '/datenschutz' ) return 'Datenschutz'
      if(route.path === '/kontakt' ) return 'Kontakt'
      if(route.path.includes('/cluster') ) return 'Cluster'
      return '/Museum 4.0'
    },  
    getContentClass: (state) => {
      const route = useRoute();
      if(route.path === '/' ) return 'home'
      if(route.path === '/anwendungen' || route.path.includes( '/anwendungen/')) return 'applications'
      if(route.path === '/haeuser' || route.path.includes( '/haeuser/')) return 'houses'
      if(route.path === '/good-practices' ) return 'gpractice Practise'
      if(route.path === '/empirische-grundlagen' ) return 'empirics'
      if(route.path === '/about' ) return 'about'
      if(route.path === '/impressum' ) return 'imprint'
      if(route.path === '/datenschutz' ) return 'privacy'
      if(route.path === '/kontakt' ) return 'contact'
      return ''
    }, 
    pageHasIntro: (state) => {
      const route = useRoute();
      if(state.getIntroTitle === 'Haus') return false
      if(state.getIntroTitle === 'Anwendung') return false
      if(state.getIntroTitle === 'Cluster') return false
      if(state.getIntroTitle === 'Kontakt') return false
      return true
    },            
  },
  actions:{    
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageInfoStore, import.meta.hot))
}