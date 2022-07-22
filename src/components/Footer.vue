<template>
  <section class="footer">
    <div class="content">
      <p>Vue App using <a href="https://opentdb.com/api_config.php">Trivia API</a> © 2022 Arkadiusz Błochowiak</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.footer {
  font-size: 16px;
  background-color: $dark-background-color;
  height: $footer-height;

  .content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    a {
      text-decoration: none;
      color: $text-color;

      &:hover {
        text-decoration: none;
        color: $bright-text-color;
      }
    }
  }
}
</style>
