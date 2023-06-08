
<template>
  <div class="page-content cluster">
    <h1 v-html="clusterData.attributes.long_title"></h1>
    <OrganismsClusterApps :slug="route.params.id"/>
    <!-- <NuxtLink to="/">Zurück</NuxtLink> -->
  </div>
</template>

<script setup>

const clusterData = ref('');
const route = useRoute();
const { data, error, refresh } = await useFetch(() => `/api/clusters/${route.params.id}?populate[1]=application`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: route.params.id
});
if(!error._value){
  clusterData.value = data.value.data;
  setMetaInfos({
    seo_title: clusterData.value.attributes.title,
    seo_img_url: '/assets/img/Logo/Logo_mittelachsial_dunkelblau.png'
  });     
}else{
  throw createError({ statusCode: 404, statusMessage: 'Kein Cluster mit diesem Namen vorhanden.', fatal: true });    
  // console.log('no valid data or no valid route')
  // await navigateTo('/404')
}

</script>

<style lang="scss" scoped>
.page-content{
  margin-bottom: -62px;
}
h1{
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.1em;
  text-align: center;
  z-index: 1;
  font-size: 53px;
  line-height: 62px;  
  @include break($brd){
    font-size: 13.5vw;
    line-height: .95em;
    padding: 0 20px;
  }
}
:deep(i){
  font-family: "htimes", "Times", serif;
}
</style>