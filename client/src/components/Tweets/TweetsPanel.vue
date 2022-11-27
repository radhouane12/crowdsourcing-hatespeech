
<template>
    <v-container>
        <v-layout row>
            <v-card class="mx-auto" :max-width="$vuetify.breakpoint.lgAndDown ? 900 : 1200">
                <v-toolbar dense color="deep-purple" dark>
                    <v-icon color="white" left>
                        mdi-twitter
                    </v-icon>
                    <v-spacer></v-spacer>
                    <v-btn class="elevation-0" color="deep-purple" small @click.prevent="$store.state.auth.tutorial = true">
                        show label definitions
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="elevation-0" color="deep-purple" fab small @click.prevent="help = true">
                        <v-icon color="white" center >
                            mdi-help-circle-outline
                        </v-icon>
                    </v-btn>
                    <v-dialog v-model="help" width="70%">
                        <v-card>
                            <v-card-title class="text-h6">
                                Annotations
                            </v-card-title>
                            <v-card-text>
                                This page allows you to annotate tweets that we have collected from twitter following a strategy of targeting tweets that contain terms that have been evaluated to be associated with online hate speech.
                                <br>
                                You can choose  to either label a tweet using the labels we provide, with the possibility of adding another label that you might see fit. It is necessary though, to choose one of the provided labels if you wish to label the tweet. You also may skip the tweet, if you do not wish to annotate it.
                                <br>
                                If the tweet is not comprehensible to you or is just not in english, you can flag it through the menu next the the "Submit" button. 
                                <br>
                                Expert users also can decide to assign the tweets to other categories. The provided categories are chosen according to the definition of hate speech.
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
                <div id="filters" class="ma-2">
                    <v-row align-content="center">
                        <v-spacer></v-spacer>
                        <v-col cols="11" sm="5" xl="4">
                            <v-chip-group v-model="categories" column multiple>
                                <v-chip small filter outlined color="deep-purple">
                                    Gender
                                </v-chip>
                                <v-chip small filter outlined color="deep-purple">
                                    Disability
                                </v-chip>
                                <v-chip small filter outlined color="deep-purple">
                                    Race
                                </v-chip>
                                <v-chip small filter outlined color="deep-purple">
                                    Religion
                                </v-chip>
                                <v-chip small filter outlined color="deep-purple">
                                    Ethnicity
                                </v-chip>
                                <v-chip small filter outlined color="deep-purple">
                                    Sexuality
                                </v-chip>
                            </v-chip-group>
                        </v-col>
                        <v-col offset="2" offset-sm="0" class="mt-2" cols="8" sm="2">
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                transition="scale-transition" offset-y max-width="290px" min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field class="calendar" v-model="date" label="Since"
                                        prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col offset="2" offset-sm="0" class="mt-2" cols="8" sm="2">
                            <v-text-field v-model="filterLength" label="Tweets viewed" placeholder="x" type="number"
                                min="0"></v-text-field>
                        </v-col>

                        <v-col offset="5" offset-sm="0" class="mt-6" cols="8" sm="2">
                            <v-btn @click="applyFilters" small color="deep-purple" type="submit">
                                <span style="color:#FFFFFF">Apply</span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>

                <div v-if="tweetsAvailable">
                    <div id="view" v-for="item in tweets">
                        <tweet :passed-tweet="item" @skipTweet="skip($event)" @flagTweet="flag($event)"
                            @addCategory="addCategory($event)" @submit="submitLabels($event)"></tweet>
                    </div>
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
            filterLength: 5,
            tweets: null,
            noTweetsLeftAtDb: false,
            date: '2022-01-01',
            menu: false,
            categories: [0, 1, 2, 3, 4, 5],
            help: false,
        }
    },
    computed: {
        async tweetsAvailable() {
            if (!this.tweets && !this.noTweetsLeftAtDb) {
                this.tweets = (await AnnotationService.index({
                    type: "normal", filterLength:
                        this.filterLength,
                    user: this.$store.state.auth.user._id
                })
                ).data
            }
            return this.tweets
        },
    },
    methods: {
        async getReplacement() {
            const alreadyViewed = this.tweets.map(element => element._id)
            let replacement = (await AnnotationService.index({
                type: "single",
                filterLength: this.filterLength,
                user: this.$store.state.auth.user._id,
                date: this.date,
                categories: this.categories,
                alreadyViewed: alreadyViewed
            }))
                .data
            if (replacement) {
                this.tweets.push(replacement)
            } else {
                this.noTweetsLeftAtDb = true
            }
        },
        async applyFilters() {
            this.tweets = (await AnnotationService.index({
                type: "filtered",
                filterLength: this.filterLength,
                user: this.$store.state.auth.user._id,
                date: this.date,
                categories: this.categories
            }))
                .data
        },
        async skip(id) {
            const pos = this.tweets.map(tweet => tweet._id).indexOf(id)
            this.tweets.splice(pos, 1)
            await AnnotationService.editTweet("skip",id,null)
            await this.getReplacement()
        },
        async flag(data) {
            const pos = this.tweets.map(tweet => tweet._id).indexOf(data.tweetId)
            this.tweets.splice(pos, 1)
            await AnnotationService.editTweet("flag",data.tweetId,{data: data.flag})
            await this.getReplacement()
        },
        async addCategory(data) {
            const updatedVersion = (await AnnotationService.editTweet("addCategory",data.tweetId,{data:data.newCategory})).data
            const pos = this.tweets.map(tweet => tweet._id).indexOf(data.tweetId)
            this.tweets.splice(pos, 1, updatedVersion)
        },
        async submitLabels(data) {
            const pos = this.tweets.map(tweet => tweet._id).indexOf(data.tweetId)
            this.tweets.splice(pos, 1)
            await AnnotationService.editTweet("label",data.tweetId,{data:data.labels})
            await this.getReplacement()
        },
    }
}
</script>
  
<style>
#filters {
    border: 1px solid #EEEEEE;
    border-radius: 25px;
}
</style>