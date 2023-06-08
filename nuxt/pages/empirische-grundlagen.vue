<template>
  <div class="page-content mc">
    <TemplatesSectionWrapper :sections="empiricsData.page_empiric_sections.data" :sectionId="'page-empiric-sections'"/>
  </div>
</template>


<script setup>
const empiricsData = ref();
const { data, error, refresh } = await useFetch(() => `/api/page-empiric?populate=page_empiric_sections`, { 
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: 'empirics'
});
if(!error._value){
  //console.log(data)
  empiricsData.value = data.value.data.attributes
  setMetaInfos({
    seo_title: 'Empirische Grundlagen',
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
:deep(.page-nav) li ul .active:after{
  background-color: $white; 
}
:deep(table) tr{
  border-top: 1px solid $aboutgrey;
}
:deep(.page-nav),
:deep(#active-marker){
  background-color: $white; 
  @include break($brd){
    background-color: transparent; 
  }
} 
:deep(h2),:deep(h3),:deep(h4){
  color: $appblue;
}
:deep(section a){
    font-family: 'htimes';
    font-size: 1.04em;    
    color: $fontblue;
    i{
      position: relative;  
      display: inline-block;
      padding-top: 40px;    
      font-family: 'varela';      
      color: $appblue;
      &:before{
        width: 100%;
        content: 'Download';        
        position: absolute;    
        background-image: url(@/assets/icons/arr-download-blue.svg);      
        background-position: 90px 2px;
        background-size: 14px;
        background-repeat: no-repeat;
        top: 0;    
        @include small();
        color: $fontblue;
      }     
      u{
        @include big-2();        
      } 
    }
  
}
</style>