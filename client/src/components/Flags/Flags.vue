<template>
    <v-container>
        <v-card class="mx-auto" :max-width="$vuetify.breakpoint.lgAndDown ? 900 : 1200">
            <v-toolbar dense color="deep-purple" dark>
                <v-icon color="white" left>
                    mdi-twitter
                </v-icon>
                <v-spacer></v-spacer>
                <span>Flagged Tweets left: {{ flaggedTweets ? flaggedTweets.length : 0 }}</span>
                <v-spacer></v-spacer>
                <v-btn class="elevation-0" color="deep-purple" fab small @click.prevent="help = true">
                    <v-icon color="white" center>
                        mdi-help-circle-outline
                    </v-icon>
                </v-btn>
                <v-dialog v-model="help" width="70%">
                    <v-card>
                        <v-card-title class="text-h6">
                            how to
                        </v-card-title>
                        <v-card-text>
                            bla bla
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text color="purple" @click="help = false">
                                Ok
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
            <div v-if="flaggedTweetsAvailable">
                <v-card v-for="tweet in flaggedTweets" :key="tweet._id">
                    <!-- change key to tweet.id -->
                    <v-card-text>
                        <span class="text-h8 text--primary">
                            {{ tweet.tweet }}
                        </span>
                        <br>
                        <span class="grey--text" style="font-size:x-small;">Posted on {{ tweet.created_at }}
                            ,
                            Assigned Categories: {{ tweet.category }}</span>
                        <br>
                        <span class="red--text" style="font-size:small;"> {{ tweet.flag }}</span>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn small outlined color="red" @click="deleteTweet(tweet._id)">
                            Delete
                        </v-btn>
                        <v-btn small contained color="deep-purple" @click="keepTweet(tweet._id)">
                            <span style="color:#FFFFFF;">Keep</span>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import FlagService from '../../services/FlagService'

export default {
    data() {
        return {
            flaggedTweets: [],
            change: 0,
            help: false,
        }
    },
    computed: {
        async flaggedTweetsAvailable() {
            this.flaggedTweets = (await FlagService.getFlagged()).data

            return this.flaggedTweets
        }
    },
    methods: {
        async deleteTweet(id) {
            await FlagService.removeFlag(id,"delete")
            const pos = this.flaggedTweets.map(tweet => tweet._id).indexOf(id)
            this.flaggedTweets.splice(pos, 1)
        },
        async keepTweet(id) {
            await FlagService.removeFlag(id,"keep")
            const pos = this.flaggedTweets.map(tweet => tweet._id).indexOf(id)
            this.flaggedTweets.splice(pos, 1)
        }
    }
}
</script>

<style scoped>

</style>
