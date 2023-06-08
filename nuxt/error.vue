<template>
  <div id="error">      
    <NuxtLayout>
        <!-- {{ error.statusCode }} {{ error.message }} -->
      <div class="text-illustration">
          <img alt="4" src="@/assets/img/4.svg">            
          <img alt="0" src="@/assets/img/0.svg">            
          <img alt="4" src="@/assets/img/4.svg">
          <div class="message-404 small">
            Es tut uns leid, diese Seite konnte nicht gefunden werden.<br>&nbsp;<br>
            <NuxtLink class="small" to="/">Zur Startseite</NuxtLink>
          </div>            
      </div>
    </NuxtLayout>            
  </div>  
</template>

<script setup>
defineProps(['error'])
</script>

<style lang="scss" scoped>
.message-404{
  position: absolute;
  z-index: 10;
  bottom: 00px; right: 0;
  margin: $padMob;
  max-width: 150px;
  color: $fontblue;
  @include break($brd){
    margin: $padDes;
  }
}
.text-illustration{
  width: 100vw;  
  height: 100vh;  
  color: $appblue;
  font-family: 'htimes';
  position: relative;
  overflow: hidden;
  img{
    position: absolute;
    top: 50px;
    height: 50%;
    left: 50%;
    transform: translateX(-80%);
    &:nth-child(2){      
      top: 50%;
      right: 50%;
      left: auto;
      transform: translate(90%, -50%)
    }
    &:nth-child(3){
      top: auto;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%)
    }     
  }
  @include break($brd){
    img{
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      width: auto;
      transform: translate(0,0);
      &:nth-child(2){
        top: 0;
        left: auto;
        right: 20%;
        transform: translate(0,0);
      }
      &:nth-child(3){
        left: auto;
        right: 0;
        transform: translate(0,0);
      }    
    }    
  } 
}

</style>