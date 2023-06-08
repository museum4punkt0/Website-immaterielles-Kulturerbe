<template>
  <div class="filter-container">
    <button class="btn-filter btn-filter-toggle" :class="{ 'btn-active': showFilterButtons }"
      @click="showFilterButtons = !showFilterButtons">Filter
      <img alt="toggle filter button" src="@/assets/icons/chevron-white.svg">
    </button>
    <button class="btn-filter btn-toggle-map" v-if="pageItemsType === 'houses'" @click="store.isMapView = !store.isMapView">
      <img v-if="store.isMapView" src="@/assets/icons/list.svg" alt="Listenansicht anzeigen">
      <img v-else src="@/assets/icons/map.svg" alt="Karte anzeigen" >
    </button>
    <div class="filter-wrapper" v-show="showFilterButtons">
      <ul>
        <li v-for="(value, key) in filterSections"
          :class="{ 'filter-section-expanded': value.filterSectionId === expandedSecondLevel }"
          :key="value.filterSectionId"
        >
          <div class="filter-btn-header"
            :class="{ 'filter-section-is-active': filterIsSetForSection( value.filterSectionId) }">
            <button class="btn-filter btn-expand-section" @click="toggleSecondLevel(value.filterSectionId)">
              {{ value.nameDe }} <img alt="toggle filter list" src="@/assets/icons/chevron-dark.svg">
            </button>
            <button class="btn btn-filter btn-reset" @click="resetFilter(filterType, value.filterSectionId)">
              <img alt="reset filter" src="@/assets/icons/close-filter-dark.svg">
            </button>
          </div>
          <MoleculesFiltersSecondLevel :pageItemsType="pageItemsType" :filterName="key"
            :filterSectionId="value.filterSectionId"
            :filtersActive="filterIsSetForSection(filterType, value.filterSectionId)"
            :isExpanded="expandedSecondLevel === value.filterSectionId" />
        </li>
      </ul>
      <button class="btn-filter btn-reset-all" @click="resetFilter(filterType)">alle Filter zurücksetzen</button>
    </div>
    <MoleculesIkeBar :ikeCategories="ikeCategories" :filterType="filterType" />
  </div>
</template> 

<script setup>
import { useFilterStateStore } from '@/store/filterState'
const store = useFilterStateStore();

const showFilterButtons = ref(false);

const appFilterDict = {
  "app-filter-keywords": { nameDe: "Schlüsselbegriffe", filterSectionId: 'app_filter_keywords' },
  "app-filter-types": { nameDe: "Anwendungstypen", filterSectionId: 'app_filter_types' },
  "app-filter-hardwares": { nameDe: "Hardware & Infrastruktur", filterSectionId: 'app_filter_hardwares' },
  "app-filter-softwares": { nameDe: "Software & Daten", filterSectionId: 'app_filter_softwares' },
  "app-filter-approaches": { nameDe: "Vermittlungsansätze", filterSectionId: 'app_filter_approaches' },
  "app-filter-accesses": { nameDe: "Zugänge", filterSectionId: 'app_filter_access' },
  "app-filter-goals": { nameDe: "Vermittlungsziele", filterSectionId: 'app_filter_goals' },
  "app-filter-targetgroups": { nameDe: "Zielgruppen", filterSectionId: 'app_filter_targetgroups' },
  "app-filter-usages": { nameDe: "Benutzung", filterSectionId: 'app_filter_usages' },
  "app-filter-devcosts": { nameDe: "Entwicklungskosten (in €)", filterSectionId: 'app_filter_devcost' },
  "app-filter-followupcosts": { nameDe: "Folgekosten (in €)", filterSectionId: 'app_filter_followupcost' },
}
const houseFilterDict = {
  "house-filter-keywords": { nameDe: "Schlüsselbegriffe", filterSectionId: 'house_filter_keywords' },
  "house-filter-types": { nameDe: "Museumstypen", filterSectionId: 'house_filter_type' },
  "house-filter-collectionfoci": { nameDe: "Sammlungsschwerpunkte", filterSectionId: 'house_filter_collectionfoci' },
  "house-filter-collectionsizes": { nameDe: "Sammlungsgröße", filterSectionId: 'house_filter_collectionsize' },
  "house-filter-visitorcounts": { nameDe: "Besuchszahlen", filterSectionId: 'house_filter_visitorcount' },
  "house-filter-agencies": { nameDe: "Träger", filterSectionId: 'house_filter_agency' },
  "house-filter-states": { nameDe: "Bundesländer", filterSectionId: 'house_filter_state' },
  "house-filter-communitysizes": { nameDe: "Gemeindegröße", filterSectionId: 'house_filter_communitysize' },
}

