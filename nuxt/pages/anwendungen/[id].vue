
<template>
  <div class="app-content page-content">
    <MoleculesAppHeader :title="appData.title" :img="appData.img"/>
    <MoleculesAppTags 
      :tagData="{
        'app_filter_keywords': appData.app_filter_keywords, 
        'app_ike_categories': appData.app_ike_categories, 
        'app_filter_types': appData.app_filter_types, 
        'app_filter_hardwares': appData.app_filter_hardwares,
        'app_filter_softwares': appData.app_filter_softwares,
        'app_filter_approaches': appData.app_filter_approaches,
        'app_filter_goals': appData.app_filter_goals,
        'app_filter_usages': appData.app_filter_usages
      }"
      :isBigTagCloud="true"
    />
    <div class="desc-sideinfo-wrapper mc">
      <MoleculesAppDescription :shortDesc="appData.short_description" :description="appData.description"/>
      <MoleculesAppSideInfos :data="appData.sideinfos"/>
    </div>
    <MoleculesAppImages v-if="appData.images.data" :images="appData.images.data"/> 
    <OrganismsAppBenefits :benefits="appData.benefits"/>
    <AtomsAppLearnings :learnings="appData.learnings"/>
    <OrganismsAppCosts :devCost="appData.app_filter_devcost" :followUpCost="appData.app_filter_followupcost" :funder="appData.funder"/> 
    <MoleculesTeaserHouse v-if="appData.house.data" :slug="appData.house.data.attributes.slug"/>
    <OrganismsRelatedAppsModule :relatedApplications="appData.related_applications.data" :headline="'Weitere Anwendungen'"/>
  </div>
</template>

<script setup>

const appData = ref('');
const route = useRoute();

const { data, error, refresh } = await useFetch(() => `/api/applications/${route.params.id}?populate=*`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: route.params.id
});
if(!error._value){
  appData.value = data.value.data.attributes;
  setMetaInfos({
    seo_title: appData.value.title,
    seo_description: appData.value.abstract,
    seo_img_url: appData.value.img.data.attributes.url
  });   
}else{
  throw createError({ statusCode: 404, statusMessage: 'Keine Anwendung mit diesem Namen vorhanden.', fatal: true});  
}

</script>

<style lang="scss" scoped>
.page-content{
  padding-bottom: 0;
}
.desc-sideinfo-wrapper{
  margin-bottom: 70px;
  @include break($brd){
    margin-bottom: 200px;
  }
}
</style>