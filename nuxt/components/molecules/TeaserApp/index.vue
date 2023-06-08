<template>
  <div class="app-teaser-wrapper" :class="{'big-version' : !smallVersion}">
    <div class="app-teaser-inner">
      <div class="img-wrapper">
        <NuxtLink :to="`/anwendungen/${teaserAppData.slug}`">
          <img v-if="teaserAppData.img.data" :src="teaserAppData.img.data.attributes.url" :alt="teaserAppData.img.data.attributes.caption" loading="lazy"> 
        </NuxtLink>    
      </div>
      <div class="info-wrapper">
        <h2><NuxtLink :to="`/anwendungen/${teaserAppData.slug}`">{{ teaserAppData.title }}</NuxtLink></h2>
        <p class="abstract"><NuxtLink :to="`/anwendungen/${teaserAppData.slug}`">{{ teaserAppData.abstract }}</NuxtLink></p>
        <div class="tag-wrapper" v-if="!smallVersion">  
          <MoleculesAppTags :tagData="tagData"/>
        </div>
        <p v-if="isHomeTeaser">
          <NuxtLink class="link" :to="'/anwendungen'">zu allen Anwendungen</NuxtLink>
        </p>
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
  },  
  smallVersion: Boolean,  
})
let isHomeTeaser = false;
let appSlug = '';
// data comes from homeTeaserColletion as Object or just slug e.g. in appSingle
if(props.slug === ''){
  appSlug = props.data.attributes.type[0].application.data.attributes.slug;
  isHomeTeaser = true;
}else{
  appSlug = props.slug;
}

const teaserAppData = ref();
const tagData = ref();
const { data, error, refresh } = await useFetch(() => `/api/applications?filters[slug][$eq]=${appSlug}&populate[0]=app_ike_categories,app_filter_keywords,img`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: appSlug
});
if(!error._value){
  //console.log(data.value.data[0])
  teaserAppData.value = data.value.data[0].attributes;
  tagData.value = {
    'app_filter_keywords' : teaserAppData.value.app_filter_keywords,
    'app_ike_categories': teaserAppData.value.app_ike_categories
  } 
}else{
  console.log('no valid data or no valid route')
  await navigateTo('/404')
}

</script>

<style lang="scss" scoped>
.app-teaser-wrapper{
  background-color: $appbluedarker;
  border-radius: 38px;
}
.info-wrapper{
  padding: 20px;
}
.img-wrapper{
  padding-top: 100%;
  position: relative;
}
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 26px;
  position: absolute;
  top: 0;
}
h2{
  font-size: 20px;
  line-height: 23px;
  margin-bottom: .75em;
}
.abstract{
  font-size: 13px;
  line-height: 18px;
  margin-bottom: 20px;
}
.tag-wrapper{
  margin-bottom: 20px;
}

.big-version{
  .img-wrapper{
    a{
      display: block;
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
    }
    img{
      aspect-ratio: 1 / 1; 
    }
  }
}

// small version, used in list view of house
.small-version{
  .app-teaser-wrapper{
    margin-bottom: 10px;
  }
  .img-wrapper{
    padding: 0;
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 26px;
    position: relative;
    top: 0;
    }
} 

@include break($brd){
  .info-wrapper{
    padding: 30px;
  }
  h2{
    font-size: 28px;
    line-height: 36px;
  }  
  .abstract{
    font-size: 18px;
    line-height: 26px;
  }  
}
</style>


