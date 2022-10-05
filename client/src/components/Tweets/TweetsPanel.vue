
<template>
    <v-container>
        <v-layout row>
            <v-card class="mx-auto">
                <v-toolbar dense color="deep-purple" dark>
                    <v-icon color="white" left>
                        mdi-twitter
                    </v-icon>
                </v-toolbar>
                <!-- add filter component -->
                <div v-for="item in tweets">
                    <tweet :passed-tweet="item"></tweet>
                </div>
            </v-card>
        </v-layout>
    </v-container>
</template> 
  
    
<script>
import AnnotationService from '../../services/AnnotationService'
import Tweet from './Tweet.vue'

export default {
    components: {
        Tweet
    },
    data() {
        return {
            tweets: [{ "_id": 1571981878004940800, "created_at": "2022-09-19 23:57:40 CEST", "Category": "Gender", "tweet": "@Emohjify Aliens and or iaaawould cripple religious beliefs being withheld by some government somewhere" },{ "_id": 1571981878004940800, "created_at": "2022-09-19 23:57:40 CEST", "Category": "Gender", "tweet": "@Emohjify Aliens and or information that aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaawould cripple religious beliefs being withheld by some government somewhere" },{ "_id": 1571981878004940800, "created_at": "2022-09-19 23:57:40 CEST", "Category": "Gender", "tweet": "@Emohjify Aliens and or information that aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaawould cripple religious beliefs being withheld by some government somewhere" },{ "_id": 1571981878004940800, "created_at": "2022-09-19 23:57:40 CEST", "Category": "Gender", "tweet": "@Emohjify Aliens and or information that aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaawould cripple religious beliefs being withheld by some government somewhere" }],
        }
    },
    computed: {
        async tweetsAvailable() {
            this.tweets = (await AnnotationService.index()).data
            return this.tweets
        }
    }

}
</script>
  
<style>

</style>