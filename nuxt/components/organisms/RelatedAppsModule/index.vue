<template>

  <template v-if="props.relatedApplications && props.relatedApplications.length > 0">
  <!-- in app / house footer -->  
  <section v-if="smallVersion !== true" class="related-apps-wrapper mc">
    <h2 v-if="props.headline !== ''" class="small">{{props.headline}}</h2>    
    <div class="related-apps-wrapper-inner">
      <MoleculesTeaserApp v-for="app in props.relatedApplications" :slug="app.attributes.slug" />
    </div>
  </section>

  <!-- in house list teaser -->
  <section v-else class="related-apps-wrapper small-version">
    <h3 v-if="props.headline !== ''">{{props.headline}}</h3>
    <div class="related-apps-wrapper-inner">
      <MoleculesTeaserApp v-for="app in props.relatedApplications" :slug="app.attributes.slug" :smallVersion="smallVersion"/>
    </div>    
  </section>
  
  </template>


</template>

<script setup>
const props = defineProps({
  relatedApplications: Array,
  headline: String,
  smallVersion: Boolean
})
</script>

<style lang="scss" scoped>
// big version under apps and houses
.mc{  
  padding-bottom: 70px;
  @include break($brd){
    padding-bottom: 220px;
  }
  h2{
    margin-bottom: 30px;    
    grid-column: span 6;
    @include break($brd){
      margin-bottom: 70px;      
      grid-column: 3 / span 8;
    }
  }
  :deep(.app-teaser-wrapper){
    margin-bottom: 20px;
  }
  .related-apps-wrapper-inner{
    grid-column: span 6;
    @include break($brd){
      grid-column: 3 / span 8;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
  }  
}


.small-version{
  margin-top: 1em;
  .related-apps-wrapper-inner{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    flex-direction: column;
    *{
      flex: 0 0 100%;
    }
  }  
  :deep(.app-teaser-wrapper){
    background-color: transparent;
    .app-teaser-inner{
      display: flex;
      gap: 14px;
    }
    .img-wrapper{
      flex: 0 0 20%;
      img{
        border-radius: 15px;
      }
    }
    .abstract, .tag-wrapper{
      display: none;
    }
  }  
  :deep(.info-wrapper){
    padding: 0;
  }
}
</style>


