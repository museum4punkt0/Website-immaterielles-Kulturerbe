<template>
  <div class="quote-teaser-wrapper" :class="{'expanded' : houseInfoVisible, 'in-depth-interview' : isInDepthInterview}">
    <div class="quote" v-html="data.attributes.type[0].text"></div>
    <div v-if="houseSlug && isExpandable" class="house-in-quote">
        <button @click="toggleHouseInfo()" class="btn btn-toggle-house"><template v-if="data.attributes.type[0].quote_author">{{data.attributes.type[0].quote_author}} | </template> {{ houseTitle }}</button>
        <div class="house-info" v-show="houseInfoVisible">
          <MoleculesTeaserHouseSmall :slug="houseSlug" :author="data.attributes.type[0].quote_author"/>
        </div>
    </div>
    <div v-if="houseSlug && !isExpandable" >
      <AtomsTeaserHouseMicro :slug="houseSlug" :author="data.attributes.type[0].quote_author"/> 
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {}    
  },
  isExpandable:{
    type: Boolean,
    default: true
  }
})
const houseInfoVisible = ref(false);
let houseSlug = false;
let houseTitle = false;
let isInDepthInterview = false;
if (props.data.attributes.type[0].house.data){
  houseSlug = props.data.attributes.type[0].house.data.attributes.slug;
  houseTitle = props.data.attributes.type[0].house.data.attributes.title;
  isInDepthInterview = props.data.attributes.type[0].in_depth_interview;
}

function toggleHouseInfo(){
  houseInfoVisible.value = !houseInfoVisible.value
}

</script>

<style lang="scss" scoped>
.quote-teaser-wrapper{
  border-radius: 123px;
  background-color: $appbluedarker;
  font-size: 1.5em;
  line-height: 1.2em;
  padding: 65px 40px;
}
.quote{
  font-family: 'htimes';  
  font-size: 22px;
  line-height: 30px;
  margin-bottom: 15px;
  @include break($brd){
    font-size: 30px;
    line-height: 40px;    
  }
}
.btn-toggle-house{
  width: 100%;
  position: relative;
  color: $white;
  font-size: 12px;
  line-height: 17px;
  &:after{
    position: absolute;
    right: 0;
    font-size: 1.5em;
    content: '+';    
  }
  .expanded &{
    &:after{
      content: '-';    
    }
  }
}
.house-in-quote{
  position: relative;
  &.expanded{
    padding-bottom: 0px;
  }
}
.house-info{
  margin-top: -100px;
  bottom: -130px;
  position: relative;
}
</style>


