<template>
  <section class="learnings-wrapper">
    <div class="mc">
      <h2 class="small">Learnings</h2>
      <div class="learings-text big-quote" v-html="props.learnings"></div>    
    </div>
  </section>  
</template>

<script setup>
const props = defineProps({
  learnings: String
})
</script>

<style lang="scss" scoped>
.learnings-wrapper{
  padding-top: 70px;
  padding-bottom: 70px;
  @include break($brd){
    padding-top: 200px;
    padding-bottom: 190px;
  }
}
h2, .learings-text{
  grid-column: span 6;
  @include break($brd){
    grid-column: 3 / span 8;
  }
}
h2{
  margin-bottom: 20px;
}
.learings-text{
  
}

</style>


