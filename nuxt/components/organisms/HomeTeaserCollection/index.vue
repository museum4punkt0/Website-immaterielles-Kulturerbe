<template>
  <div class="home-teaser-wrapper">
    <!-- handmade masonry -->
    <div v-for="colNr in numberOfColumns" :key="`col-${colNr}`" class="c-masonry-col">      
      <div v-for="(item, index) in itemsSortedForColumns[colNr-1]" class="teaser-outer" :class="item.attributes.position" :key="`item-${index}`">
        <component :is="teaserTypeDict[item.attributes.type[0]['__component']]" :data="item" :isExpandable="false"/>
      </div>      
    </div>
  </div>
</template>

<script setup> 
const props = defineProps({
  data: Object
})
const items = props.data;

const MoleculesTeaserApp = resolveComponent('MoleculesTeaserApp');
const MoleculesTeaserHouse = resolveComponent('MoleculesTeaserHouse');
const MoleculesTeaserQuote = resolveComponent('MoleculesTeaserQuote');
const MoleculesTeaserNews = resolveComponent('MoleculesTeaserNews');
const teaserTypeDict = {
  'teaser-type.teaser-app' : MoleculesTeaserApp,  
  'teaser-type.teaser-house' : MoleculesTeaserHouse,
  'teaser-type.teaser-quote' : MoleculesTeaserQuote,
  'teaser-type.teaser-news-article' : MoleculesTeaserNews,
}

const numberOfColumns = ref(1);
let resizeObserver;
onMounted(() => {
  // needed to reset component content
  numberOfColumns.value = 0; 
  resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(document.querySelector(".home-teaser-wrapper"));
})

function onResize(entries) {
  const entry = entries[0];
  const wrapper = entry.target;
  if(wrapper.offsetWidth <= 1180 ){
    numberOfColumns.value = 1;
  }else if(wrapper.offsetWidth > 1180 && wrapper.offsetWidth < 1900){
    numberOfColumns.value = 2;
  }else{
    numberOfColumns.value = 3;
  }

}

const itemsSortedForColumns = computed(() => {
  return unravel( items, numberOfColumns.value)
})

function unravel( aItems, count ) {
    // Create each strand
    var strands = [];
    for( var i = 0;  i < count;  i++ ) {
        strands.push( [] );
    }
    // Unravel the rope into the individual strands
    for( var i = 0, n = aItems.length;  i < n;  i++ ) {
        strands[ i % count ].push( aItems[i] );
    }
    return strands;
}


</script>


<style scoped lang="scss">
.home-teaser-wrapper{
  grid-column: span 6;
  padding-bottom: 60px;
  @include break($brd){
    grid-column: span 12;
    padding-bottom: 130px;
  }

  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  & > div{
    //border: 1px solid purple;
  }
}
.teaser-outer{        
  margin-top: 40px;
}
@include break($brd){
  .teaser-outer{        
    margin-top: 120px;
    &.center{
      padding: 0 13.5%;
    }    
    &.right{
      padding-left: 27%;
    }
    &.left{
      padding-right: 27%;
    }    
  }
  :deep(.masonry-column){
    &:first-child{
      margin-top: 200px;
    }
  }
  .c-masonry-col{
    &:first-child{
      padding-top: 300px;
    }
  }  
}
@include break($brmed){
  .c-masonry-col{
    &:first-child{
      padding-top: 260px;
    }
    &:nth-child(3){
      padding-top: 330px;
    }    
  } 
}
</style>
