<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
    <app-footer v-if="!nofooter"></app-footer>
  </div>
</template>

<script>
import AppHeader from "compDom/AppHeader/AppHeader.vue";

export default {
  name: "App",
  components: {
    AppHeader,
  },
  mounted() {
    $("[rel='tooltip']").tooltip();
  },
  updated() {
    $("[rel='tooltip']").tooltip();
  },
  computed: {
    nofooter() {
      return this.$route.meta.nofooter;
    }
  }
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 13px;
  line-height: 1.6;
  background: #fff;
  p {
    color: #1a2330;
  }
}
</style>

