<template>
  <nav class="main-nav-wrapper" :class="{'expanded' : navExpanded}">    
      <button class="nav-toggle hide-on-desktop" @click="navExpanded = !navExpanded">
        <span v-if="!navExpanded">Menu</span><img v-if="navExpanded" class="btn-close" src="@/assets/icons/close.svg" alt="toggle navigation" />
      </button>      
      <ul class="main-nav show-on-desktop" :class="{'show-links' : navExpanded}">
        <li><NuxtLink to="/" @click="navExpanded = false">Home</NuxtLink></li>
        <li><NuxtLink to="/anwendungen" @click="navExpanded = false">Anwendungen</NuxtLink></li>
        <li><NuxtLink to="/haeuser" @click="navExpanded = false">Häuser</NuxtLink></li>
        <li><NuxtLink to="/good-practices" @click="navExpanded = false">Good Practices</NuxtLink></li>
        <li><NuxtLink to="/empirische-grundlagen" @click="navExpanded = false">Empirische Grundlagen</NuxtLink></li>
        <li><NuxtLink to="/about" @click="navExpanded = false">Über das Projekt</NuxtLink> </li>
        <li class="hide-on-desktop"><NuxtLink to="/impressum" class="small-link hide-on-desktop"  @click="navExpanded = false">Impressum</NuxtLink></li>
        <li class="hide-on-desktop"><NuxtLink to="/datenschutz" class="small-link hide-on-desktop" @click="navExpanded = false">Datenschutz</NuxtLink> </li>
      </ul>    
      <NuxtLink to="/kontakt" @click="navExpanded = false" class="btn-email">
        <span class="btn-email-text small">Teilen Sie Ihr Projekt mit uns!</span>
        <MailSvg class="btn-email-svg"/>
      </NuxtLink>           
  </nav>
</template>

<script setup>
import MailSvg from "@/components/atoms/MailSvg"
const navExpanded = ref(false);

</script>


<style scoped lang="scss">
.main-nav-wrapper{
  color: $white;
  position: fixed;  
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 28px;
  height: 60px;
  border-radius: 60px;  
  z-index: 1000;
  overflow: hidden;
  &.expanded{
    height: 100%;
  }
}
.nav-toggle{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  color: $white;
  background-color: $darkblue;
  border-radius: 26px;
  min-width: 75px;
  height: 40px;  
}
.btn-email{
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  right: 40px;
  color: $white;
  background-color: $appblue;
  border-radius: 23px;
  width: 55px;
  height: 55px; ;
  .expanded &{
    display: flex;
  }
  .btn-email-text {
    display: none;
  }
  img{
    width: 28px;
  }
}
.main-nav{
  flex: 1 0 100%;
  flex-direction: columns;
  background-color: $darkblue;
  padding: 90px 0 0;
  height: 100%;
  display: none;
  li{
    padding: 10px 30px;
  }
  .small-link{
    font-size: 20px;
  }
  .expanded &{
    display: block;
    overflow: auto;
  }
}
@include break($brd){
  .main-nav-wrapper{
    height: auto;
    border-radius: 0;    
    top: 40px;
    overflow: visible;
  }
  .main-nav{
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-direction: row;
    flex: 0 0 auto;
    height: auto;
    padding: 0 10px;
    border-radius: 26px;
    font-size: 20px;
    height: 55px;
    li{
      padding: 0 20px;   
      display: flex;
      align-items: stretch;   
    }
    a{
      opacity: .6;
      display: flex;
      align-items: center;   
      &:hover{
        opacity: 1;
      }
    }
    .router-link-active{
      opacity: 1;
    }
  }
  .btn-email{
    position: absolute;
    top: 0px; bottom: auto;
    font-size: 20px;     
    display: flex;
    background-color: $darkblue;
    z-index: 100;   
    .btn-email-svg{
      position: absolute;
      right: 14px;
    }
    .btn-email-text {
      right: 0;      
    }
    &:hover{
      width: auto;
      background-color: $imprintyellow;
      color: $darkblue;   
      border-radius: 9999px;
      &:before{
        content: '';
        width: calc(100% + 15px);
        height: calc(100% + 15px);
        background-color: $imprintyellow;
        position: absolute;
        z-index: 0;
        border-radius: 9999px;
      }
      .btn-email-text {
        position: relative;
        z-index: 1;
        display: block;
        margin-right: 55px;
        padding-left: 20px;
      }      
      :deep(path){
        stroke: $darkblue;
      }
      :deep(rect){
        stroke: $darkblue;
      }             
    }
  }
}
</style>
