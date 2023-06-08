<template>
  <div class="app-teaser-wrapper" :class="{'is-flipped' : isFlipped, 'show' : alwaysVisible}">
    <div class="app-teaser-inner" @click="showAndFlip()">
      <div class="front-wrapper">
        <div class="img-wrapper">
          <img v-if="teaserAppData.img.data" :src="teaserAppData.img.data.attributes.url" :alt="teaserAppData.img.data.attributes.caption" loading="lazy"> 
        </div>
      </div>
      <div class="back-wrapper">
        <h2>{{ teaserAppData.title }}</h2>
        <div class="push-content">
          <p class="abstract">{{ teaserAppData.abstract }}</p>
          <NuxtLink :to="`/anwendungen/${teaserAppData.slug}`">Zur Anwendung</NuxtLink>
        </div>
        <div class="tag-wrapper">
          <MoleculesAppTags 
            :tagData="{
              'app_filter_keywords': teaserAppData.app_filter_keywords, 
              'app_ike_categories': teaserAppData.app_ike_categories,           
            }"
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
let appSlug = '';
appSlug = props.slug;

const teaserAppData = ref();
const { data, error, refresh } = await useFetch(() => `/api/applications?filters[slug][$eq]=${appSlug}&populate[0]=app_ike_categories,app_filter_keywords,img`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: appSlug
});
if(!error._value){
  teaserAppData.value = data.value.data[0].attributes;
}else{
  console.log('no valid data or no valid route')
  await navigateTo('/404')
}

const isFlipped = ref(false);
const alwaysVisible = ref(false);
function showAndFlip(){
  isFlipped.value=!isFlipped.value;
  alwaysVisible.value = true;
}

</script>

<style lang="scss" scoped>

.app-flipteaser-wrapper{
  color: $fontblue;
  width: 66.7%;
  background-color: transparent;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
  
  &.show{
    .app-teaser-inner{
      opacity: 1;
      transform: rotateY(0deg);
    }      
  }  

  &.is-flipped{
    z-index: 1;
      /* Do an horizontal flip when you move the mouse over the flip box container */
      
    .app-teaser-inner{
      opacity: 1 !important;
      transform: rotateY(180deg);
    }      
      
  }

  @media(hover: hover) and (pointer: fine) {
    &:hover{
      z-index: 1;
      /* Do an horizontal flip when you move the mouse over the flip box container */
      &.show{
        .app-teaser-inner{
          transform: rotateY(180deg);
        }      
      }  
    }  
  }
}

/* This container is needed to position the front and back side */
.app-teaser-inner {
  opacity: 0;
  transform: rotateY(-180deg);
  position: relative;
  width: 100%;
  padding-top: 100%;
  text-align: center;
  transition: all 0.6s ease;
  transform-style: preserve-3d;
  .ike-tag{
    color: $white;
    background-color: $fontblue;
  }  

  /* Position the front and back side */
  .front-wrapper, .back-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 38px;
    overflow: hidden;    
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    text-align: left;
  }

  .back-wrapper {
    display: flex;
    min-height: 100%;
    flex-direction: column;
    overflow: auto;    
    color: #172343;
    background-color: $clusterfontblue;
    padding: 20px;
    transform: rotateY(180deg);    
    @include hideScrollBar();
    &::-webkit-scrollbar {
      display: none;
    }      
    :deep(.tag){
      color: $white !important;
      background-color: $fontblue;
    }
  }  
  .push-content{
    flex: 1;
  }

  /* Style the front side (fallback if image is missing) */
  .img-wrapper {
    img{
      object-fit: cover;
    }
  }
}

.img-wrapper{
  width: 100%;
  padding: 20px;  
  padding-top: 100%;  
  display: flex;
  position: relative;
}
img{
  position: absolute;
  top: 0; left:0;  
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.ike-tag{
  background-color: $apptagblue;
}
h2{
  font-size: 18px;
  line-height: 23px;
  margin-bottom: .75em;
}
.abstract{
  font-size: 13px;
  line-height: 18px;
}
.tag-wrapper{
  margin-top: 20px;
  display: flex;
}
a{
  font-family: 'htimes';
}
@include break($brd){
  .back-wrapper{
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

// position lake snake
.app-flipteaser-wrapper{
  position: relative;
  &:nth-child(6n-5){
    left: $padMob;
  }
  &:nth-child(6n-4){
    margin-top: -30%;
    left: calc(33% - 12px);
  }  
  &:nth-child(6n-3){
    margin-top: -40%;
    left: 15%;
  }    
  &:nth-child(6n-2){
    margin-top: -40%;
    left: 5%;
  }  
  &:nth-child(6n-1){
    margin-top: -20%;
    left: calc(26% - 12px);
  }      
  &:nth-child(6n-6){
    margin-top: -10%;    
    left: calc(10% - 12px);
    margin-bottom: -20%;
  }         
}
@include break($brd){
  .app-flipteaser-wrapper{
    position: absolute;
    width: 28%;
    top: 50vh;    
    margin-top: 0 !important;
    &:nth-child(6n-5){
      transform: translateY(-30%);
      left: $padDes;
    }
    &:nth-child(6n-4){
      transform: translateY(-40%);
      left: 10%
    }  
    &:nth-child(6n-3){
      transform: translateY(-70%);
      left: 33%;
    }    
    &:nth-child(6n-2){
      transform: translateY(-10%);
      left: 50%;
    }  
    &:nth-child(6n-1){
      transform: translateY(-45%);
      left: 70%;
    }      
    &:nth-child(6n-6){
      margin-top: 0;
      left: 100%;
    }         
  }
}

</style>


