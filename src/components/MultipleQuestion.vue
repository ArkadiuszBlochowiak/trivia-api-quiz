<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Questions } from '@/types/interfaces'
import { useQuizStore } from "@/stores/quiz";

const props = defineProps<{
  data: Questions
  id: number
}>();

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

const answers = computed(() => {
  const div = document.createElement('div');
  div.innerHTML = props.data.incorrect_answers
  const incorrect_text: string = div.textContent!
  const array = incorrect_text.split(',')

  div.innerHTML = props.data.correct_answer
  const correct_text = div.textContent
  const correct_string: string = correct_text!

  const len = array.push(correct_string)
  let shuffled = array
  if(!getPreviousAnswer){
    shuffled = shuffleAnswers(array)
  }
  
  const result = Object.assign({}, shuffled)
  
  if(len > 4)
    return props.data.incorrect_answers.concat(props.data.correct_answer)
  
  return result
});

const shuffleAnswers = (answers: string[]) => {
  const len = answers.length
  let one, two, temp
  for (let i = 0; i < len; i++) {
    one = Math.floor(Math.random() * len)
    two = Math.floor(Math.random() * len)
    temp = answers[one]
    answers[one] = answers[two]
    answers[two] = temp
  }
  return answers
}

const index = computed(() => {
  return props.id
})

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
      <template v-for="answer in answers">
        <div class="answer-element">
          <input 
            type="radio" 
            :id="answer" 
            :value="answer" 
            v-model="result" 
            @change="catchAnswer"
            :checked="getPreviousAnswer == answer"
          />
          <label :for="answer">{{ answer }}</label>
        </div>
      </template>
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
  justify-content: center;
  align-items: center;
  text-align: left;

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