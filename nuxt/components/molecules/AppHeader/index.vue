<template>
  <header>
    <h1>{{ props.title }}</h1>  
    <div class="img-wrapper">
      <img :src="props.img.data.attributes.url" :alt="props.img.data.attributes.caption">
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  title: String,
  img: Object
})

</script>

<style lang="scss" scoped>
header{
  flex-wrap: wrap;
  overflow: hidden;
  margin-bottom: 72px;
}
h1{
  height: 420px;    
  @include hBig;
  
  display: flex;
  align-items: center;
  padding-left: $padMob;
}  
h1, .img-wrapper{
  grid-column: span 6;
}
img{
  width: 100%;
  border-radius: 63px;
}
@include break($brd){
  header{
    @include mc();
    height: 100vh;
    margin-bottom: 200px;
  }
  h1{
    grid-column: span 6;
    display: flex;
    align-items: center;
    padding-left: 0;
    height: 100%;
  }   
  .img-wrapper{
    position: relative;
    left: $padDes;
    height: 100vh;
  }
  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 100px;
  }  
}
</style>


