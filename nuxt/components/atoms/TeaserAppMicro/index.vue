<template>
  <div class="app-teaser-micro-wrapper">
    <NuxtLink :to="`/anwendungen/${teaserAppData.slug}`">
      <img v-if="teaserAppData.img.data" :src="teaserAppData.img.data.attributes.url" :alt="teaserAppData.img.data.attributes.caption"> 
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  slug: {
    type: String,
    default: ''    
  }
})

const teaserAppData = ref();
const { data, error, refresh } = await useFetch(() => `/api/applications?filters[slug][$eq]=${props.slug}&populate[0]=img`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: 'Micro-teaser'+props.slug
});
if(!error._value){
  teaserAppData.value = data.value.data[0].attributes;
}

</script>

<style lang="scss" scoped>
.app-teaser-micro-wrapper{
  background-color: $appbluedarker;
  border-radius: 26px;
  a{
    width: 100%;
    padding-top: 100%;
    display: block;
    position: relative;
  }
  img{
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 26px;
    padding: 0;
  }  
}
</style>


