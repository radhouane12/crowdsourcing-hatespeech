<template>
  <v-app id="app">
    <main>
      <PageHeader/>
      <v-content class ="my-4">
          <v-container>
              <router-view />
          </v-container>
      </v-content>
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
</style>
