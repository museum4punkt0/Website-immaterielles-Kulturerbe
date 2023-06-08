<template>
  <!-- maybe refaktor move content to filters component and delete this component -->
  <div class="filter-module-wrapper">
    <OrganismsFilters  :pageItemsType="pageItemsType" :ikeCategories="ikeCategories"/>
  </div>

</template>

<script setup>
const props = defineProps({
  pageItemsType: String,
  ikeCategories:{}
})

</script>

<style lang="scss" scoped>
.filter-module-wrapper{
  position: fixed;
  z-index: 100;
  top: 80px;
  padding-left: 10px;
  width: 100%;
}
@include break($brd){
  .filter-module-wrapper{
    top: 120px;
    padding-left: 30px;
  }
}

</style>

