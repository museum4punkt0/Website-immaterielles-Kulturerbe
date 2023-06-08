<template>
  <div class="app-sideinfo-wrapper">
    <h4 class="small">{{ props.data.link_title }}</h4>
    <div class="link-area small" v-html="props.data.link_textarea"></div>
    <h4 class="small">{{ props.data.file_title }}</h4>
    <div class="file-list small" v-for="file in props.data.files.data">
      <a :href="file.attributes.url" target="_blank" download>{{file.attributes.ext.split('.').join("")}}</a>
    </div>
    <h4 class="small">{{ props.data.title }}</h4>
    <div v-for="item in props.data.list_item" class="participants small-2">
      <h5>{{item.name}}:&nbsp;</h5><span>{{item.content}}</span>
    </div>
    <!-- <div v-html="props.data.link_textarea "></div> -->
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object
})

onMounted(() => {
  addTargetBlank(".link-area a");
})
</script>

<style lang="scss" scoped>
.app-sideinfo-wrapper{
  grid-column: span 6;
  @include break($brd){
    grid-column: 9 / span 3;
  }
}
h4{
  margin-bottom: 1em;
}
.link-area,
.file-list{
  margin-bottom: 2em;  
  :deep(a){
    font-family: 'htimes';
    &:before{
      content: '';
      background-image: url(@/assets/icons/arr-external-link.svg);      
      padding-right: 30px;
      background-repeat: no-repeat;
    }
  }
}
.file-list{
  :deep(a){
    &:before{
      content: '';
      background-image: url(@/assets/icons/arr-download.svg);      
    }
  }
}
.participants{
  margin-bottom: 1em;
  font-family: 'courier';
  h5{
    display: inline;
    color: $appfontbluedarker
  }
  margin-bottom: 1em;
}

</style>


