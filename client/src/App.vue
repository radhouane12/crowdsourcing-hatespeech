<template>
  <v-app id="app">
    <main>
      <PageHeader/>
      <v-container fluid>
        <router-view/>
      </v-container>
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
  /* eslint-disable */
</style>
