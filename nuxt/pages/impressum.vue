<template>
  <div class="imprint page-content">
    <div class="mc">
      <div class="imprint-inner">
        <h1 v-html="imprintData.title"></h1>
        <div class="imprint-intro normal" v-html="imprintData.intro"></div>
        <div class="imprint-content" v-html="imprintData.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const imprintData = ref();
const { data, error, refresh } = await useFetch(() => `/api/page-imprint?populate=*`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: 'imprint'
});
if(!error._value){
  imprintData.value = data.value.data.attributes
  setMetaInfos({
  seo_title: 'Impressum',
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
.imprint-inner{
  grid-column: span 6;
  :deep(p){
    margin-bottom: 1.2em;
  }
}
:deep(a){
  font-family: 'htimes';
  text-decoration: none !important;
  color: $fontblue !important;
}
.imprint-intro{
  margin-bottom: 3em;  
}
@include break($brd){
  .imprint-inner{
    grid-column: 3 / span 6;
  }
}
</style>