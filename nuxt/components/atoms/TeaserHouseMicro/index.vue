<template>
  <div class="house-mini-info-wrapper small-2">
    <span v-if="author">{{author}} | </span>
    <NuxtLink :to="`/haeuser/${teaserHouseData.slug}`">{{teaserHouseData.title}} | </NuxtLink>
    <NuxtLink  v-if="teaserAppSlug" :to="`/anwendungen/${teaserAppSlug}`">{{teaserAppTitle}}</NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  slug: {
    type: String,
    default: ''    
  },
  author:{
    type: String,
    default: ''
  }
})

const teaserHouseData = ref();
const teaserAppSlug = ref(false);
const teaserAppTitle = ref(false);


const { data, error, refresh } = await useFetch(() => `/api/houses/?filters[slug][$eq]=${props.slug}&populate[0]=applications`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: 'teaser-house-micro-'+props.slug
});
if(!error._value){
  teaserHouseData.value = data.value.data[0].attributes;
  if(teaserHouseData.value.applications 
    && teaserHouseData.value.applications.data 
    && teaserHouseData.value.applications.data.length > 0 ){
    teaserAppSlug.value = teaserHouseData.value.applications.data[0].attributes.slug
    teaserAppTitle.value = teaserHouseData.value.applications.data[0].attributes.title
  }
}else{
  console.log('no valid data or no valid route')
  await navigateTo('/404')
}

</script>

<style lang="scss" scoped>
</style>


