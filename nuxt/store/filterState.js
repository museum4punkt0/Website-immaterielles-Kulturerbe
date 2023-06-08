import { defineStore, acceptHMRUpdate } from 'pinia'
export const useFilterStateStore = defineStore('filterState', { 
  state: () => ({ 
    appFilter:{
      "app_filter_keywords": [],
      "app_filter_types": [],
      "app_filter_hardwares": [],
      "app_filter_softwares": [],
      "app_filter_approaches": [],
      "app_filter_access": "",
      "app_filter_goals": [],
      "app_filter_targetgroups": [],
      "app_filter_usages": [],
      "app_filter_devcost": "",
      "app_filter_followupcost": ""
    },
    houseFilter:{
      "house_filter_keywords": [],
      "house_filter_type": "",
      "house_filter_collectionfoci": [],
      "house_filter_collectionsize": "",
      "house_filter_visitorcount": "",
      "house_filter_agency": "",
      "house_filter_state": "",
      "house_filter_communitysize": ""
    },
    filteredItems: [],
    activeSection: '',
    isMapView: false
  }),
  getters: {
    appFilterIsActive: (state) => {
      for (const key in state.appFilter) {
        if (state.appFilter.hasOwnProperty(key)) {
          if(Array.isArray(state.appFilter[key])){
            if(state.appFilter[key].length > 0) return true
          }else{
            if(state.appFilter[key] !== '') return true
          }
        }
      }    
      return false        
    },
    houseFilterIsActive: (state) => {
      for (const key in state.houseFilter) {
        if (state.houseFilter.hasOwnProperty(key)) {
          if(Array.isArray(state.houseFilter[key])){
            if(state.houseFilter[key].length > 0) return true
          }else{
            if(state.houseFilter[key] !== '') return true
          }
        }
      }
      return false       
    }, 
  },
  actions:{    

    setFiltersBasedOnRouteQuery(aFilterType, aRouteQuery) {  
      Object.keys(aRouteQuery).forEach((k) => {
          let v = aRouteQuery[k]   
          if(Array.isArray(this[aFilterType][k]) && v.length > 0){
            this[aFilterType][k] = v.split(',');
          }else{
            if(v){
              this[aFilterType][k] = v
            }
          }
      });         
    },
    updateUrlParams(aFilterType){
      const router = useRouter();
      const urlParams = {};
      // loop through filterState
      Object.keys(this[aFilterType]).forEach((k) => {
        let v = this[aFilterType][k]     
        if(Array.isArray(v)){
          if(v.length > 0){
            urlParams[k] = v.toString();        
          }
        }else{
          if(v !== ''){
            urlParams[k] = v
          }
        }        
      })
      // push active filters to route query params
      router.push({
        query: urlParams,
      })
    }, 

    setSingleSelectFilter(aFilterType, aFilterId, aFilterOption){
      if(this[aFilterType][aFilterId] !== aFilterOption){
        this[aFilterType][aFilterId] = aFilterOption;
      }else{
        this[aFilterType][aFilterId] = "";
      }
      this.updateUrlParams(aFilterType);
    },
    setMultiSelectFilter(aFilterType, aFilterId, aFilterOption){
      //console.log(aFilterId, aFilterOption)
      if(this[aFilterType][aFilterId].indexOf(aFilterOption) > -1){ // if in array
        this[aFilterType][aFilterId].splice(this[aFilterType][aFilterId].indexOf(aFilterOption), 1); 
      }else{
        this[aFilterType][aFilterId].push(aFilterOption)
      }
      this.updateUrlParams(aFilterType);      
    },
    resetFilter(aFilterType, aFilterId){
      //console.log(aFilterType, aFilterId)
      if(Array.isArray(this[aFilterType][aFilterId])){
        this[aFilterType][aFilterId] = [];
      }else{
        this[aFilterType][aFilterId] = '';
      }
      this.updateUrlParams(aFilterType);
    }, 
    resetAllFilters(aFilterType, aUpdatUrlParams = true){      
      //console.log('resetting all', this[aFilterType])
      for (const key in this[aFilterType]) {              
        if (this[aFilterType].hasOwnProperty(key)) {
          //console.log(`${key}: ${this[aFilterType][key]}`);
          if(Array.isArray(this[aFilterType][key])){
            this[aFilterType][key] = [];
          }else{
            this[aFilterType][key] = '';
          }
        }
      }
      if(aUpdatUrlParams){
        this.updateUrlParams(aFilterType);           
      }
    },
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFilterStateStore, import.meta.hot))
}