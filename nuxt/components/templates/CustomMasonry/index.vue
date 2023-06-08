<template>
  <div class="custom-masonry-wrapper">
    <!-- handmade masonry -->
    <div v-for="colNr in numberOfColumns" class="c-masonry-col" :key="'col-'+ colNr">          
      <template v-for="(item, index) in itemsSortedByColumns[colNr-1]">        
          <MoleculesTeaserAppInFilterView
            v-if="pageItemsType === 'applications'"
            :data="item.attributes"
            :key="'app-'+item.attributes.slug"
            :class="[ isFiltered ? filteredItemsIkeSequence[index] : '' ]"
          />
          <MoleculesTeaserHouseInFilterView
            v-else
            :data="item.attributes"
            :key="'house-'+item.attributes.slug"
            :class="[ isFiltered ? filteredItemsIkeSequence[index] : '' ]"
          />          
      </template>      
    </div>
  </div>
</template>

<script setup> 
const props = defineProps({
  items: Array,
  pageItemsType: {
    Type: String,
    Default: 'applications'
  },
  isFiltered:{
    Type: Boolean,
    Default: false
  },
  filteredItemsIkeSequence: {
    Type: Array,
    Default: []
  },
})

let resizeObserver;
onMounted(() => {
  resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(document.querySelector(".custom-masonry-wrapper"));
})

const numberOfColumns = ref(1);
function onResize(entries) {
  const entry = entries[0];
  const wrapper = entry.target;
  if(wrapper.offsetWidth <= 768 ){
    numberOfColumns.value = 1;
  }else if(wrapper.offsetWidth < 1120){
    numberOfColumns.value = 2;
  }else if(wrapper.offsetWidth < 1871){
    numberOfColumns.value = 3;
  }else{
    numberOfColumns.value = 4;
  }

}

const itemsSortedByColumns = computed(() => {
  return unravel( props.items, numberOfColumns.value)
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
.custom-masonry-wrapper{
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
.c-masonry-col{
  & > div{
    margin-bottom: 30px;
    overflow: hidden;
    @include break($brd){  
      margin-bottom: 20px;  
    }
  }
}
</style>
