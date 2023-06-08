<template>
  <div class="news-teaser-wrapper">
    <img src="@/assets/icons/news.svg" alt="news icon">
    <div v-html="props.data.attributes.type[0].text"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {}    
  }
})
</script>

<style lang="scss" scoped>
.news-teaser-wrapper{
  position: relative;
  font-size: 30px;
  line-height: 38px;
  padding-left: 30px;
  img{
    position: absolute;
    top: 7px;
    left: 0;
    width: 22px;
  }
  @include break($brd){
    font-size: 45px;
    line-height: 55px;
    padding-left: 45px;
    img{
      width: 34px;
    }
  }
}
</style>


