<template>
  <section class="app-benefits-wrapper">
    <div class="mc">
      <h2 class="small">Mehrwert der digitalen Anwendung</h2>
    </div>
    <div class="benefit-section mc">
      <h3 class="benefit-headline big-2">für die museale Vermittlung von IKE</h3>
      <ul>
        <template v-for="(value, key) in props.benefits.education">
          <li class="app-details-li" v-if="key !== 'id' && key !== 'other'">
            <span class="app-details-elem" :class="{'selected' : value}"> {{ benefitsDict[key] }}</span>
          </li>
        </template>
        <li class="app-details-li">
            <span class="app-details-elem" :class="{'selected' : props.benefits.education['other']}"> {{ benefitsDict['other'] }}</span>
        </li>        
      </ul>    
    </div>
    <div class="benefit-section mc">
      <h3 class="benefit-headline big-2">für die Pflege des IKE</h3>
      <ul>
        <template v-for="(value, key) in props.benefits.curation">
          <li class="app-details-li" v-if="key !== 'id' && key !== 'other'">
            <span class="app-details-elem" :class="{'selected' : value}"> {{ benefitsDict[key] }}</span>
          </li>   
        </template>     
        <li class="app-details-li">
            <span class="app-details-elem" :class="{'selected' : props.benefits.curation['other']}"> {{ benefitsDict['other'] }}</span>
        </li>              
      </ul>   
    </div>     
    <div class="benefit-section mc">
      <h3 class="benefit-headline big-2">für die Nachhaltigkeit der Museumsarbeit</h3>
      <ul>
        <template v-for="(value, key) in props.benefits.sustainability">
          <li class="app-details-li" v-if="key !== 'id' && key !== 'other'">
            <span class="app-details-elem" :class="{'selected' : value}"> {{ benefitsDict[key] }}</span>
          </li>   
        </template>   
        <li class="app-details-li">
            <span class="app-details-elem" :class="{'selected' : props.benefits.sustainability['other']}"> {{ benefitsDict['other'] }}</span>
        </li>                 
      </ul>
    </div>    
  </section>
</template>

<script setup>
const props = defineProps({
  benefits: Object
})

const benefitsDict = {
  attractiveness: "größere Attraktivität",
  accessibility: "umfassendere Zugänglichkeit",
  audience: "neues Publikum gewinnen",
  illustration: "leichtere Veranschaulichung",  
  education: "erweiterte Vermittlungsmöglichkeit",
  diversification: "stärkere Diversifizierung",
  communication: "neue Formen der Kommunikation",
  exchange: "neue Formen des Austauschs",
  collaboration: "neue Formen der Zusammenarbeit",
  inclusion: "Einbeziehung neuer Akteursgruppen",
  perception: "veränderte Wahrnehmung/Bewertung",
  maintenance: "einfache Wartung",
  content_dev: "Inhaltliche Weiterentwicklung",
  functional_dev: "Funktionelle Weiterentwicklung",
  permanence: "Permanenz",
  autonomy: "Autonomie",
  remembrance: "Erinnerung",  
  reuse: "Nachnutzung (intern)",    
  other: "weitere",
}
</script>

<style lang="scss" scoped>
.app-benefits-wrapper{
  background-color: $appbluedarker;
  padding-top: 70px;
  @include break($brd){
    padding-top: 200px;
    padding-bottom: 130px;
  }
}
.benefit-section{
  padding-bottom: 70px;
  ul{
    grid-column: span 6;
    @include break($brd){
      grid-column: 7 / span 4;
    }    
  }
}
.benefit-headline{ 
  grid-column: span 6;
  margin-bottom: 20px;
  @include break($brd){
    grid-column: 3 / span 4;
    padding-right: 40px;
  }
}
h2{
  grid-column: span 6;
  margin-bottom: 30px;
  @include break($brd){
    grid-column: 3 / span 8;
    margin-bottom: 90px;
  }
}
</style>








