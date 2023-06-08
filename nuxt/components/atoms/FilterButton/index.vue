<template>
  <div :class="{'btn-active' : buttonIsActive}" class="btn-filter-wrapper">
    <!-- multi-select -->    
    <template v-if="selectType === 'multi'">             
      <button 
        @click="setFilter()"
        :class="{'filter-is-active' : store[filterOnType+'Filter'][filterSectionId].includes(filterOption.attributes.slug)}"
        :key="'multi'"
      >
        {{filterOption.attributes.title}} <img class="filter-checkmark" alt="filter active icon" src="@/assets/icons/check.svg">            
      </button>              
    </template>
    <!-- single-select -->
    <template v-else>
      <button 
        @click="setFilter()"
        class="btn-single-select"
        :class="{'filter-is-active' : store[filterOnType+'Filter'][filterSectionId] === filterOption.attributes.slug}"
        :key="'single'"
      >
        {{filterOption.attributes.title}} <img class="filter-checkmark" alt="filter active icon" src="@/assets/icons/check.svg">
      </button>
    </template>
  </div>
</template> 

<script setup>
import { useFilterStateStore } from '@/store/filterState'
const store = useFilterStateStore();

const props = defineProps({
  filterSectionId: String,
  filterOnType: String,
  filterOption: Object
});

const selectType = Array.isArray(store[props.filterOnType+'Filter'][props.filterSectionId]) ? 'multi' : 'single';

// define state of button, based on filter set / items exist
const buttonIsActive = computed(() => {
  if(store[`${props.filterOnType}FilterIsActive`] === false && itemsForOptionExits.value){
    return true
  }else if(itemsForOptionExits.value){
    return true
  }else{
    return false
  }
})

// check button/filter hast results in items
const itemsForOptionExits = computed(() => {
  let itemFound = false;  
  // loop through filteredItems in store and check if any contains filterOption
  for (let i = 0; i < store.filteredItems.length; i++) { 
    //console.log(store.filteredItems[i].attributes[props.filterSectionId].data)    
    if(selectType === 'multi'){
      // check if filter is set on item
      if(store.filteredItems[i].attributes[props.filterSectionId].data){
        const index = store.filteredItems[i].attributes[props.filterSectionId].data.findIndex(e => e.attributes.slug === props.filterOption.attributes.slug);
        if (index > -1) {
          itemFound = true;
          //console.log(props.filterOption.attributes.slug)
          break;
        }
      }
    }else{
      // check if filter is set on item
      if(store.filteredItems[i].attributes[props.filterSectionId].data){
        if(store.filteredItems[i].attributes[props.filterSectionId].data.attributes.slug === props.filterOption.attributes.slug){
          itemFound = true;
          break;
        }
      }      
    }
  }
  return itemFound;
})

function setFilter(){
  // ifno filter active get scroll OffSet of 'in-view' ikeSection
  let activeSectionBeforeFiltering, tSection, sectionOffset;
  let goToScrollPos = false;
  if(store[`${props.filterOnType}FilterIsActive`] === false){
    activeSectionBeforeFiltering = store.activeSection;  
    tSection = document.getElementById(activeSectionBeforeFiltering);
    sectionOffset = tSection.offsetTop - window.scrollY;  
    goToScrollPos = true;
  }

  if(selectType === 'multi'){
    store.setMultiSelectFilter((props.filterOnType+'Filter'), props.filterSectionId, props.filterOption.attributes.slug)
  }else{
    store.setSingleSelectFilter((props.filterOnType+'Filter'), props.filterSectionId, props.filterOption.attributes.slug)
  }

  // scroll to Pos of First Element of 'in-view' ikeSection before filtering
  if(goToScrollPos){
    nextTick(() => {
      useScrollAfterFilter(activeSectionBeforeFiltering, sectionOffset);
    })
  }

}

</script>

<style lang="scss" scoped>
.btn-filter-wrapper{
  opacity: .3;
&.btn-active{
  opacity: 1;
}
  
}
.button{
  width: 100%;
}
.filter-checkmark{
  display: none;
  width: 10px;
}
.filter-is-active{
  font-weight: bold;
  .filter-checkmark{
    display: inline-block;
  }    
}
</style>

