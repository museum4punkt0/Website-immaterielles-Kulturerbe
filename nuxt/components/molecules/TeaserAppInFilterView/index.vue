<template>
  <div class="app-teaser-wrapper">
    <NuxtLink :to="`/anwendungen/${teaserAppData.slug}`" class="img-wrapper">
      <img v-if="teaserAppData.img.data" :src="teaserAppData.img.data.attributes.url" :alt="teaserAppData.img.data.attributes.caption" loading="lazy"> 
    </NuxtLink>
    <div class="infos">
      <h2><NuxtLink :to="`/anwendungen/${teaserAppData.slug}`">{{ teaserAppData.title }}</NuxtLink></h2>
      <p class="abstract"><NuxtLink :to="`/anwendungen/${teaserAppData.slug}`">{{ teaserAppData.abstract }}</NuxtLink></p>
      <MoleculesAppTags 
        :tagData="{
          'app_filter_keywords': teaserAppData.app_filter_keywords, 
          'app_ike_categories': teaserAppData.app_ike_categories,           
        }"
      />                   
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

const teaserAppData = ref(props.data);

</script>

<style lang="scss" scoped>
.app-teaser-wrapper{
  background-color: $appbluedarker;
  border-radius: 26px;
}
.img-wrapper{
  display: block;
  position: relative;
  width: 100%;
  padding-top: 100%;
}
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 26px;
  position: absolute;
  top: 0;
}
.infos{
  padding: 22px;
}
h2{
  font-size: 20px;
  line-height: 23px;
  line-height: 1.2777777778em;
  margin-bottom: 1em;
}
.abstract{
  font-size: 13px;
  line-height: 1.2777777778em;
  margin-bottom: 1.2777777778em;
}
@include break($brd){
  h2{
    font-size: 28px;
    line-height: 36px;
    margin-bottom: 18px;
  }
  .abstract{
    font-size: 18px;
  }
}

</style>


