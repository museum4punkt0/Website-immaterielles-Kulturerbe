<template>
  <div class="page-content mc">
    <TemplatesSectionWrapper 
      :introText="goodPracticeData.intro"
      :sections="goodPracticeData.page_sections.data" 
      :sectionId="'page-sections'"/>
  </div>
</template>


<script setup>
const goodPracticeData = ref();
const { data, error, refresh } = await useFetch(() => `/api/page-good-practise?populate=page_sections`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: 'good-practice'
});
if(!error._value){
  goodPracticeData.value = data.value.data.attributes
  setMetaInfos({
    seo_title: 'Good Practices',
    seo_img_url: '/assets/img/Logo/Logo_mittelachsial_dunkelblau.png'
  });  
}else{
  console.log(error)
  //await navigateTo('/404')
}

</script>
<style lang="scss" scoped>
.page-content{
  @include cptGpEmp();  
  color: $fontblue;  
}
:deep(.page-nav),
:deep(#active-marker){
  background-color: $goodterra; 
  @include break($brd){
    background-color: transparent; 
  }
} 
:deep(table) tr{
  border-top: 1px solid $gooddarkterra;
}           
:deep(.quote-teaser-wrapper){
  background-color: $gooddarkterra;
  &.in-depth-interview{
    background-color: $goodlightterra;
  }
}
:deep(h2){
  @include headlineSubNavPage();
}
:deep(h3){
  @include headlineSubNavPage();
}
:deep(.text-section a){
  font-family: 'htimes';
  font-size: 1.04em;
}
 
</style>