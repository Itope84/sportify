<template>
  <div id="app">
    <router-view />

    <div class="mt-5">
      <p class="text-secondary text-center">Built by <a href="https://twitter.com/i_santiag0" class="fancy-link">Temitope Ilesanmi</a></p>

      <p class="text-center small">
        Credits: <a href="https://www.football-data.org" class="fancy-link">Football data API</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import "./assets/styles.scss";
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
