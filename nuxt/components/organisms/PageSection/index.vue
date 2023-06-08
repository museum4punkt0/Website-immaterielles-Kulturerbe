<template>  
  <div v-for="textTeaserSection in data">
    <div v-html="textTeaserSection.content" class="text-section"></div>
    <template 
      v-if="textTeaserSection.teaser && 
        textTeaserSection.teaser.data && 
        textTeaserSection.teaser.data.attributes.type[0]['__component'] === 'teaser-type.teaser-quote'"
      >
      <MoleculesTeaserQuote :data="textTeaserSection.teaser.data"/>
    </template>    
  </div>
</template>

<script setup>
const props = defineProps({
  data: Array,
})

</script>


<style scoped lang="scss">
@mixin bottomDistance(){
  margin: 0;
  padding-bottom: 20px;
  @include break($brd){
    padding-bottom: 25px;
  }
}
:deep(h2), :deep(h3), :deep(h4), :deep(h5), 
:deep(p), :deep(figure.table), :deep(img){
  @include bottomDistance();
}
:deep(i){
  u{
    @include fazit();
    text-decoration: none;
  }
}
:deep(table){
  width: 100%;  
  tr{
    &:first-child{border: none}
  }
  td + td{
    text-align: right;
  }
}

:deep(.quote-teaser-wrapper){
  color: $fontblue;
  padding-bottom: 60px;
  border-radius: 100px;
  padding: 40px;
  margin: 20px 0 40px;
  
  button{
    color: $fontblue;
  }  
  p{
    padding: 0;
    margin-bottom: 10px;
  }
  .btn-toggle-house{
    color: $fontblue;
  }
}
// responsive images based on consecutive images
:deep(img){
  display: none;
}
:deep(img + img){
  display: block;
}
@include break($brd){
  :deep(img){
  display: block;
}
:deep(img + img){
  display: none;
}  
}
</style>