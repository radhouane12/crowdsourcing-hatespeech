<template>
  <v-container> 
  <v-layout row>
      <tweets-panel></tweets-panel>
  </v-layout>
</v-container>
</template>

<script>
import TweetsPanel from './TweetsPanel.vue'

export default {
    components: {
      TweetsPanel
    },
}
</script>

<style scoped>
</style>
