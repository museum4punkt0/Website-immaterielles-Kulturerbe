<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <CookieControl locale="en" />      
  </div>  
</template>

<script setup>
const {
  cookiesEnabled,
  cookiesEnabledIds,
  isConsentGiven,
  isModalActive,
  moduleOptions
} = useCookieControl()

// example: react to a cookie being accepted
watch(
  () => cookiesEnabledIds.value,
  (current, previous) => {
    if (
      (!previous?.includes('matomo-cookie') &&
        current?.includes('matomo-cookie'))
    ) {
      // Add Matomo Tracking
      useHead({
        script: [
            { children: "var _paq = window._paq = window._paq || [];_paq.push(['trackPageView']);_paq.push(['enableLinkTracking']);(function() {var u='https://webstats.sbb.berlin/'; _paq.push(['setTrackerUrl', u+'matomo.php']); _paq.push(['setSiteId', '95']); var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);})();" }
          ],
      });

    }
  },
  { deep: true }
)
</script>
<style lang="scss">
@import './assets/scss/main.scss';
</style>

