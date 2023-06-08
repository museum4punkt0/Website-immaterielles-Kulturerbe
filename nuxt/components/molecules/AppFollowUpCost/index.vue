<template>
  <div class="follow-up-cost-wrapper">
    <h3 class="big-2">Folgekosten</h3>
    <ul>
      <li v-for="costItem in followUpCosts" class="app-details-li">
        <span class="cost app-details-elem" :class="{'selected' : followUpCost.data.attributes.title === costItem.attributes.title}">{{ costItem.attributes.title }}</span>
      </li>
      <!-- ggf hier hard rein coden rest der liste, mobile dann ausblenden -->
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({  
  followUpCost: Object,
})

const followUpCosts = ref();
const { data, error, refresh } = await useFetch(() => `/api/app-filter-followupcosts`, {
  baseURL: useRuntimeConfig().textContentBaseUri,
});
if(!error._value){
  followUpCosts.value = data.value.data;
}
</script>

<style lang="scss" scoped>
.follow-up-cost-wrapper{
  grid-column: span 6;
  @include break($brd){
    grid-column: 8 / span 4;
  }
}
</style>

