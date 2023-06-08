<template>
  <footer class="main-footer">
    <nav class="main-navigation">    
        <NuxtLink to="/impressum">Impressum</NuxtLink>
        <NuxtLink to="/datenschutz">Datenschutz</NuxtLink>      
    </nav>
  </footer>
</template>

<script setup>

</script>


<style scoped lang="scss">
.main-footer{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: $whitish;
  color: $fontblue;
  position: relative;
  z-index: 1;
  a{
    padding: 0 8px;
  }
}
@include break($brd){
  .main-footer{
    height: 50px;
    position: relative;
    z-index: 2;
  }
}
</style>
