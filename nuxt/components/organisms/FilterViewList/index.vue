<template>
  <!-- {{store.activeSection}} / {{ ikeView }} -->
  <div class="item-count" >{{ getFilteredItems.length }} Ergebnisse</div>

  
    <div id="bg-section-title" :class="pageItemsType + '-bg'" v-if="ikeView">
      <template v-if="getFilteredItems.length > 0">{{ activeSectionTitle }}</template>
      <template v-else>{{ 'Keine Ergebnisse' }}</template>
    </div>  
    <div class="ike-sections-wrapper" v-show="ikeView && !store.isMapView">
      <template v-for="category in ikeCategories">
        <section v-show="getItemsOfCategory(category.slug).length > 0"
          :id="category.slug" 
          class="ike-section" 
          :data-section-title="category.title">
            <template v-if="ikeView">
              <TemplatesCustomMasonry 
                :items="getItemsOfCategory(category.slug)"
                :pageItemsType="pageItemsType"
              />            
            </template>
        </section>               
      </template>
    </div>
    <div class="filtered-items-wrapper" v-show="!ikeView && !store.isMapView">
      <template v-if="!ikeView">     
        <TemplatesCustomMasonry 
          :items="getFilteredItemsSortedByCategory"
          :pageItemsType="pageItemsType"
          :filteredItemsIkeSequence="filteredItemsIkeSequence"
          :isFiltered="true"
        />                         
      </template>    
    </div>

  <MoleculesHousesMap :houseData="getFilteredItemsSortedByCategory" v-if="store.isMapView"/>
</template>

<script setup>
import { useFilterStateStore } from '@/store/filterState'
const store = useFilterStateStore();
const props = defineProps({
  ikeCategories: Object,
  pageCategory: {
    type: String,
    default: 'app'
  },
  pageItemsType:{
    type: String,
    default: 'applications'
  }
})
store.isMapView = false;
const route = useRoute();  
watch(
  () => route.query,
  (newRouteQuery) => {
    store.resetAllFilters(`${props.pageCategory}Filter`, false)      
    store.setFiltersBasedOnRouteQuery(`${props.pageCategory}Filter`, route.query );
  }
)
onMounted(() => {
  store.resetAllFilters(`${props.pageCategory}Filter`, false)  
  store.setFiltersBasedOnRouteQuery(`${props.pageCategory}Filter`, route.query );
})

const items = ref(); 
// maybe change needed, when query involved, maybe gonna move to filterState, when using queries
// maybe reset of filter Active is needed
store.filteredItems = []; 
const filteredItemsIkeSequence = ref([]) // to be able to give classes to items for scrollPos w

// join filter options for fetch request
const getFilterOptions = computed(() => {
  let joinedFilterOptions = ''
  if(props.pageCategory === 'app'){
    joinedFilterOptions = Object.keys(store.appFilter).join(',')
  }else{
    joinedFilterOptions = Object.keys(store.houseFilter).join(',')
  }
  return joinedFilterOptions;
})

// fetch items
const { data, error, refresh } = await useFetch(() => `/api/${props.pageItemsType}?pagination[pageSize]=200&populate=${props.pageCategory}_ike_categories,${getFilterOptions.value},img,applications`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: props.pageType
});
if(!error._value){
  items.value = data.value.data;
}

const ikeView = computed(()=>{
  //return items.value.length === getFilteredItems.value.length
  if(props.pageCategory === 'app') return !store.appFilterIsActive;
  return !store.houseFilterIsActive;  
})
      
// get FilteredItems
let filtersForPage = store[`${props.pageCategory}Filter`];
const getFilteredItems = computed(() => {

  let filteredItems = items.value.filter(function (item) {
      // loop  through store filter state
      // first check if filter in store is set
      // if yes: only stay in loop, if itemMatchesFilter = true, else itemMatchesFilter = false und loop verlassen
      let itemMatchesFilter = false;
      for (let key in filtersForPage){
        // if no filter set for category    
        if(filtersForPage[key] === '' || Array.isArray(filtersForPage[key]) && filtersForPage[key].length === 0){
          itemMatchesFilter = true;     
        // if item has value null for filter
        }else if(item.attributes[key].data === null){
          itemMatchesFilter = false;
          break;   
        // filter is set and item has value for filter             
        }else{
          if( Array.isArray(filtersForPage[key]) ){// if filter is array  
            let arrayFromSlugs = item.attributes[key].data.map(obj => obj.attributes.slug);
            
            // check if every chosen multiSelect value for item (e.g. keywords) is in filtersForPage[key] (e.g. keywords)
            if(filtersForPage[key].every((val) => arrayFromSlugs.includes(val))){
              itemMatchesFilter = true; 
            }else{
              itemMatchesFilter = false;
              break;                
            }            

          }else{                         
            if(item.attributes[key].data.attributes.slug === filtersForPage[key]){           
              itemMatchesFilter = true;
            }else{
              itemMatchesFilter = false;
              break
            }
          }
        }        
      }
      return itemMatchesFilter;                  
  });  
  return filteredItems
})
watch(getFilteredItems, (newItems) => {
  //console.log('filtered items changed, updating store')
  store.filteredItems = newItems;
})

