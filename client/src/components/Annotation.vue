<template>
  <v-layout column>
    <v-flex>
      <div class = "white elevation-2">
        <v-toolbar flat dense color="deep-purple" dark>
          <v-toolbar-title>Tweets</v-toolbar-title>
        </v-toolbar>
        <div v-if="tweetsAvailable" class="pl-4 pr-4 pt-2 pb-2" >
        <div v-for="element in tweets" :key="element._id">
            {{element.tweet}}
            <br>
            {{element.created_at}}
        </div>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AnnotationService from '../services/AnnotationService'

export default {
    data() {
        return {
            tweets: null,
        }
    },
    computed: {
      async tweetsAvailable () {
        this.tweets = (await AnnotationService.index()).data
        return this.tweets
      }
    }
}
</script>

<style scoped>
</style>
