<template>
  <div class="dev-cost-wrapper">
    <h3 class="big-2">Entwicklungskosten</h3>
    <ul>
      <li v-for="costItem in devCosts" class="app-details-li">
        <span class="cost app-details-elem" :class="{'selected' : devCost.data.attributes.title === costItem.attributes.title}">{{ costItem.attributes.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  devCost: Object,
})

const devCosts = ref();
const { data, error, refresh } = await useFetch(() => `/api/app-filter-devcosts?sort=sort_id`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
});
if(!error._value){
  devCosts.value = data.value.data;
}
</script>

<style lang="scss" scoped>
.dev-cost-wrapper{
  grid-column: span 6;
  @include break($brd){
    grid-column: 3 / span 4;
  }  
}
ul{
  margin-bottom: 40px;
}
</style>

