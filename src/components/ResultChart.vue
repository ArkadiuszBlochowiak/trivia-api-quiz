<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'
import { h } from 'vue';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

const props = defineProps<{
  correct: number
  incorrect: number
}>();

const chartData = {
  labels: ['correct', 'incorrect'],
  datasets: [
    {
      backgroundColor: ['#41B883','#E46651'],
      data: [props.correct, props.incorrect]
    }
  ] 
}

const chartOptions = {
  responsive: true,
  maintainAspectRation: false
}

h(Pie, {
  chartData,
  chartOptions
})
</script>

<template>
  <div class="chart">
    <Pie 
      :chart-data="chartData" 
      :chart-options="chartOptions" 
    />
  </div>
</template>

<style scoped lang="scss">
.chart {
  width: 300px;
  height: 300px;
}

@media only screen and (max-width: 450px) {
  .chart {
    width: 250px;
    height: 250px;
  }
}
</style>