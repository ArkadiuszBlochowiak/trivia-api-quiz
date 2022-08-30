<script setup lang="ts">
import Quiz from '@/components/Quiz.vue'
import { ref, watchEffect } from 'vue'

const data = ref()
const loading = ref(true)
const error = ref(null)

const fetchData = () => {
  fetch('https://opentdb.com/api.php?amount=10')
  .then((res) => res.json())
  .then((json) => (data.value = json, loading.value = false))
  .catch((err) => (error.value = err))
}

watchEffect(fetchData)
</script>

<template>
  <main>
    <div v-if="loading" class="loading"> Loading data... </div>
    <div v-if="data">
      <Quiz :data="data.results"/>
    </div>
    <div v-if="error"> {{error}} </div>
  </main>
</template>

<style scoped lang="scss">
  .loading {
    padding-top: 100px;
    font-size: $content-text-size;
  }
</style>
