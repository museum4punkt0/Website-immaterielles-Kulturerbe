
<template>
  <div class="house-content page-content">
    <MoleculesHouseHeader :title="houseData.title" :img="houseData.img" :adress="houseData.adress"/>
    <MoleculesHouseTags :tagData="{
        'house_ike_categories': houseData.house_ike_categories,
        'house_filter_types': houseData.house_filter_type,
        'house_filter_keywords': houseData.house_filter_keywords,        
        'house_filter_collectionsize':houseData.house_filter_collectionsize,
        'house_filter_visitorcount': houseData.house_filter_visitorcount,
        'house_filter_communitysize':houseData.house_filter_communitysize,         
        'house_filter_agency': houseData.house_filter_agency,        
        'house_filter_state': houseData.house_filter_state,
      }"
      :isBigTagCloud="true"
    />
    <OrganismsRelatedAppsModule :relatedApplications="houseData.applications.data" :headline="'Anwendungen in diesem Haus'"/>
  </div>
</template>

<script setup>

const houseData = ref('');
const route = useRoute();

const { data, error, refresh } = await useFetch(() => `/api/houses/${route.params.id}`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: route.params.id
});
if(!error._value){
  houseData.value = data.value.data.attributes;
  setMetaInfos({
    seo_title: houseData.value.title,
    seo_img_url: houseData.value.img.data.attributes.url
  });    
}else{
  throw createError({ statusCode: 404, statusMessage: 'Keine Haus mit diesem Namen vorhanden.', fatal: true});    
}

</script>

<style lang="scss" scoped>
.page-content{
  padding-bottom: 0;
  overflow: hidden;
}
:deep(.app-teaser-wrapper){
  color: $white;
}
</style>