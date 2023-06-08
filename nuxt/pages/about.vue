<template>
  <div class="page-content about-page mc normal-2">
    <h1 v-html="aboutData.title"></h1>
    <section class="text-section" v-for="section in aboutData.sections" v-html="section.content"></section> 
  </div>
</template>

<script setup>
  const aboutData = ref();
  const { data, error, refresh } = await useFetch(() => `/api/page-about?populate=*`, {
    baseURL: useRuntimeConfig().textContentBaseUri,
    key: 'Über das Projekt'
  });
  if(!error._value){
    aboutData.value = data.value.data.attributes;
    setMetaInfos({
      seo_title: 'Über das Projekt',
      seo_img_url: '/assets/img/Logo/Logo_mittelachsial_dunkelblau.png'
    });    
  }else{
    console.log(error)
  }
</script>
<style lang="scss" scoped>
.page-content{
  @include cpt();
  color: $fontblue;
  :deep(a), :deep(i){
    font-family: 'htimes';
  }
}
h1{
  margin-bottom: 40px;
  grid-column: span 6;
}
h1,
:deep(h2),
:deep(h3),
:deep(h4){
  @include small();
}
:deep(h2),
:deep(h3){
  margin-bottom: 3em;
}
.text-section{
  margin-bottom: 70px;  
  grid-column: span 6; 
}
@include break($brd){
  .page-content{
    margin-bottom: 200px;
  }  
  h1{
    grid-column: 3 / span 8;
    margin-bottom: 20px;
  }  
  .text-section{
    margin-bottom: 100px;
    &:nth-child(even) {
      grid-column: 3 / span 7;
    }
    &:nth-child(odd) {
      grid-column: 4 / span 7;
    }      
  }
}
@include break($brmed){
  .text-section{
    &:nth-child(even) {
      grid-column: 3 / span 6;
    }
    &:nth-child(odd) {
      grid-column: 4 / span 6;
    }      
  }
}
</style>