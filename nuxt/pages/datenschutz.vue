<template>
  <div class="privacy page-content">
    <div class="mc">
      <div class="privacy-content" v-html="imprintData.content"></div>
    </div>
  </div>
</template>

<script setup>
const imprintData = ref();
const { data, error, refresh } = await useFetch(() => `/api/page-privacy?populate=*`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: 'privacy'
});
if(!error._value){
  imprintData.value = data.value.data.attributes;
  setMetaInfos({
    seo_title: 'Datenschutz',
    seo_img_url: '/assets/img/Logo/Logo_mittelachsial_dunkelblau.png'
  });    
}else{
  console.log(error)
  //await navigateTo('/404')
}

</script>
<style lang="scss" scoped>
.page-content{
  @include cptImprint();
  line-height: 1.27777778;
  color: $fontblue;  
}
.privacy-content{
  grid-column: span 6;
}
:deep(h1){
  font-size: 2.5em;
}
:deep(strong){
  font-size: 2em;
  font-weight: normal;
}
:deep(a){
  font-family: 'htimes';
  text-decoration: none !important;
  color: $fontblue !important;
}
@include break($brd){
  .privacy-content{
    grid-column: 3 / span 6;
  }
}
</style>