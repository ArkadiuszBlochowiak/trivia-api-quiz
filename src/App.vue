<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <div class="content">
    <RouterView />
  </div>

  <Footer />
</template>

<style scoped lang="scss">
.content {
  min-height: calc(100vh - ($header-height + $footer-height));
  padding: 0 20px;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
</style>
