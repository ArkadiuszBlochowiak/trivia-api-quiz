<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Questions } from '@/types/interfaces'
import { useQuizStore } from '@/stores/quiz'

const props = defineProps<{
  data: Questions
  id: number
}>()

const emit = defineEmits(['passAnswer'])

const result = ref(null)
const store = useQuizStore()

const getPreviousAnswer = computed(() => {
  try{
    if(store.answers[props.id] !== undefined) {
      if(store.answers[props.id].answer !== '') return store.answers[props.id].answer
    }
    return null
  } catch {
    return 'something go wrong'
  }
})

const index = computed(() => {
  return props.id
})

//one way to get rid of '&quot;' etc.
const question = computed(() => {
  const div = document.createElement('div');
  div.innerHTML = props.data.question
  return div.textContent
})

const catchAnswer = () => {
  const ans = {
    id: props.id,
    value: result.value
  }
  emit('passAnswer',ans)
}

watch(index, async () => {
  result.value = null
})
</script>

<template>
  <section>
    <div class="question">
      <p>{{ question }}</p>
    </div>
    <div class="answers">
      <div class="answer-element">
        <input 
          type="radio" 
          id="True" 
          value="True" 
          name="question" 
          v-model="result" 
          @change="catchAnswer"
          :checked="getPreviousAnswer == 'True'"
        />
        <label for="True">True</label>
      </div>
      <div class="answer-element">
        <input 
          type="radio" 
          id="False" 
          value="False" 
          name="question" 
          v-model="result" 
          @change="catchAnswer"
          :checked="getPreviousAnswer == 'False'"
        />
        <label for="False">False</label>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.question {
  padding-bottom: 20px;
  font-weight: 700;
}

.answers {
  display: flex;
  flex-direction: column;

  .answer-element {
    &:nth-child(2n+1) {
      padding: 10px 0;
    }

    label {
      padding-left: 5px;
    }
  }
}
</style>