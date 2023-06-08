<template>
  <header class="mc">
    <div class="info-text">
      <div class="info-text-inner">
        <h1 class="big-3">{{ props.title }}</h1>  
        <!--  v-html="props.adress" -->
        <div class="adress normal" v-html="props.adress" ></div> 
      </div>
    </div>
    <div class="img-wrapper">
      <img :src="props.img.data.attributes.url" :alt="props.img.data.attributes.caption">
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  title: String,
  img: Object,
  adress: String,
})

onMounted(() => {
  addTargetBlank(".info-text-inner .adress a");
})



</script>

<style lang="scss" scoped>
header{
  position: relative;
  @include break($brd){
    min-height: 100vh;
  }
  &:before{
    position: absolute;
    content: '';
    background-color: $housemintlight;
    top: -700px;
    left: -800px;
    width: 1400px;
    height: 1400px;
    border-radius: 9999px;
  }  
}
.info-text{
  padding-top: 180px;
  grid-column: span 6;
  :deep(a){
    margin-top: .75em;
    display: inline-block;
    font-family: 'htimes';
  }
  @include break($brd){
    padding-top: 180px;
    grid-column: 2 / span 6;
  }
}
.adress{
  margin-top: 20px;
}
.info-text-inner{
  position: relative;
  z-index: 1;
}
.img-wrapper{
  position: relative;
  width: 300px;
  padding-top: 300px;
  max-width: 400px;
  left: calc(20vw - 12px);
  img{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 9999px;
  }  
}
@include break($brd){
  header{
    &:before{
      position: absolute;
      content: '';
      width: 110vw;
      height: 110vw;
      left: -30%;
      top: auto;
      bottom: 0;
    }     
  }
  .img-wrapper{
    width: 100%;
    padding-top: 100%;
    height: 0;
    left: $padDes;
    max-width: none;
    grid-column: 8 / span 5;
  }
  .info-text{
    margin-top: 18%;
  }
}
</style>


