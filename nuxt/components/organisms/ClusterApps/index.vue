<template>
  <div class="cluster-apps-wrapper">
    <MoleculesTeaserAppInCluster  
      v-for="appData in clusterData"
      :slug="appData.attributes.slug" 
      class="app-flipteaser-wrapper"
      :key="appData.attributes.slug"
    />    
  </div>
</template>

<script setup>
const props = defineProps({
  slug: String
})
const clusterData = ref();
const { data, error, refresh } = await useFetch(() => `/api/applications?filters[clusters][slug][$eq]=${props.slug}&pagination[pageSize]=5`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
});
if(!error._value){
  clusterData.value = data.value.data;
}else{
  console.log('no valid data or no valid route')
  await navigateTo('/404')
}

const imagesLoaded = ref(0);
const images = ref([]);

watch(
  () => imagesLoaded.value === images.value.length,
  (result) => {
    if(result === true){
      showImages()       
    }else{
      ///console.log(`images are ready = ${result}`)
    }
  }
)

function showImages(){
  let elements = document.querySelectorAll('.app-flipteaser-wrapper');  
  for (let i = 0; i < elements.length; i++) {
    setTimeout(() => {
      elements[i].classList.add('show')
    }, i * 200);
  }
}

onMounted(() => {  
  // Get all the images on the page
  images.value = document.querySelectorAll('.cluster-apps-wrapper img');
  for (let i = 0; i < images.value.length; i++) {
    let img = new window.Image();
    img.src = images.value[i].src;
    img.onload = function() {
      imagesLoaded.value++;
    }
  }
})


</script>


<style scoped lang="scss">
.cluster-apps-wrapper{
  position: relative;
  z-index: 1;
  padding-top: $padMob;
  // background-color: ;
}
</style>
