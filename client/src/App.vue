<template>
  <v-app id="app">
    <main>
      <PageHeader />
      <v-content class="my-4">
        <v-container>
          <router-view />
        </v-container>
      </v-content>
      <v-footer  fixed>
        <v-spacer></v-spacer>
          <span class="text">
            {{ new Date().getFullYear() }}   —   <strong>Combat Hate</strong>
          </span>
          <v-spacer></v-spacer>
      </v-footer>
    </main>
  </v-app>
</template>

<script>
import PageHeader from "./components/Header.vue"

export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  background: url('./assets/W.png') no-repeat center center fixed;
  background-size: cover;
}
.text {
  color: #673AB7;
}
</style>
