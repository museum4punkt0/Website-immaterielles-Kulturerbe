<template>
  
  <!-- small teaser -->
  <div class="house-teaser-wrapper" v-if="!bigTeaser">    
    <NuxtLink :to="`/haeuser/${teaserHouseData.slug}`" class="img-wrapper">
      <img v-if="teaserHouseData.img.data" :src="teaserHouseData.img.data.attributes.url" :alt="teaserHouseData.img.data.attributes.caption">
    </NuxtLink>
    <div class="house-info-container">
      <h2><NuxtLink :to="`/haeuser/${teaserHouseData.slug}`">{{ teaserHouseData.title }}</NuxtLink></h2>
      <ul>
        <li><h3>Standort: </h3><span>{{ teaserHouseData.short_adress }}</span></li>
        <li><h3>Anwendung: </h3><span>{{ teaserHouseData.applications.data[0].attributes.title }}</span></li>
        <li>
          <h3>Schwerpunkt: </h3>
          <template v-if="teaserHouseData.house_filter_collectionfoci">
            <div>
              <span v-for="(focus, index) in teaserHouseData.house_filter_collectionfoci.data">
                {{focus.attributes.title}}<template v-if="index < teaserHouseData.house_filter_collectionfoci.data.length - 1">, </template>
              </span>
            </div>
          </template>
        </li>        
      </ul>  
    </div>
    <NuxtLink class="all-houses-link" :to="'/haeuser'">zu allen Häusern</NuxtLink>          
  </div>


  <!-- big teaser -->  
  <div class="big-house-teaser-wrapper" v-else>
    <h2 class="small mc"><div>Haus</div></h2>
    <div class="big-inner">
      <div class="top-wrapper">
        <NuxtLink :to="`/haeuser/${teaserHouseData.slug}`" class="img-wrapper">
          <img v-if="teaserHouseData.img.data" :src="teaserHouseData.img.data.attributes.url" :alt="teaserHouseData.img.data.attributes.caption">
        </NuxtLink>
        <div class="house-main-info">
          <h3 class="normal"><NuxtLink :to="`/haeuser/${teaserHouseData.slug}`">{{ teaserHouseData.title }}</NuxtLink></h3>
          <div class="small adress" v-html="teaserHouseData.adress"></div>    
        </div>
      </div>
      <div class="bottom-wrapper">
        <div class="house-tag-selection">
          <AtomsTag v-if="teaserHouseData.house_filter_type.data"
            :data="teaserHouseData.house_filter_type.data" 
            :filterType="'house'"     
            :filterId="'house_filter_type'"   
          />
          <AtomsTag v-if="teaserHouseData.house_filter_visitorcount.data"
            :data="teaserHouseData.house_filter_visitorcount.data" 
            :filterType="'house'"     
            :filterId="'house_filter_visitorcount'"   
            class="tag-level-1"                     
          />
          <AtomsTag v-if="teaserHouseData.house_filter_collectionsize.data"
            :data="teaserHouseData.house_filter_collectionsize.data" 
            :filterType="'house'"     
            :filterId="'house_filter_collectionsize'"   
            class="tag-level-1"           
          />      
          <AtomsTag v-if="teaserHouseData.house_filter_agency.data"
            :data="teaserHouseData.house_filter_agency.data" 
            :filterType="'house'"     
            :filterId="'house_filter_agency'"   
            class="tag-level-2"           
          />                                 
        </div>
      </div>
    </div>
  </div>  
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {}    
  },
  slug: {
    type: String,
    default: ''
  }  
})
let houseSlug ='';
let bigTeaser = false;
// data comes from homeTeaserColletion as Object or just slug e.g. in appSingle
if(props.slug === ''){
  houseSlug = props.data.attributes.type[0].house.data.attributes.slug;  
}else{
  houseSlug = props.slug;
  bigTeaser = true;
}

