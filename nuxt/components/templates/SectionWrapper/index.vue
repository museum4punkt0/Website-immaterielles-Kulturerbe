<template>
  <!-- v-show="!subNavVisible" -->
    <div id="active-marker" @click="toggleSubNav()" :class="{'hide' : subNavVisible}"></div>
    <nav id="page-nav" class="page-nav" :class="{'hide' : !subNavVisible}">
      <ul>
        <li v-for="(section, index) in sectionData">
          <NuxtLink :href="'#section-'+ index" 
            :class="{'expanded' : activeNavId.includes('section-'+ index), 'active': activeNavId === 'section-'+index }" >
            {{ section.attributes.headline}}
          </NuxtLink>
          <ul v-if="section.attributes.sub_sections">
            <li v-for="(subSection, subindex) in section.attributes.sub_sections">
              <NuxtLink :href="'#section-'+ index + '-' + subindex"
              :class="{'active': activeNavId === 'section-'+ index + '-' + subindex }" >
              {{ subSection.section_title }}</NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div id="page-scroll-content" class="content-inner copy-subnav-page">
      <section v-html="introText" class="intro-text normal" v-if="introText"></section>
      <template v-for="(section, index) in sectionData">
        <section class="page-section"  :id="'section-'+index">
          <OrganismsPageSection :data="section.attributes.tt_sections"/>
        </section>        
        <section class="page-section" v-for="(subSection, subindex) in section.attributes.sub_sections" :id="'section-'+index + '-' + subindex">
          <OrganismsPageSection :data="subSection.tt_sections"/>
        </section>
      </template>
    </div>
</template>


<script setup>
const props = defineProps({
  introText: String,
  sections: Array,
  sectionId: String
})


// build string to get Data for all Sections by ID
let filterString = '';
for(let i = 0; i < props.sections.length; i++){
  filterString = `${filterString}filters[id][$in][${i}]=${props.sections[i].id}`
  if(i !== props.sections.length - 1){
    filterString = filterString + '&'
  }
}

// getData for sections
const sectionData = ref();
const { data, error, refresh } = await useFetch(() => `/api/${props.sectionId}?${filterString}&populate=tt_sections.teaser.type.house,sub_sections.tt_sections.teaser.type.house`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
  key: props.pageName+'-section-data'
});
if(!error._value){
  sectionData.value = data.value.data
}else{
  console.log(error)
  //await navigateTo('/404')
}


// section observer to change nav state
const observer = ref(null);
const prevScrollpos = ref(0);

onMounted(() => {
  nextTick(() => {
    getHeightOfPageNav();
    observePageSections();
    prevScrollpos.value = window.pageYOffset;  
    window.addEventListener('scroll', listenToScroll);
  })  
  
  
  addTargetBlank(".page-section .text-section a");
  
})
onBeforeUnmount(() => { 
  observer.value.disconnect();
  window.removeEventListener('scroll', listenToScroll);
})

const activeNavId = ref(''); 
function observePageSections(){
  const activeMarker = document.getElementById('active-marker');    
  let bottomMargin = - window.innerHeight + 200;
  //console.log(bottomMargin)
  let observerOptions = {rootMargin: `-200px 0px ${bottomMargin}px` }
  if(window.innerWidth > 1180){    
    observerOptions = {rootMargin: '-50% 0px -50%'};
  }
  observer.value = new IntersectionObserver(entries => {
    entries.forEach(entry => {    
      const { id } = entry.target;         
      const spy = document.querySelector(`.page-nav a[href*="#${id}"]`);
      if (!entry.isIntersecting) return;
      //console.log(activeMarker.innerHTML = spy.innerHTML, id) 
      activeNavId.value = id;
      activeMarker.innerHTML = spy.innerHTML;
    });
  }, observerOptions);
  // Track all sections that have an `id` applied
  document.querySelectorAll('.page-section').forEach((section) => {
    observer.value.observe(section);
  });
}

// Mobile Subnav mechanicx
const subNavVisible = ref(true)
function toggleSubNav(){
  subNavVisible.value = !subNavVisible.value
}

