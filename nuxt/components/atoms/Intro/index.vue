<template>
  <div id="intro" class="intro">
    <div class="txt" v-html="title"></div>
    <div class="bg"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String
})
</script>

<style lang="scss" scoped>
#intro{
  position: fixed;
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
  font-size: 36px;
  line-height: 1.05em;
  text-align: center;
  overflow: hidden;  
  z-index: 1;
  :deep(i){
    font-family: 'htimes', 'Times', serif;
  }
}
@include break($brd){
  #intro{
    display: grid;
    font-size: 145px;
  }
}

$animBez: cubic-bezier(.62,-0.00,1,.1);
$animDur: 2.5s;
$animDelay: .1s;

.bg{
  width: 100%;
  height: 100%;
  background-color: $appblue;
  opacity: 0;
  position: absolute;
  z-index: 1;
  .intro-anim &{
    animation: bgAnim $animDur $animDelay $animBez alternate 1 forwards;
  }
}

// text scale animation
.txt {
  position: relative;
  z-index: 2;
  width: 100%;
  text-align: center;
  .intro-anim &{
    animation: scaleTextMobile $animDur $animDelay $animBez alternate 1 forwards;
    @include break($brd){
      animation: scaleText $animDur $animDelay $animBez alternate 1 forwards;
    }    
  }
}

@keyframes scaleTextMobile {
  0% {word-break: break-all; text-shadow: 0px 0px, 0px 0px, 0px 0px, 0px 0px; }
  70% {text-shadow: 0px 0px, 0px 0px, 0px 0px, 0px 0px; }
  100% {
    font-size: 2000px;
    letter-spacing: -430px;
    width: 75%;
    transform: translateX(-50%); // difference to desktop
    text-shadow: 200px 200px, -200px -200px, 200px -200px, -200px 200px;    
  }
}

@keyframes scaleText {
  0% {word-break: break-all; text-shadow: 0px 0px, 0px 0px, 0px 0px, 0px 0px; }
  70% {text-shadow: 0px 0px, 0px 0px, 0px 0px, 0px 0px; }
  100% {
    font-size: 2000px;
    letter-spacing: -430px;
    width: 75%;
    transform: translateX(-25%); 
    text-shadow: 200px 200px, -200px -200px, 200px -200px, -200px 200px;    
  }
}

@keyframes bgAnim {
  0% {}
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
