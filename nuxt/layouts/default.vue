<template>
  <div class="layout-wrapper" :class="store.getContentClass">
    <MainNavigation/>    
    <main class="content-wrapper" id="outer-transition-wrapper">
      <Intro :title="store.getIntroTitle" v-if="store.pageHasIntro"/>      
      <div id="transition-wrapper" :class="{'show-content-delayed' : store.pageHasIntro}">
        <slot />
      </div>
    </main>
    <AtomsLogo/>    
    <MainFooter/>
    <NuxtLoadingIndicator :color="'#1F2947'" :height="10"/>     
  </div>
</template>

<script setup>
import MainNavigation from '@/components/organisms/MainNavigation';
import MainFooter from '@/components/organisms/MainFooter';
import Intro from '@/components/atoms/Intro';
import { usePageInfoStore } from '@/store/pageInfo'
const store = usePageInfoStore();

onMounted(() => {
  triggerAnimation()
})

const route = useRoute();  
watch(
  () => route.path,
  (newRoute) => {
    triggerAnimation()
  }
)

function triggerAnimation(){
  //https://css-tricks.com/restart-css-animation/
  if(store.pageHasIntro){
    let element = document.getElementById("outer-transition-wrapper");  
    element.classList.remove("intro-anim");  
    void element.offsetWidth;  
    element.classList.add("intro-anim");
  }
}


</script>
<style lang="scss" scoped>
.content-wrapper{
  min-height: calc(100vh - 30px);
}
@include break($brd){
  .content-wrapper{
    min-height: calc(100vh - 50px);
  }
}
#transition-wrapper{  
  .intro-anim &{
    position: relative;
    z-index: 2;
    opacity: 0;    
    //transform: translateY(10px); // causes problems with internal fixed elements then    
    animation: showContent .2s 3s ease alternate 1 forwards;
  }
}

@keyframes showContent {
  0% {
    opacity: 0;
  }  
  100% {
    opacity: 1;
  }
}
</style>