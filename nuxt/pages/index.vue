<template>
  <div class="page-content"> 
    <section class="home-intro mc">
      <div class="intro-text copy" v-html="homeData.intro_text"></div>
    </section>    
   
        

    <section class="home-teaser-section mc">
      <OrganismsHomeTeaserCollection v-if="homeData" :data="homeData.teasers.data"/>
    </section>

    <section class="cluster-teasers">
      <MoleculesClusterTeaserSection
        v-if="homeData.cluster_tile_teaser_section.data" 
        :data="homeData.cluster_tile_teaser_section.data.attributes" 
        :layout="'tile'"
      /> 
      <MoleculesClusterTeaserSection
        v-if="homeData.cluster_text_teaser_section.data" 
        :data="homeData.cluster_text_teaser_section.data.attributes" 
        :layout="'text'"
      />           
    </section>
    <section class="good-practise-teaser mc">
      <div class="gp-content basic-text-section" v-html="homeData.good_practise_text"></div>
      <div class="gp-quote-teaser">
        <MoleculesTeaserQuote :data="homeData.good_practise_teaser.data"/>       
      </div>
    </section>
    <section class="empirics-teaser mc">
      <img v-if="homeData.empirics_img.data" :src="homeData.empirics_img.data.attributes.url" :alt="homeData.empirics_img.data.attributes.caption">      
      <div class="emp-content basic-text-section" v-html="homeData.empirics_text"></div>    
    </section> 
  
    


  </div>
</template>

<script setup>

const homeData = ref();
const { data, error, refresh } = await useFetch(() => `/api/page-home?populate[0]=teasers.type.application,teasers.type.house,cluster_tile_teaser_section.clusters,cluster_text_teaser_section.clusters,empirics_img,good_practise_teaser.type.house`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: 'home'
});
if(!error._value){
  homeData.value = data.value.data.attributes;
  setMetaInfos({
    seo_title: 'Materialisierung des Immateriellen im Museum',
    seo_img_url: '/assets/img/Logo/Logo_mittelachsial_dunkelblau.png'
    //seo_img_url: homeData.value.empirics_img.data.attributes.url      
  });
}else{
  console.log(error)
  //await navigateTo('/404')
}
</script>
<style lang="scss" scoped>
.home-intro{
  .intro-text{
    padding: 130px 0 310px;    
    grid-column: span 5;
    @include break($brd){
      padding: 230px 0 100px;
      grid-column: 2 / span 6;
    }
  }
}
.cluster-teasers{
  overflow: hidden;
}
.text-with-image:v-deep(img){           
    float: right;
    width: 30%;    
}
.good-practise-teaser{
  background-color: $goodterra;
  color: $fontblue;
  padding-top: 70px;
  padding-bottom: 80px;
  .gp-content{
    grid-column: span 6;
    @include break($brd){
      padding-right: 40px;
      grid-column: 2 / span 7;
    }   
    @include break($brbig){
      grid-column: 3 / span 5;
    }       
  }
  @include break($brd){
    padding-top: 186px;
    padding-bottom: 180px;
  }
  .gp-quote-teaser{
    .quote-teaser-wrapper{
      background-color: $gooddarkterra;
      border-radius: 123px;
      padding: 2.5em 2em;
    }    
    grid-column: span 6;
    margin-top: 40px;
    @include break($brd){
      margin-top: 0px;
      grid-column: 9 / span 5;
    }   
    @include break($brbig){
      grid-column: 8 / span 3;
    }   
  }
  :deep(.btn-toggle-house){
    color: $fontblue;
  }
}
.empirics-teaser{
  background-color: $white;
  color: $fontblue;
  padding-top: 70px;
  padding-bottom: 80px;
  margin-bottom: -63px;
  img{
    grid-column: span 6;
    @include break($brd){
      margin-top: 180px;
      grid-column: span 5;
    }   
    @include break($brbig){
      grid-column: 3 / span 3;
    }          
  }
  .emp-content{
    grid-column: span 6;
    @include break($brd){
      grid-column: 6 / span 6;
    }   
    @include break($brbig){
      grid-column: 6 / span 5;
    }       
  }
  @include break($brd){
    padding-top: 186px;
    padding-bottom: 180px;
  }
}

</style>


