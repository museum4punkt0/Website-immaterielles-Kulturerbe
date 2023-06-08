import type { RouterConfig } from '@nuxt/schema'
export default <RouterConfig> {
  // savedPosition if browser-history nav
  scrollBehavior (to, from, savedPosition) { 
    if (savedPosition) {
      if (to.hash) {
        return{
          el: to.hash,          
          behavior: 'smooth',
        }
      }else{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({top: savedPosition.top, behavior: 'smooth'}) 
            }, 300)        
        })
      }                 
    } else {
      if (to.hash) {
        //console.log('to with hash', to.hash, to, from); 
        // ScrollNav Pages 
        if( to.path.includes('empirische-grundlagen')|| to.path.includes('good-practices')){
          let topMargin = 180;
          if(window.innerWidth > 1180) topMargin = 250;
          console.log(topMargin)           
          return{
            el: to.hash, 
            top: topMargin,
            behavior: 'smooth'
          }  
        } 
        // going from tag to apps or houses, delay to let page load
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              el: to.hash, 
              behavior: 'smooth'}) 
          }, 200)        
        })  
                 
      }else{
        console.log('to no hash');  
        return { top: 0 }
      }
    }  
  },  
}