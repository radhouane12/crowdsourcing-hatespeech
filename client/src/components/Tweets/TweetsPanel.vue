
<template>
    <v-container>
        <v-layout row>
            <v-card class="mx-auto" :max-width="$vuetify.breakpoint.lgAndDown ? 900 : 1200">
                <v-toolbar dense color="deep-purple" dark>
                    <v-icon color="white" left>
                        mdi-twitter
                    </v-icon>
                </v-toolbar>
                <div id="filters" class="ma-2">
                    <v-row align-content="center">
                        <v-spacer></v-spacer>
                        <v-col cols="11" sm="5">
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
            date: '2020-01-01',
            menu: false,
            categories: [0, 1, 2, 3, 4, 5],
        }
    },
    computed: {
        async tweetsAvailable() {
            if (!this.tweets && !this.noTweetsLeftAtDb) {
                this.tweets = (await AnnotationService.index(this.filterLength, this.$store.state.auth.user._id)).data
            }
            return this.tweets
        },
    },
    methods: {
        async getReplacement() {
            const alreadyViewed = this.tweets.map(element => element._id)
            let replacement = (await AnnotationService.getOne(this.$store.state.auth.user._id,
                {
                    "date": this.date,
                    "categories": this.categories,
                    "alreadyViewed": alreadyViewed
                })).data
            if (replacement) {
                this.tweets.push(replacement)
            } else {
                this.noTweetsLeftAtDb = true
            }
        },
        async applyFilters() {
            this.tweets = (await AnnotationService.getFiltered({
                "user": this.$store.state.auth.user._id,
                "date": this.date,
                "categories": this.categories,
                "len": this.filterLength
            })).data
        },
        async skip(id) {
            const pos = this.tweets.map(tweet => tweet._id).indexOf(id)
            this.tweets.splice(pos, 1)
            await AnnotationService.skipTweet({ "tweetId": id, "user": this.$store.state.auth.user._id })
            await this.getReplacement()
        },
        async flag(data) {
            const pos = this.tweets.map(tweet => tweet._id).indexOf(data.tweetId)
            this.tweets.splice(pos, 1)
            await AnnotationService.flagTweet({ "tweetId": data.tweetId, "user": this.$store.state.auth.user._id, "flag": data.flag })
            await this.getReplacement()
        },
        async addCategory(data) {
            const updatedVersion = (await AnnotationService.addCategory({ "tweetId": data.tweetId, "newCategory": data.newCategory })).data
            const pos = this.tweets.map(tweet => tweet._id).indexOf(data.tweetId)
            this.tweets.splice(pos, 1, updatedVersion)
        },
        async submitLabels(data) {
            const pos = this.tweets.map(tweet => tweet._id).indexOf(data.tweetId)
            this.tweets.splice(pos, 1)
            await AnnotationService.labelTweet({ "tweetId": data.tweetId, "user": this.$store.state.auth.user._id, "labels": data.labels })
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