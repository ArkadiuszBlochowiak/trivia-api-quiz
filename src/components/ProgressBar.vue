<script setup lang="ts">
import RadialProgressBar from "vue3-radial-progress";

defineProps<{
  completed: number
  total: number
}>()
</script>

<template>
  <radial-progress-bar
    :diameter="50"
    :innerStrokeWidth="3"
    :strokeWidth="3"
    :completed-steps="completed"
    :total-steps="total"
  >
    {{ completed }}/{{ total }}
  </radial-progress-bar>
</template>
