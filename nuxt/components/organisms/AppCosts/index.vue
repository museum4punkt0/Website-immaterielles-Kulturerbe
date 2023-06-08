<template>
  <section class="costs-wrapper mc">
    <h2 class="small">Kosten</h2>
    <MoleculesAppDevCost :devCost="devCost"/>    
    <MoleculesAppFollowUpCost :followUpCost="followUpCost"/>      
    <div class="footnote small"><span>Finanziert durch:</span><div v-html="props.funder"></div></div>
  </section>
</template>

<script setup>
const props = defineProps({
  devCost: Object,
  followUpCost: Object,
  funder: String
})
</script>

<style lang="scss" scoped>
.costs-wrapper{
  background-color: $appbluedarker;
  padding-top: 70px;
  padding-bottom: 60px;
  @include break($brd){
    padding-bottom: 120px;
  }  
}
:deep(.selected){
  &:before{
    content: '●';
    padding-right: 1em;
  }  
}
h2{
  margin-bottom: 20px;
  grid-column: span 6;  
  @include break($brd){
    grid-column: 3 / span 8;
  }
}
.footnote{
  text-align: right;
  grid-column: span 6;  
  font-size: .8em;
  line-height: 1.2em;
  @include break($brd){
    grid-column: 8 / span 4;
  }  
}
:deep(h3){
    margin-bottom: 40px;
}
@include break($brd){
  :deep(ul){
    margin-left: -18px;
  }
  :deep(h3){
    margin-bottom: 60px;
  }
}  
</style>


