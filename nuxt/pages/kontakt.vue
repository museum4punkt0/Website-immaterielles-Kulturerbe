<template>
  <div class="page-content">    
    <div class="contact-intro mc">
      <div class="contact-intro-inner normal-2">
        <p>Sie haben als Mitarbeiter*in eines Museums eigene Erfahrungen mit digitaler IKE-Vermittlung gemacht, die für Kolleg*innen interessant sein könnten?</p>
        <p>Sie beschäftigen sich ehrenamtlich mit der Pflege eines immateriellen Kulturguts und möchten Ihre Erfahrungen teilen?</p>
        <p>Dann nehmen Sie über das Formular Kontakt mit uns auf!</p>
      </div>      
    </div>    
    <TemplatesContactForm/>
    <div class="contact-footer mc">
      <div class="contact-footer-inner normal-2">
        <h2>Kontakt</h2>
        <div>
          <p>Institut für Museumsforschung</p> 
          <p>In der Halde 1<br>14195 Berlin</p>
          <p>T&nbsp;&nbsp;+49 (0)30 266426901<br>E&nbsp;&nbsp;<a href="mailto:ifm@smb.spk-berlin.de">ifm@smb.spk-berlin.de</a></p> 
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
setMetaInfos({
  seo_title: 'Kontakt',
  seo_img_url: '/assets/img/Logo/Logo_mittelachsial_dunkelblau.png'
});
</script>

<style lang="scss" scoped>
.page-content{
  @include cpt();
}
.contact-intro{
  margin-bottom: 10px;
  @include break($brd){
    margin-bottom: 120px;
  }
  p{
    margin-bottom: 1.2em;
  }  
}
.contact-intro-inner,
.contact-footer-inner{
  grid-column: span 6;
  @include break($brd){
    grid-column: 3 / span 8;
  }
  @include break($brmed){
    grid-column: 4 / span 6;
  }  
}

.contact-footer{
  margin-top: 60px;
  @include break($brd){
    margin-top: 150px;
  }  
  h2{
    @include small();
    margin-bottom: 30px;
    @include break($brd){
      margin-bottom: 3em;
    }
  }
  p{
    margin-bottom: 1em;
  }
}
.contact-footer-inner{
  padding-bottom: 70px;
  @include break($brd){
    padding-bottom: 120px;
  }
  a{
    font-family: 'htimes';
  }  
}
</style>