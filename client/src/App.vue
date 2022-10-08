<template>
  <v-app id="app">
    <main>
      <PageHeader/>
      <v-content >
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
  background: url('./assets/Sprink.png') no-repeat center center fixed;
  background-size: cover;
}
</style>
