<template>
  <span class="tag">
    <!-- if is ike category, go to listpage jumpmark -->
    <NuxtLink v-if="filterId === 'app_ike_categories' || filterId === 'house_ike_categories'"       
      :to="{ path: pagePath, hash: '#'+data.attributes.slug}"
      :title="data.attributes.title"
    >
      <template v-if="data.attributes.title_long && useLongIkeTitle">
        {{data.attributes.title_long}}
      </template>
      <template v-else>
        {{data.attributes.title}}
      </template>
    </NuxtLink>

    <!-- if is filter, go to listpage with filter query -->
    <NuxtLink v-else :to="pagePath +'?'+ filterId +'='+  data.attributes.slug"  :title="data.attributes.title"  >
      <span v-if="filterId === 'house_filter_agency'">Trägerschaft:</span>
      {{data.attributes.title}}
      <span v-if="filterId === 'house_filter_collectionsize'">Objekte</span>
      <span v-if="filterId === 'house_filter_visitorcount'">Besucher*innen</span>
      <span v-if="filterId === 'house_filter_communitysize'">Einwohner*innen</span>      
    </NuxtLink>
  </span>
</template>

<script setup>
const props = defineProps({
  filterType: String,
  filterId: String,
  data: Object,
  useLongIkeTitle: {
    type: Boolean,
    default: false
  }
})

const pagePath = computed(() => {
  return props.filterType === 'app' ? '/anwendungen' : '/haeuser'
})

</script>

<style lang="scss" scoped>
</style>


