<template>
  <div class="app-description-wrapper">
    <p class="short-desc small" v-if="props.shortDesc">{{ props.shortDesc }}</p>
    <div class="desc copy" v-html="props.description"></div>
  </div>
</template>

<script setup>
  const props = defineProps({
    description: String,
    shortDesc: String
  })
</script>

<style lang="scss" scoped>
.app-description-wrapper{
  grid-column: span 6;
  @include break($brd){
    grid-column: 3 / span 6;
    padding-right: $padDes;
  }
}
.short-desc{
}
.desc{
  :deep(p){
    margin-bottom: 1.2em;
  }
}
.app-description-wrapper, p{margin-bottom: 1em;}
</style>


