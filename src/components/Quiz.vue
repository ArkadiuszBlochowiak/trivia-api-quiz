<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { Questions } from "@/types/interfaces";
import MultipleQuestion from "./MultipleQuestion.vue"
import BooleanQuestion from "./BooleanQuestion.vue"
import { useRouter } from "vue-router";
import { useQuizStore } from '@/stores/quiz'
import { useStopwatch } from 'vue-timer-hook'
import ProgressBar from "./ProgressBar.vue"

const props = defineProps<{
  data: Questions
}>()

const startQuiz = ref(false)
const index = ref(0)
const router = useRouter()
const store = useQuizStore()
const stopWatch = ref(0)

onMounted(() => {
  store.resetStore()
})

const beginQuiz = () => {
  startQuiz.value = true
  stopWatch.value = useStopwatch(<number><unknown>true)
}

const nextQuestion = () => {
  if (index.value != store.questionAmount-1) index.value++
};

const previousQuestion = () => {
  if (index.value != 0) index.value--
};

const saveAnswer = (response: any) => {
  let check = false
  if(response.value === props.data[response.id].correct_answer) check=true
  store.addAnswer(response.id, response.value, check)
}

const endQuiz = () => {
  stopWatch.pause()
  store.addTime(stopWatch.minutes.value, stopWatch.seconds.value)
  router.push('result')
}
</script>

<template>
  <section>
    <div class="question-container">
      <div v-if="startQuiz">
        <div class="question-element">
          <div class="question-label">
            <div class="progress">
              <ProgressBar :completed="index+1" :total="store.questionAmount" />
            </div>
            <p class="description">Question number {{ index + 1 }}</p>
            <div class="timer">
              <span>Time - </span>
              <span>{{ stopWatch.minutes }}</span>min
              <span>{{ stopWatch.seconds }}</span>sec
            </div>
          </div>
          <div class="question-type">
            <MultipleQuestion
              v-if="data[index].type === 'multiple'"
              :data="data[index]"
              :id="index"
              v-on:pass-answer="saveAnswer"
            />
            <BooleanQuestion 
              v-else 
              :data="data[index]" 
              :id="index"
              v-on:pass-answer="saveAnswer"
            />
          </div>
          <div class="question-navigation">
            <button v-if="index!=0" @click="previousQuestion" class="btn-main prev">Previous</button>
            <button @click="endQuiz" class="btn-main end">End quiz</button>
            <button v-if="index!=9" @click="nextQuestion" class="btn-main next">Next</button>
          </div>
        </div>
      </div>
      <div v-else class="instruction">
        <div class="content">
          <p>When you click the button below, the timer will start to count down.</p>  
          <p>Good luck!</p>
        </div>
        <button @click="beginQuiz" class="btn-main">Start</button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.question-container {
  padding-top: 100px;

  .question-element {
    padding: 30px 15px;
    border: 1px solid $decoration-color;
    border-radius: 20px;

    .question-label {
      display: flex;
      justify-content: space-between;
      padding: 0 10px 20px;
      font-size: 18px;
      font-weight: bold;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 10%;
        bottom: 0;
        height: 1px;
        width: 80%;
        border-bottom: 1px solid $decoration-color;
      }

      .progress {
        display: flex;
        font-size: 13px;
      }

      .description, .timer {
        align-self: center;
      }

      .progress, .description, .timer {
        width: 170px;
      }
    }

    .question-type {
      padding: 20px 0 30px;
      font-size: $content-text-size;
    }
    
    .question-navigation {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
}

.instruction {
  font-size: $content-text-size;

  .content {
    padding-bottom: 30px;
  }
}

@media only screen and (max-width: 600px) {
.question-container .question-element .question-label {
  padding: 0px 0px 20px; 
  .progress, .description, .timer {
    width: 140px; 
  }
}

.question-navigation {
    row-gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .prev {
      order:1
    }

    .next {
      order:0
    }

    .end {
      order:2
    }
  }
}

@media only screen and (max-width: 400px) {
  .question-container .question-element .question-label {
    padding: 0px 0px 20px; 
    .progress, .description, .timer {
      width: 85px; 
    }
  }
}
</style>
