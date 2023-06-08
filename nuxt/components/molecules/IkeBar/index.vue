<template>
  <div id="ike-bar" class="ike-bar" :class="{'is-map-view' : store.isMapView}"> 
    <div class="ike-bar-inner">
        <button v-for="category in ikeCategories"
          :id="`link-to-${category.slug}`" class="ike-link"  
          @click="moveToSection(category.slug)">{{category.title}}
        </button>
    </div>
    <button class="btn btn-toggle-ike-bar" alt="ike kategorien einblenden" @click="toggleIkeBar">Ike</button>
  </div>

</template>

<script setup>
import { useFilterStateStore } from '@/store/filterState'
const store = useFilterStateStore();

const props = defineProps({
  ikeCategories: {},
  filterType: String
})
const prevScrollpos = ref(0);

onMounted(() => {
  prevScrollpos.value = window.pageYOffset;  
  window.addEventListener('scroll', listenToScroll);
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', listenToScroll);
})
function listenToScroll(){
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos.value > currentScrollPos) {
    //up
    document.getElementById("ike-bar").classList.remove('hide');
  } else {
    //down
    document.getElementById("ike-bar").classList.add('hide');
  }
  prevScrollpos.value = currentScrollPos;
}

function toggleIkeBar(){
  document.getElementById("ike-bar").classList.remove('hide');
}

function moveToSection(aSection){
  store.resetAllFilters(props.filterType)
  nextTick(() => {
    return navigateTo('#'+aSection)
  }) 
}
</script>

<style lang="scss" scoped>
.ike-bar{
  position: absolute;  
  top: 0;
  width: 100vw;
  height: 21px;
  font-family: 'varela', sans-serif;
  border-radius: 999px;  
  z-index: 2;  
  overflow: hidden;
  // gradiend overlay on right border
  &:after{
    position: absolute;
    top: 0; right: 0;
    z-index: 100000;
    content: '';
    width: 70px;
    height: 21px;
    background: transparent;
    background: linear-gradient(90deg, #3D4AED00 0%, #3D4AED 95%); 
    .houses &{
      background: linear-gradient(90deg, #d9efea00 0%, #d9efea 95%); 
    }
    transition: opacity .2s linear .3s;
  }
}
.ike-bar-inner{
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;  
  align-items: flex-start;
  height: 50px; // to hide scrollbar of older browsers
  line-height: 21px;
  padding-left: 140px; 
  padding-right: 30px;
  //border-radius: 999px;  
  transition: transform .5s ease;
  position: relative;  
  .houses &{
    padding-left: 165px;
  }
}
.ike-link{
  line-height: 21px;
  flex: 0 0 auto;
  padding-right: 20px;
  transition: all .2s ease;
  position: relative;
}
.btn-toggle-ike-bar{
  position: absolute;
  top: 0; left: 95px;
  height: 21px;
  line-height: 21px;
  border-radius: 999px;
  min-width: 105px;
  text-align: center;
  text-transform: uppercase;
  transition: all .5s cubic-bezier(.52,.64,.74,1.14);
  transform: translateX(-100%);
  .houses &{
    text-align: right;
    padding-right: 15px;
    min-width: 80px;
    left: 120px;
  }  
}

.hide,
.is-map-view {
  .ike-bar-inner{
    transform: translate(-100%);
    .ike-link{
      opacity: 0;
    }
  }
  .btn-toggle-ike-bar{
    transform: translateX(0);
  }
  &:after{
    transition: visibility 0s linear 0s;
    opacity: 0;
  }
}

@include break($brd){
  .ike-bar{
    height: 34px;
    &:after{
      height: 34px;
    }
  }
  .ike-bar-inner,
  .ike-link{
    line-height: 34px;   
  } 
  .ike-bar-inner{
    .houses &{
      padding-left: 200px;
    }
  }
  .btn-toggle-ike-bar{
    height: 34px;
    line-height: 34px;
    .houses &{
      padding-right: 15px;
      min-width: 100px;
      left: 130px;
    }      
  }  
}

</style>

