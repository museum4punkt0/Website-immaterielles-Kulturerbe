<template>
  <div>
    <OrganismsFilterModule :ikeCategories="categoriesSimple" :pageItemsType="pageItemsType"/>
    <OrganismsFilterViewList :ikeCategories="categoriesSimple" :pageCategory="pageCategory" :pageItemsType="pageItemsType"/>    
  </div>
</template>

<script setup>
const props = defineProps({
  pageCategory: {
    type: String,
    default: 'app'
  }
});
const categoriesSimple = ref();
const pageItemsType = props.pageCategory === 'app' ? 'applications' : 'houses';
const { data, error, refresh } = await useFetch(() => `/api/${props.pageCategory}-ike-categories`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: props.pageCategory
});
if(!error._value){
  // console.log(data.value.data)  
  categoriesSimple.value = data.value.data.map(getSimplifiedCategoryData);
}

function getSimplifiedCategoryData(item) {
  let obj = {}
  obj.title = item.attributes.title;
  obj.slug = item.attributes.slug;
  return obj //[item.firstname,item.lastname].join(" ");
}

</script>

<style lang="scss" scoped>

</style>

