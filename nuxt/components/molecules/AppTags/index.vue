<template>
  <div class="tag-cloud-wrapper" :class="{'big-tag-cloud' : isBigTagCloud }">
    <div class="tag-cloud-inner">      
      <template v-for="(value, tagGroupName, index) in tagData" :key="index">      
        <template v-if="value.data">
          <AtomsTag v-for="tagData in value.data" 
            :filterType="'app'"     
            :filterId="tagGroupName"       
            :data="tagData"   
            :class="`tag-group-${index}`" 
            :key="tagData.attributes.slug"
            :useLongIkeTitle="isBigTagCloud"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tagData: Object,
  isBigTagCloud: {
    type: Boolean,
    default: false
  },   
})

</script>

<style lang="scss" scoped>
.tag-cloud-inner{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.tag{
  background-color: #3642CB;
  white-space: nowrap;
  margin-bottom: 10px;
}
.big-tag-cloud{
  @include mc();
  &.tag-cloud-wrapper{
    margin-bottom: 90px;
    @include break($brd){
      margin-bottom: 200px;
    }
  }
  .tag-cloud-inner{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    grid-column: span 6;
    @include break($brd){
      grid-column: 3 / span 8;
    }
  }
  .tag-group-0{background-color: #3642CB;}
  .tag-group-1{background-color: #C2C8D8}
  .tag-group-2{background-color: #A3ABC0}
  .tag-group-3{background-color: #8590AE}
  .tag-group-4{background-color: #6D7A9C}
  .tag-group-5{background-color: #56668E}
  .tag-group-6{background-color: #444F6B}
  .tag-group-7{background-color: #364059}  
}
</style>


