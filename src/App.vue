<template>
  <div id="app">
    <!-- Precargar todas las imágenes -->
    <div class="hidden">
      <img src="/assets_base/1LogoClaroMedia.png" alt="preload" />
      <img
        src="/assets_base/2LogoDataBarServimosresultadosefectivos.png"
        alt="preload"
      />
      <img src="/assets_base/3LogoClaromediaDataBar.png" alt="preload" />
      <img src="/assets_base/4FondoPersona.png" alt="preload" />
      <img src="/assets_base/4FondoPersonaTenue.png" alt="preload" />
      <img src="/assets_base/6 Conversion Mule.png" alt="preload" />
      <img src="/assets_base/7 Affinity Spritz.png" alt="preload" />
      <img src="/assets_base/8 Engagement Tonic.png" alt="preload" />
      <img src="/assets_base/9 Planters Punch.png" alt="preload" />
      <img src="/assets_base/10 Data Brew.png" alt="preload" />
    </div>

    <!-- Transición suave entre páginas -->
    <transition name="page" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // Precargar imágenes críticasfdsfds
    this.preloadImages()
  },
  methods: {
    preloadImages() {
      const imageUrls = [
        '/assets_base/1LogoClaroMedia.png',
        '/assets_base/2LogoDataBarServimosresultadosefectivos.png',
        '/assets_base/3LogoClaromediaDataBar.png',
        '/assets_base/4FondoPersona.png',
        '/assets_base/4FondoPersonaTenue.png',
        '/assets_base/6 Conversion Mule.png',
        '/assets_base/7 Affinity Spritz.png',
        '/assets_base/8 Engagement Tonic.png',
        '/assets_base/9 Planters Punch.png',
        '/assets_base/10 Data Brew.png'
      ]

      imageUrls.forEach(url => {
        const img = new Image()
        img.src = url
      })
    }
  }
}
</script>

<style>
/* Transiciones suaves entre páginas */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-in-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* Clase para elementos ocultos */
.hidden {
  display: none;
}
</style>
