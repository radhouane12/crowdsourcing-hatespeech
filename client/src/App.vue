<template>
  <v-app id="app">
    <main>
      <PageHeader />
      <v-content class="my-4">
        <v-container>
          <router-view />
        </v-container>
      </v-content>
      <v-footer  fixed color="#673AB7" class="mt-5">
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
  background: linear-gradient(rgba(103, 58, 183, 0.1),rgba(103, 58, 183, 0.1)),url('./assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
}
.text {
  color: white;
}
</style>