function listenToScroll(){
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos.value > currentScrollPos) {
    //up
    //subNavVisible.value = true; 
    if(currentScrollPos <= 5){
      subNavVisible.value = true;
    }else{ 
      subNavVisible.value = false;
    }
  } else {
    //down
    subNavVisible.value = false;
  }
  prevScrollpos.value = currentScrollPos;
}

function getHeightOfPageNav(){
  if(window.innerWidth <= 1180){
    setTimeout(() => {
      let navHeight = document.getElementById('page-nav').offsetHeight;
      document.getElementById('section-0').style.paddingTop = (navHeight - 130) + 'px';  
    }, 300);
  }
}

</script>
<style lang="scss" scoped>
.intro-text{
  margin-bottom: 150px;
}

#active-marker{
  position: fixed;
  top: 0px;
  z-index: 100;
  width: 100%;
  left: 0;
  font-family: 'htimes';
  font-size: 28px;
  line-height: 33px;
  padding: 73px 12px 17px 36px;
  cursor: pointer;
  &:before{
    position: absolute;
    content: '●';
    left: 12px;
    top: 74px;
    font-size: 20px;
    line-height: 1em;
  } 
  transition: all .2s ease;
  &.hide{
    transform: translateY(-10px);
    opacity: 0;
  }   
  @include break($brd){
    display: none;
  }
}

.page-nav{
  font-size: 28px;
  line-height: 32px;
  grid-column: span 6;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  max-height: calc(100%);
  overflow: auto;
  padding-top: 130px;
  padding-right: 12px;
  padding-left: 36px;
  transition: opacity .35s ease, transform .35s ease, visibility 0s linear 0s;
  &.hide{
    transition: transform .35s ease, opacity .1s .2s ease, visibility 0s linear .35s;
    transform: translateY(-50px);
    opacity: 0;
    visibility: hidden;
  }



  li{
    border-top: 1px solid $fontblue;
    padding: .5em 0;
    &:first-child{
      border: none;
    }
    li{
      margin-left: 1em;
      font-size: 18px;
      line-height: 26px;
      .active:before{
        top: 0px;      
      }
    }    
    ul{
      display: none;
      position: relative;
    }
  }
  .active,
  .expanded{  
  font-family: 'htimes', 'Times', serif;
  + ul{
      display: block;
    }
  }
  .active{  
    position: relative;
    &:before{
      position: absolute;
      content: '●';
      left: -24px;
      top: 4px;
      font-size: 20px;
      line-height: 1em;
    }
  }  
}
.content-inner{
  grid-column: span 6;
}
@include break($brd){
  .page-nav{
    position: fixed;
    top: 210px;
    height: calc(100vh - 210px - 180px);
    overflow: auto;    
    left: 0;
    padding: 0; //reset
    //width:         4 cols (3 gutters)
    //margin-left:   1 col (3 gutters)   
    width: calc( ( 100% - 13 * 30px ) * 4 / 12 + 4 * 30px);
    padding-left: 30px; //(removes 1 gutter from width, to see circle marker, that's why 4*30 in width
    margin-left: calc( ( 100% - 13 * 30px ) * 1 / 12 + 1 * 30px);
    // overriding mobile transition
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
    visibility: visible !important;
    ul{
      width: 100%;      
      left: 0;
    }
  }
  .content-inner{
    grid-column: 7 / span 5;
    padding-bottom: 300px;
    &:before,
    &::after{
      content: '';
      position: fixed;
      left: 0; top: 0;
      width: 100%;
      height: 210px;
      z-index: 1;
    }
    &::after{
      content: '';
      top: auto;
      bottom: 0;
      height: 135px;
    }    
  }
  :deep(.quote-teaser-wrapper){
    margin-bottom: 70px;
    &.expanded{
      margin-bottom: 120px;
    }      
  }  
}
@include break($brmed){
  .page-nav{
    top: 250px;
    height: calc(100vh - 250px - 180px);
  }  
  .content-inner{
    &:before{
      height: 250px;
    }
    &::after{
      height: 180px;
    }    
  }
}
</style>