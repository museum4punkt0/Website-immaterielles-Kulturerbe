<template>
  <section class="img-section-wrapper mc">
    <div class="img-wrapper" v-for="img in props.images" >
      <img :src="img.attributes.url" :alt="img.attributes.caption" loading="lazy">
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  images: Array
})

</script>

<style lang="scss" scoped>
.img-section-wrapper{
  display: grid;
  grid-template-columns: 1fr; 
  gap: 40px;
  justify-content: space-around;
  margin-bottom: 60px;
  @include break($brd){
    margin-bottom: 200px;
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .img-wrapper{
    width: 100%;
    flex: .30 0 30%;
  }
  img{
    border-radius: 38px;    
  }
}
</style>


