<template>
  <div class="maps-wrapper">
    <GoogleMap
      :api-key="useRuntimeConfig().GMAP_API_KEY"
      style="width: 100%; height: 100%"
      :center="mapCenter"
      :zoom="6"
      :styles=customStyle      
      class="gmap"
    >
      <Marker :options="{ position: getLatLng(house), icon: customSvgIcon}" v-for="house in houseData">
        <InfoWindow 
          :options="{ position: getLatLng(house), content: `<div class='house-on-map'><a href='/haeuser/${house.attributes.slug}'>${house.attributes.title}<img src='${house.attributes.img.data.attributes.url}'/></a></div>` }" />
      </Marker>   
    </GoogleMap>     
  </div>
</template>
<script setup>
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'

const props = defineProps({
  houseData: Object
})

const customSvgIcon = {path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',fillColor: '#172343',fillOpacity: 1, strokeWeight: 0, scale: .7};
const mapCenter = { lat: 51.1642292, lng: 10.4541194 }
const customStyle = [ { "featureType": "all", "elementType": "labels.text.fill", "stylers": [ { "color": "#2D5351" } ] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "visibility": "on" } ] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [ { "color": "#E3ECEB" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [ { "color": "#E3ECEB" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [ { "color": "#E3ECEB" } ] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [ { "color": "#E3ECEB" } ] }, { "featureType": "landscape.natural.landcover", "elementType": "geometry.fill", "stylers": [ { "color": "#E3ECEB" } ] }, { "featureType": "landscape.natural.terrain", "elementType": "geometry.fill", "stylers": [ { "color": "#E3ECEB" } ] }, { "featureType": "poi", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.attraction", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.business", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.government", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.medical", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#D0DFDE" } ] }, { "featureType": "poi.park", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.place_of_worship", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.school", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.sports_complex", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#FF0000" }, { "visibility": "simplified" } ] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "color": "#FFFFFF" } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "geometry.fill", "stylers": [ { "color": "#659592" } ] }, { "featureType": "transit", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit.station.airport", "elementType": "geometry.fill", "stylers": [ { "color": "#D0DFDE" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#9DBBBA" } ] }, { "featureType": "water", "elementType": "labels.text", "stylers": [ { "visibility": "simplified" }, { "color": "#2D5351" } ] } ];

function getLatLng(aHouse){
  return {'lat': Number(aHouse.attributes.lat), 'lng': Number(aHouse.attributes.lng) }
}

</script>
<style lang="scss" scoped>
:deep(.gm-control-active),
:deep(.gm-bundled-control),
:deep(.gm-fullscreen-control),
:deep(.gm-style-mtc, .gm-style-mtc){
  display: none !important;
}
:deep(.gm-style-iw-d){
  overflow: hidden !important;
}
.maps-wrapper{
  @include cpt();
  height: calc(100vh);
  width: 100%;
  position: relative;
  margin-bottom: -62px; 
}
.gmap{
    border-radius: 68px 68px 0 0;    
    overflow: hidden;
  }    
:deep(.gm-style-iw){
  p{
    text-align: center;
  }
  a{
    font-size: 16px;
    text-align: center;
    display: block;
  }
}
:deep(.gm-style-iw-c){
  background-color: transparent;
  box-shadow: none;
  top: 100px;
}
:deep(.gm-style-iw-tc){
  display: none;
} 
:deep(.gm-ui-hover-effect){
  top: 0 !important;
  right: 0 !important;
  width: 30px;
  height: 30px;
  background-color: $white !important;
  opacity: 1 !important;
  border-radius: 999px !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  span{
    margin: 0 !important;
    width: 22px!important;
    height: 22px!important;    
  }
}
:deep(.house-on-map){
  a{
    font-family: 'varela';
    display: block;
    width: 230px;
    height: 230px;
    background-color: $housemint;
    border-radius: 999px;
    color: $fontblue;  
    padding: 110px 40px 0 20px;
    text-align: left;
    font-size: 16px;
    line-height: 20px;
  }
  img{
    position: absolute;
    top: 0;
    right: 0px;
    width: 115px;
    height: 115px;
    object-fit: cover;
    border-radius: 999px;
  }  
}

</style>