// get items of category (later of FilterItemsList)
function getItemsOfCategory(aCategory){
  let catItems;
  catItems = getFilteredItems.value.filter(function (item) {
      return item.attributes[`${props.pageCategory}_ike_categories`].data.findIndex((el) => el.attributes.slug === aCategory) !== -1;
  });
  return catItems
}


// get filteredItems sorted by catgory, no duplicates
const getFilteredItemsSortedByCategory = computed(() => {
  let sortedItems = [];
  let idsAlreadySorted = [];
  filteredItemsIkeSequence.value = [];

  // might be faster ot iterate through filteredItems insteasd of cats
  for(let i = 0; i < props.ikeCategories.length; i++){
    let catUniqueItems = getFilteredItems.value.filter(function (item){
      // filter out duplicates
      if(idsAlreadySorted.includes(item.id)){
        return false;
      }else{
        if(item.attributes[`${props.pageCategory}_ike_categories`].data.findIndex((el) => el.attributes.slug ===  props.ikeCategories[i].slug) !== -1){
          idsAlreadySorted.push(item.id);
          filteredItemsIkeSequence.value.push(props.ikeCategories[i].slug);
          return true;
        }else{
          return false
        }
      }
    });
    sortedItems.push(...catUniqueItems);
  }
  return sortedItems
})


/****************************************** */
// section observer to change text in bg
const activeSectionTitle = ref('')
const observer = ref(null);
onMounted(() => {
  nextTick(() => {
    observeIkeSections();  
  })   
})
onBeforeUnmount(() => { 
  observer.value.disconnect();
})

function observeIkeSections(){
  observer.value = new IntersectionObserver(entries => {
    entries.forEach(entry => {    
      const { id, dataset } = entry.target;         
      const spy = document.querySelector(`.ike-bar #link-to-${id}`);
      spy.classList.remove("active");
      if (!entry.isIntersecting) return;
      spy.classList.add("active");
      store.activeSection = id;
      activeSectionTitle.value = dataset.sectionTitle;      
    });
  }, {rootMargin: '-50% 0px -50%'});
  // Track all sections that have an `id` applied
  document.querySelectorAll('.ike-section').forEach((section) => {
    observer.value.observe(section);
  });
}  

</script>

<style lang="scss" scoped>
.item-count{
  position: fixed;
  top: 27px;
  left: $padMob;
  z-index: 10;
  @include break($brd){
    top: 55px;
    left: $padDes;
  }
}
.category-title{
  text-align: center;
  font-size: 2em;
  padding: 1em 0;
}
.ike-sections-wrapper{
  position: relative;
  z-index: 1;
  //padding-top: 0vh;
  padding-bottom: 25vh;
}
.filtered-items-wrapper{
  position: relative;
  z-index: 1;
  padding-bottom: 25vh;  
  @include cpt();
}
.ike-section{
  padding-top: 75vh;
  padding-bottom: 0vh;
}
.ike-section, .filtered-items-wrapper{
  gap: 20px;
  padding-left: 12px;
  padding-right: 12px;
}
// .item{
//   border-radius: 17px;
//   min-height: 10px;
// }

#bg-section-title{
  position: fixed;  
  z-index: 0;  
  width: 100%; height: 100vh;
  display: grid;
  place-items: center;
  font-size: 9vw;
  line-height: 1em;
  text-align: center;
  color: $appbgtext;
  &.houses-bg{
    color: $fontblue;
  }
}

@include break($brd){
  .ike-section, .filtered-items-wrapper{
    padding-left: 24px;
    padding-right: 24px;
  }
}
</style>

