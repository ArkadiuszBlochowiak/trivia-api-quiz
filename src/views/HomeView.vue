<template>
  <main>
    <div class="home">
      <div class="description">
        <h1>Trivia API Quiz App</h1>
        <p> Application made in Vue.js using Trivia API. After pressing the start button, the application generates 10 random questions. These can be either choice
          or true / false questions. After completing the quiz, the number of correct answers is displayed, as well as a graphical interpretation in the form of a 
          chart. 
        </p>
      </div>
      <div class="content">
        <button @click="$router.push('/quiz')" class="btn-main">Lets start!</button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .description {
    padding-bottom: 30px;
    h1{
      font-size: $title-text-size;
      padding: 10px 0px
    }
    p {
      font-size: $content-text-size;
    }
  }
}
</style>

