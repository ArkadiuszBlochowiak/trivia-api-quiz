<script setup lang="ts">
import { ref, onBeforeMount} from 'vue'
import { useQuizStore } from '@/stores/quiz'
import PieChart from '@/components/ResultChart.vue'
import { computed } from '@vue/reactivity'

const store = useQuizStore()
const done = ref(false)

onBeforeMount(() => {
  store.sumCorrect()
  done.value = true
})

const correctAnswers = computed(() => {
  return store.sum
})

const incorrectAnswers = computed(() => {
  return store.questionAmount-store.sum
})
</script>

<template>
    <main>
      <div class="result-container">
        <div class="result-info">
          <h1>Correct answers: {{ store.sum }} / {{ store.questionAmount }}</h1>
          <p>Time: {{ store.time.minutes }}min {{ store.time.seconds }}sec</p>
        </div>
        <div class="result-chart" v-if="done, store.answers.length!=0">
          <PieChart :correct="correctAnswers" :incorrect="incorrectAnswers"/>
          <p class="chart-description">Graph of the ratio of correct to incorrect answers</p>
        </div>
        <div class="result-button">
          <button @click="$router.push('/')" class="btn-main">Close summary</button>
        </div>
      </div>
    </main>
</template>

<style scoped lang="scss">
.result-container {
  padding-top: 100px;

  .result-info {
    font-size: 20px;
  }

  .result-chart {
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .chart-description {
      padding-top: 10px;
      font-size: 18px;
    }
  }
  .result-button {
    padding-top: 40px;
  }
}

@media only screen and (max-width: 450px) {
  .result-container .result-info {
    font-size: 17px;
  }
}
</style>