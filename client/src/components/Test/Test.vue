<template>
    <v-container class="my-10">
        <v-layout row>
            <v-card class="mx-auto" hover outlined width="900">
                <v-toolbar dense color="deep-purple" dark>
                    <v-icon color="white" left>
                        mdi-twitter
                    </v-icon>
                </v-toolbar>
                <v-card-text v-if="i>0 && i<results.length">
                    <span class="tweetnr">
                        Tweet {{this.i}}:
                    </span>
                    <br>
                    <span class="text-h8 text--primary">
                        "{{tweets[i].tweet}}"
                    </span>
                    <br>
                    <span class="grey--text" style="font-size:x-small;">Posted on
                        {{tweets[i].created_at.slice(0,10)}},
                        Assigned Category: {{tweets[i].category}}</span>
                    <v-chip-group v-model="labels" column multiple>
                        <v-chip filter outlined color="deep-purple">
                            Hateful
                        </v-chip>
                        <v-chip filter outlined color="deep-purple">
                            Abusive
                        </v-chip>
                        <v-chip filter outlined color="deep-purple">
                            Neutral
                        </v-chip>
                        <v-chip filter outlined color="deep-purple">
                            Spam
                        </v-chip>
                        <v-chip filter outlined color="deep-purple">
                            Threat
                        </v-chip>
                    </v-chip-group>
                </v-card-text>
                <v-card-actions v-if="i>0 && i<this.results.length">
                    <v-spacer></v-spacer>
                    <v-btn small outlined color="deep-purple" @click="restart">
                        restart
                    </v-btn>
                    <v-btn small contained color="deep-purple" :disabled="!oneLabelSelected" @click="submit">
                        <span style="color:#FFFFFF;">Submit</span>
                    </v-btn>
                </v-card-actions>
                <v-card-text v-if="i==0">
                    <div class="text-h8 text--primary">In The Following, you will be presented with 10 tweets to annotate. According to your annotations you will either be an expert user or a regular user.
                        Expert users are/have bla bla bla 
                    </div>
                    <div class="text-h8 text--primary">If you do not wish to be an expert user, click the "QUIT TEST" Button above.</div>       
                </v-card-text>
                <v-card-actions v-if="i==0">
                    <v-spacer></v-spacer>
                    <v-btn small contained color="deep-purple" @click="start">
                        <span style="color:#FFFFFF;">Start</span>
                    </v-btn>
                </v-card-actions>
                <v-card-text class="text-center mt-3" v-if="i>=this.results.length">
                    <div class="text-h8 text--primary"> You have been assigned the role: {{role}}
                    </div>        
                </v-card-text>
                <v-card-actions v-if="i>=this.results.length">
                    <v-spacer></v-spacer>
                    <v-btn small contained color="deep-purple" @click="endTest">
                        <span style="color:#FFFFFF;">Ok</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import testSet from './testSet.json'
import resultSet from './resultSet.json'
import TestService from '../../services/TestService'

export default {
    data() {
        return {
            labels: null,
            i: localStorage.i || 0,
            score: localStorage.score || 0,
            tweets: testSet,
            results: resultSet,
            role:'',
        }
    },
    computed: {
        oneLabelSelected() {
            if (this.labels) {
                if (this.labels.length > 0) return true
                return false
            }
            return false
        },
        totalScore () {
            let total=0
            for (let i= 1; i<this.results.length;i++) {
                total += this.results[i].labels.length
            } 
            return total
        }
    },
    methods: {
        start(){
            this.$store.dispatch('testState', true)
            this.i=1
            localStorage.i = this.i
        },
        async submit() {
            var convertedLabels = this.labels.map(item => item == 0 ? 'Hateful' : item == 1 ? 'Abusive' : item == 2 ? 'Neutral' : item == 3 ? 'Spam' : 'Threat')
            for (let j= 0; j< this.results[this.i].labels.length; j++){
                if (convertedLabels.indexOf(this.results[this.i].labels[j]) !== -1) {
                    this.score = this.score +1
                    localStorage.score = this.score
                }
            }
            this.labels = []
            this.i++
            localStorage.i = this.i
            if (this.i >=this.results.length) {
                if (this.score/this.totalScore >= 0.7) {
                    this.role= 'Expert'
                    this.$store.dispatch('makeExpert')
                    await TestService.makeExpert()
                }
                else {
                    this.role = 'Regular'
                }
            }
        },
        endTest() {
            localStorage.removeItem("score")
            localStorage.removeItem("i")
            this.$store.dispatch('testState', false)
            this.$router.push({name: 'annotation'}).catch(error => {
                if (error.name != "NavigationDuplicated") {
                    throw error;
                }
            })  
        },
        restart() {
            this.i=0
            localStorage.i=0
            this.score=0
            localStorage.score=0
        }
    }
}
</script>

<style scoped>
.tweetnr {
    text-decoration: underline
}
</style>
