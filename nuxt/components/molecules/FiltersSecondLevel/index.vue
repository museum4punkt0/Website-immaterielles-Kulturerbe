<template>
  <div 
    class="filters-second-level-wrapper" v-show="isExpanded" :key="'list-wrap-'+filterSectionId"
    :class="{'filter-section-active' : filtersActive}"
  >
   <ul class="filter-list" v-if="filterOnType">
      <li v-for="filterOption in secondLevelfilters" :key="filterSectionId + '-' +filterOption.attributes.slug">     
        <AtomsFilterButton 
          :filterOption="filterOption" 
          :filterSectionId="filterSectionId"
          :filterOnType="filterOnType"
        />
      </li>
    </ul>
  </div>

</template> 

<script setup>
import { useFilterStateStore } from '@/store/filterState'
const store = useFilterStateStore();
const props = defineProps({
  filterName: String,
  filterSectionId: String,
  pageItemsType: String, 
  filtersActive: Boolean,  
  isExpanded: {
    type: Boolean,
    default: false
  },
});

const filterOnType = props.pageItemsType === 'applications' ? 'app' : 'house';
const secondLevelfilters = ref();
const sortById = ['app-filter-devcosts','app-filter-followupcosts', 'house-filter-visitorcounts', 'house-filter-collectionsizes', 'house-filter-communitysizes'];
const sortBy = sortById.includes(props.filterName) ? 'Id' : 'slug';

const { data, error, refresh } = await useFetch(() => `/api/${props.filterName}?pagination[pageSize]=100&sort=${sortBy}`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: props.filterName
});
if(!error._value){
  secondLevelfilters.value = data.value.data
}else{
  console.log(error)
}


</script>

<style lang="scss" scoped>
.filters-second-level-wrapper{
  padding-right: 10px;
  background-color: $lightgrey;  
  border-radius: 17px;  
  width: 100%;
  max-width: 400px;
  color: $fontblue;  
  font-size: 13px;
}
.filter-list{
  max-height: 240px;  
  margin-bottom: 5px;
  padding: 12px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;  
  li{
    font-size: 13px;
    line-height: 1.2em;
    padding: 4px 0;
  }
  :deep(button){
    line-height: inherit;
  }
}
@include break($brd){
  .filters-second-level-wrapper{
    max-width: 500x;
    font-size: 16px;
  }
  .filter-list{
    margin-bottom: 15px;
    li{
      line-height: 1.1em;
      font-size: 16px;
      padding: 4px 0;
    }    
  }
}
</style>

