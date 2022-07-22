import { defineStore } from "pinia";

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    questionAmount: 10,
    answers: [{id: 0, answer: '', isCorrect: false}],
    sum: 0,
    time: {minutes: 0, seconds: 0},
  }),
  actions: {
    addAnswer(i: number, a: string, c: boolean) {
      this.answers[i] = {id: i, answer: a, isCorrect: c}
    },
    addTime(m: number, s: number) {
      this.time.minutes = m
      this.time.seconds = s
    },
    resetStore() {
      while(this.answers.length > 0) {
        this.answers.pop()
      }
      this.sum = 0
    },
    sumCorrect() {
      for (let i = 0; i < this.answers.length; i++) {
        if(this.answers[i].isCorrect != undefined)
          if(this.answers[i].isCorrect == true) this.sum++
      }
    }
  },
});
