<template>
  <section class="house-tag-wrapper tag-cloud-wrapper mc">
    <div class="tag-cloud-inner">
      <template v-for="(value, tagGroupName, index) in tagData" :key="index">      
        <template v-if="value && Array.isArray(value.data)">
            <AtomsTag v-for="tagData in value.data" 
              :filterType="'house'"     
              :filterId="tagGroupName"       
              :data="tagData"   
              :class="`tag-group-${index}`" 
              :key="tagData.attributes.slug"
              :useLongIkeTitle="isBigTagCloud" 
            />
        </template>
        <template v-else-if="value">
          <template v-for="tag in value" >   
            <template v-if="tag">
              <AtomsTag v-for="tag in value" 
                :filterType="'house'"     
                :filterId="tagGroupName"       
                :data="tag"   
                :class="`tag-group-${index}`" 
                :key="tag.attributes.slug"
                :useLongIkeTitle="isBigTagCloud"
              />     
            </template>
          </template>
        </template>        
      </template>
    </div>    
  </section>
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
.tag-cloud-wrapper{
  position: relative;
  z-index: 1;
  margin-top: 90px;
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
.tag{
  background-color: pink;
  white-space: nowrap;
  margin-bottom: 10px;
}
.tag-group-0{background-color: #D9EFEA;}
.tag-group-1{background-color: #C7E8E0}
.tag-group-2{background-color: #9EC8BE}
.tag-group-3{background-color: #84B6AA}
.tag-group-4{background-color: #84B6AA}
.tag-group-5{background-color: #84B6AA}
.tag-group-6{background-color: #84B6AA}
.tag-group-7{background-color: #84B6AA}
</style>



