<template>
  <v-container> 
  <v-layout row>
    <v-flex >
      <tweets-panel></tweets-panel>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import TweetsPanel from './Tweets/TweetsPanel.vue'

export default {
    components: {
      TweetsPanel
    },
}
</script>

<style scoped>
</style>