const teaserHouseData = ref();
const {data, error} = await useFetch(() => `/api/houses/?filters[slug][$eq]=${houseSlug}&populate[0]=img,applications,house_ike_categories,house_filter_type,house_filter_visitorcount,house_filter_collectionsize,house_filter_collectionfoci,house_filter_agency`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: 'teaser-house-'+houseSlug
});
if(!error._value){
  teaserHouseData.value = data.value.data[0].attributes;
}else{
  console.log('no valid data or no valid route')
  await navigateTo('/404')
}

onMounted(() => {
  addTargetBlank(".house-main-info .adress a");
})

</script>

<style lang="scss" scoped>
.img-wrapper{
    bottom: 57%;
    right: -10px;
    position: absolute;
    width: 50%;
    padding-top: 50%;
    //border: 1px solid red;
    img{
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 9999px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
}  

.big-house-teaser-wrapper{
  margin-bottom: 120px;
  @include break($brd){
    margin-bottom: 0px;
  }  
  h2{
    margin-top: 70px;
    margin-bottom: 40px;
    div{
      grid-column: span 6;
      @include break($brd){
        grid-column:  3 / span 9;
      }
    }
  }
  .img-wrapper{
    right: 0;
    bottom: 60%;
    width: 45%;
    padding-top: 45%;
  }
}
.big-inner{
  max-width: 500px;
  margin: 0 auto;
  @include break($brd){
    max-width: 900px;
  }
}
.top-wrapper{
  position: relative;
  left: $padMob;
  width: calc(100vw - 24px);
  height: calc(100vw - 24px);
  max-width: 500px;
  max-height: 500px;
  border-radius: 9999px;  
  color: $fontblue;
  background-color: $housemintlight;  
  @include break($brd){
    max-width: 600px;
    max-height: 600px;    
  }   
}
.house-main-info{
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 40% 10% 10%;
}
h3{
  line-height: 1.15em;
  @include break($brd){
    padding-right: 20%;
  }
}  
.adress{
  :deep(a){
    position: relative;
    top: 12px;
    font-family: 'htimes';
    width: 100%;
    text-align: center;
    line-height: 1em;        
  } 
}
.bottom-wrapper{
  position: relative;  
  top: -30px;
  left: calc(100vw - 300px - 12px);
  left: min( calc(100vw - 300px - 12px) , 200px );
  width: calc(95vw - 24px);
  height: calc(95vw - 24px);
  max-width: 300px;
  max-height: 300px;
  border-radius: 9999px;
  color: $fontblue;
  background-color: $housemintdarker;
  @include break($brd){
    left: 400px;
    top: -260px;
    width: calc(100vw - 24px);
    height: calc(100vw - 24px);
    max-width: 450px;
    max-height: 450px;    
  }    
  .house-tag-selection{
    width: 100%;
    padding-left: 20px;
    position: absolute;
    top: 33%;
    display: flex;
    flex-wrap: wrap;
    .tag{
      white-space: nowrap;    
      max-width: 100%; overflow: hidden;
      @include break($brd){
        line-height: 34px;
      }        
    }
  }
}

.house-teaser-wrapper{
  width: 100%;
  padding-top: 100%;
  border-radius: 9999px;
  position: relative;
  background-color: $housemint;
  color: $fontblue;
}
.house-info-container{
  position: absolute;
  top: 45%;
  padding: 0 10%;
  width: 100%;
  h2{
    margin-bottom: 10px;
    font-size: 20px;
    line-height: 23px;
    @include break($brd){
      font-size: 28px;
      line-height: 36px;
    }
  }
  ul li{
    font-family: 'courier';    
    display: flex;
    font-size: 13px;
    padding: 0 0;
    line-height: 1.1em;
    display: table-row;
    @include break($brd){
      font-size: 16px;
    }
    h3{
      display: table-cell;
      color: #4F5E73;
      padding-right: 10px;
    }
    h3, span, div{
      display: table-cell;
      padding-bottom: 5px;
    }  
    div{
      display: flex;
      flex-wrap: wrap;
    }    
  }  
}
.all-houses-link{
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: "htimes";
  @include break($brd){
    bottom: 50px;
  }
}

</style>