const props = defineProps({
  ikeCategories: {},
  pageItemsType: String
})
const expandedSecondLevel = ref();

const filterType = ref('');
filterType.value = props.pageItemsType === 'applications' ? 'appFilter' : 'houseFilter';

const filterSections = props.pageItemsType === 'applications' ? appFilterDict : houseFilterDict;

function toggleSecondLevel(aFilterName) {
  if (expandedSecondLevel.value === aFilterName) {
    expandedSecondLevel.value = '';
  } else {
    expandedSecondLevel.value = aFilterName;
  }
}

function filterIsSetForSection(aFilterSectionId){
  if(Array.isArray(store[filterType.value][aFilterSectionId])){
    return store[filterType.value][aFilterSectionId].length > 0 ? true : false
  }else{
    return store[filterType.value][aFilterSectionId] !== '' ? true : false
  }   
}

function resetFilter(aFilterType, filterSectionId) {
  if (filterSectionId) {
    store.resetFilter(aFilterType, filterSectionId)
  } else {
    store.resetAllFilters(aFilterType)
  }
}

</script>

<style lang="scss" scoped>
.filter-container {
  position: absolute;
  top: 0;
  width: 100%;
  font-family: 'courier', monospace;
}

.filter-wrapper {
  position: relative;
  width: calc(100vw - 20px);
  height: calc(100vh - 80px);
  flex-wrap: wrap;
  z-index: 1;
  padding-top: 5px;
  overflow: auto;
  @include hideScrollBar();
  &::-webkit-scrollbar {
    display: none;
  }  
}

.filter-btn-header {
  display: flex;
  align-items: center;
}

.btn-filter {
  height: 21px;
  border-radius: 999px;
  padding: 3px 15px 3px 15px;
  background-color: $white;
  margin-bottom: 5px;
  font-size: 13px;
  align-items: center;
  display: flex;
  justify-content: space-between;

  img {
    margin-left: 20px;
    flex: 0 0 10px;
  }
}

.btn-filter-toggle {
  border-radius: 999px;
  background-color: $darkblue;
  color: $white;
  position: relative;
  z-index: 4;
  min-width: 80px;
  margin-bottom: 0;
}

.btn-reset {
  width: 16px;
  height: 16px;
  margin-left: 5px;
  padding: 0;
  justify-content: center;
  display: none;

  img {
    margin: 0;
    width: 12px;
  }
}
.btn-reset-all{
  background-color: $imprintyellow;
}
.btn-toggle-map{
  position: absolute;
  top: 0px;
  left: 80px;  
  width: 65px;
  justify-content: right;
  padding-right: 12px;
  background-color: $housemintdarkest;
  color: #00000033;
  z-index: 3;  
  img{
    width: 15px;
  }
  @include break($brd){
    padding-right: 25px;
    width: 90px;
    left: 90px;
    img{
      width: 20px;
    }    
  }
}

.filter-section-expanded {
  .btn-expand-section {
    img {
      transform: scale(1, -1);
    }
  }
}

.btn-active {
  img {
    transform: scale(1, -1);
  }
}

.filter-section-is-active {
  .btn-filter {
    font-weight: bold;
    background-color: $lightgrey;
  }

  .btn-reset {
    display: flex;
  }
}


@include break($brd) {
  .filter-container {
    width: auto;
    max-width: 380px;
  }

  .filter-wrapper {
    width: auto;
    padding-right: 20px;
    height: calc(100vh - 150px);
    padding-top: 15px;
  }

  .btn-filter {
    height: 34px;
    margin-bottom: 15px;
    font-size: 16px;
  }
  .btn-filter-toggle {
    min-width: 120px;
    margin-bottom: 0;
  }
  .btn-reset {
    width: 26px;
    height: 26px;
    margin-left: 10px;

    img {
      flex: 0 0 17px;
    }
  }
}
</style>

