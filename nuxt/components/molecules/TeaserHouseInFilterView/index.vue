<template>
  <div class="house-teaser-wrapper">
    <NuxtLink :to="`/haeuser/${teaserHouseData.slug}`" class="image-wrapper">
      <img v-if="teaserHouseData.img.data && teaserHouseData.img.data.attributes.formats.large" 
      :src="teaserHouseData.img.data.attributes.formats.large.url" :alt="teaserHouseData.img.data.attributes.caption" loading="lazy"> 
      <img v-else-if="teaserHouseData.img.data" 
      :src="teaserHouseData.img.data.attributes.url" :alt="teaserHouseData.img.data.attributes.caption" loading="lazy">       
    </NuxtLink>
    <div class="infos">
      <h2><NuxtLink :to="`/haeuser/${teaserHouseData.slug}`">{{ teaserHouseData.title }}</NuxtLink></h2>
      <div class="details-wrapper">    
        <ul>
          <li v-if="teaserHouseData.house_filter_type.data"><span>Museumstyp</span>{{teaserHouseData.house_filter_type.data.attributes.title}}</li>
          <li>
            <span>Adresse</span><span>{{teaserHouseData.short_adress}}</span>
          </li>
          <li v-if="teaserHouseData.house_filter_agency.data">
            <span>Trägerschaft</span><span>{{teaserHouseData.house_filter_agency.data.attributes.title}}</span>
          </li>
          <li v-if="teaserHouseData.house_filter_visitorcount.data">
            <span>Besuchszahl</span><span>{{teaserHouseData.house_filter_visitorcount.data.attributes.title}}</span>
          </li>
          <li v-if="teaserHouseData.house_filter_communitysize.data">
            <span>Gemeindegröße</span><span>{{teaserHouseData.house_filter_communitysize.data.attributes.title}}</span>
          </li>
          <li v-if="teaserHouseData.house_filter_collectionsize.data">
            <span>Sammlungsgröße</span><span>{{ teaserHouseData.house_filter_collectionsize.data.attributes.title }}</span>
          </li>        
        </ul>
        <OrganismsRelatedAppsModule 
          :relatedApplications="teaserHouseData.applications.data" 
          :headline="'Anwendungen in diesem Haus'"
          :smallVersion="true"
        />      
      </div>          
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {}    
  } 
})

const teaserHouseData = ref(props.data);

</script>

<style lang="scss" scoped>
.house-teaser-wrapper{
  background-color: $housemintlight;
  border-radius: 26px;
 
}
.infos{
  padding: 22px 12px 12px;
}
h2{
  font-size: 20px;
  line-height: 23px;
  margin-bottom: 18px;
}
img{
  max-width: 100%;
  border-radius: 26px;
}
.details-wrapper{
  font-size: 13px;
  line-height: 15px;
  font-family: 'courier';
  ul{
    margin-bottom: 1.5em;
  }
  li{
    display: flex;
    gap: 10px;
    border-top: 1px solid #4F5E7333;
    padding: 5px 0px;
    &:first-child{
      border-top: none;
    }
    span{
      &:first-child{
        color: #4F5E73;        
        flex: 0 0 33%;
        max-width: 150px;
      }
    }
  }
}
.image-wrapper{
  display: block;
  position: relative;
  width: 100%;
  padding-top: 100%;
  img{
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
:deep(.related-apps-wrapper){
  h3{
    font-size: 15px;
    margin-bottom: 1em;
  }
  h2{
    font-size: 16px;
    line-height: 1.2777778em;
  }
}
@include break($brd){
  .infos{
    padding: 20px;
  }   
  h2{
    font-size: 24px;
    line-height: 28px;
  }
  :deep(.related-apps-wrapper){
    h3{
      font-size: 16px;
      margin-bottom: 1em;
    }
    h2{
      font-size: 20px;
      line-height: 1.2777778em;
    }
  }  
}
</style>


