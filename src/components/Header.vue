<template>
  <section class="header">
    <div class="content">
      <a href="/">
        <img src="@/assets/logo.png" alt="Trivia API Quiz" class="logo"/>
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.header {
  height: $header-height;
  background-color: $dark-background-color;

  .content {
      display: flex;
      justify-content: center;

      .logo {
        height: calc($header-height - 10px);
        margin: 5px 0px;
      }
  }
}

@media only screen and (max-width: 350px) {
  .header .content .logo {
    height: 50px;
    margin: 10px 0px;
  }
}
</style>