<template>
  <div class="house-mini-info-wrapper">
    <NuxtLink class="house-img-wrapper" :to="`/haeuser/${teaserHouseData.slug}`"><img v-if="teaserHouseData.img.data" :src="teaserHouseData.img.data.attributes.url" :alt="teaserHouseData.img.data.attributes.caption"></NuxtLink>
    <AtomsTeaserAppMicro v-if="teaserAppSlug" :slug="teaserAppSlug"/>
  </div>
</template>

<script setup>
const props = defineProps({
  slug: {
    type: String,
    default: ''    
  }
})

const teaserHouseData = ref();
const teaserAppSlug = ref(false);

const { data, error, refresh } = await useFetch(() => `/api/houses/?filters[slug][$eq]=${props.slug}&populate[0]=applications,img`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: 'small-house-teaser-'+props.slug
});
if(!error._value){
  teaserHouseData.value = data.value.data[0].attributes;
  if(teaserHouseData.value.applications 
    && teaserHouseData.value.applications.data 
    && teaserHouseData.value.applications.data.length > 0 ){
    teaserAppSlug.value = teaserHouseData.value.applications.data[0].attributes.slug
  }
}else{
  console.log('no valid data or no valid route')
  await navigateTo('/404')
}

</script>

<style lang="scss" scoped>
.house-mini-info-wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 0 50px;
}
.house-img-wrapper{
  width: 100%;
  padding-top: 100%;
  position: relative;
  img{    
    position: absolute;
    top: 0; left: 0;
    vertical-align: bottom;
    border-radius: 9999px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: none;
    padding: 0;
  }  
}
</style>


