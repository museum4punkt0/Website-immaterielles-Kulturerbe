<template>
  <section class="cluster-section-wrapper" :class="layout + '-layout'" ref="gsapcontainer">
      <div class="cluster-section-description mc">
        <div class="description-text copy">{{ data.description }}</div>
      </div>
      <div class="cluster-section-wrapper-inner">      
        <div class="cluster-teaser-wrapper" ref="gsapcontainer">
          <div v-for="cluster in data.clusters.data" class="cluster-teaser">
            <NuxtLink :href="`/anwendungen/cluster/${cluster.attributes.slug}`">
              <h3 v-html="cluster.attributes.long_title"></h3>
            </NuxtLink>
          </div>
        </div>
      </div>
  </section>
</template>

<script setup>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const props = defineProps({
  layout: {
    type: String,
    default: 'tile'
  },
  data: {}
})

const gsapcontainer = ref();
let ctx;

onMounted(() => {
  setTimeout(() => {    

    if(props.layout === 'tile'){
      // scrollAnim Tiles
      ctx = gsap.context((self) => {
        gsap.set('.tile-layout .cluster-teaser-wrapper', {xPercent: 50});
        const tileContainer = self.selector('.tile-layout .cluster-teaser-wrapper');
        tileContainer.forEach((container) => {
          gsap.to(container, {
            xPercent: 0,
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom 40%',
              scrub: true,
            },
          });
        });
      }, gsapcontainer.value); // <- Scope!    
    }else{
      
      // scrollAnim TextLines
      ctx = gsap.context((self) => {
        let mm = gsap.matchMedia();

        mm.add("(max-width: 767px)", () => {
          // mobile setup code here...
          const textLines = self.selector('.text-layout .cluster-teaser');
          textLines.forEach((textLine) => {
            gsap.set(textLines, {xPercent: 50});
            gsap.to(textLine, {
              xPercent: -100,
              scrollTrigger: {
                trigger: textLine,
                start: 'top bottom',
                end: 'bottom top-=500',
                scrub: true,
              },
            });
          });        
        });

        mm.add("(min-width: 768px)", () => {
          // desktop setup code here...
          const textLines = self.selector('.text-layout .cluster-teaser');
          textLines.forEach((textLine) => {
            gsap.set(textLines, {xPercent: 150});
            gsap.to(textLine, {
              xPercent: -100,
              scrollTrigger: {
                trigger: textLine,
                start: 'top bottom',
                end: 'bottom top-=500',
                scrub: true,
              },
            });
          });        
        });          

      }, gsapcontainer.value); // <- Scope!

    }


  }, 1000);

});

onUnmounted(() => {
  ctx.revert(); // <- Easy Cleanup!
});

</script>
<style lang="scss" scoped>
.cluster-section-wrapper-inner{
  padding-bottom: 120px;
  @include break($brd){
    padding-bottom: 160px;
  }  
}
.description-text{
  margin: 70px 0 100px;
  grid-column: span 6;
  @include break($brd){
    margin: 210px 0 210px;
    grid-column: 7 / span 5; 
  }
}
.cluster-teaser-wrapper{
  display: flex;
  gap: 12px;    
  width: 100%;
  @include break($brd){
    gap: 20px;  
  }
}
.tile-layout{
  background-color: $appbluedarker;
  .cluster-section-wrapper-inner{
    padding-left: calc((100vw - 7 * 12px) * 1/6 + 6px);
    overflow: auto;
    @include hideScrollBar();
    &::-webkit-scrollbar {
      display: none;
    }      
    @include break($brd){
      padding-left: calc((100vw - 13 * 20px) * 1/12 + 50px);
    }
  }
  .cluster-teaser{
    flex: 0 0 250px;
    height: 360px;
    border-radius: 38px;
    padding: 40px 30px 0 20px;
    color: $fontblue;
    font-size: 40px;
    line-height: 50px;
    :deep(i){
      font-family: 'htimes';
    }  
    &:nth-child(9n - 8){
      background-color: #FBFFDC;
    }
    &:nth-child(9n - 7){
      background-color: #FF7C65;
    } 
    &:nth-child(9n - 6){
      background-color: #081471;
      color: $white;
    }  
    &:nth-child(9n - 5){
      background-color: #ECDCFF;
    }
    &:nth-child(9n - 4){
      background-color: #B7B16B;
    }
    &:nth-child(9n - 3){
      background-color: #4F0A49;
      color: $white;
    }
    &:nth-child(9n - 2){
      background-color: #C2C8D8;
    }
    &:nth-child(9n - 1){
      background-color: #D0F4BD;
    }  
    &:nth-child(9n - 0){
      background-color: #447E7B;
    }                    

    @include break($brd){
      flex: 0 0 400px;
      padding: 50px 70px 0 40px; 
      font-size: 55px;
      line-height: 65px;           
    }     
  }  
}
.text-layout{
  .cluster-teaser-wrapper{
    overflow: hidden;    
    flex-direction: column;
    align-items: flex-start;
  }  
  .cluster-teaser{
    font-size: 55px;
    line-height: 65px;  
    padding: .4em 0;  
    white-space: nowrap;
    @include break($brd){
      font-size: 90px;
      line-height: 115x;   
    }
  }
}
:deep(i){
  font-family: 'htimes';
}
</style>


