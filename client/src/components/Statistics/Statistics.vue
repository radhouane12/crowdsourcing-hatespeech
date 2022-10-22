<template>

    <v-container>
        <v-row v-if="this.$vuetify.breakpoint.lgAndUp">
            <v-spacer></v-spacer>
            <v-col>
                <user-chart :height="520" v-if="uloaded" class="chart" :uData="uData"></user-chart>
            </v-col>
            <v-col></v-col>
            <v-col>
                <v-row class="my-1">
                    <tweet-chart :height="400" v-if="twloaded" :twData="twData"></tweet-chart>
                    <v-col v-if="noPieDataToShow"></v-col>
                    <div class="mt-n16" v-if="noPieDataToShow"> No data matches your conditions</div>
                    <v-col v-if="noPieDataToShow"></v-col>
                    <!-- should be changed to tdata -->
                </v-row>
                <v-row>
                    <v-col cols="2"></v-col>
                    <v-col>
                        <v-chip-group v-model="pieCategories" column multiple v-if="twloaded">
                            <!--  v-bind:color=" isActive(0) ? 'secondary' : 'primary'" -->
                            <v-chip v-bind:outlined="isActivePie(0) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActivePie(0) }">Race</span>
                            </v-chip>

                            <v-chip v-bind:outlined="isActivePie(1) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActivePie(1) }">Sexuality</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActivePie(2) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActivePie(2) }">Ethnicity</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActivePie(3) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActivePie(3) }">Religion</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActivePie(4) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActivePie(4) }">Gender</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActivePie(5) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActivePie(5) }">Disability</span>
                            </v-chip>
                        </v-chip-group>
                        <v-col cols="2"></v-col>
                    </v-col>
                </v-row>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row v-if="this.$vuetify.breakpoint.lgAndUp">
            <v-spacer></v-spacer>
            <v-col>
                <v-row class="my-1">
                    <trend-chart :width="600" v-if="trloaded" class="chart" :labels="labels" :trData="trData">
                    </trend-chart>
                    <!-- should be changed to tdata -->
                </v-row>
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col>
                        <v-chip-group v-model="trendCategories" column multiple>
                            <!--  v-bind:color=" isActive(0) ? 'secondary' : 'primary'" -->
                            <v-chip v-bind:outlined="isActive(0) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActive(0) }">Gender</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActive(1) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActive(1) }">Sexuality</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActive(2) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActive(2) }">Ethnicity</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActive(3) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActive(3) }">Religion</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActive(4) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActive(4) }">Race</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActive(5) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActive(5) }">Disability</span>
                            </v-chip>
                        </v-chip-group>
                    </v-col>
                </v-row>
                <v-row class="mt-n5">
                    <v-col cols="4"></v-col>
                    <v-col>
                        <v-btn class="mr-1" color="#e4bcad" @click="changeLabels('Daily')">
                            <span style="color:white; font-size: 13px">Daily</span>
                        </v-btn>
                        <v-btn class="mr-1" color="#e4bcad" @click="changeLabels('Monthly')">
                            <span style="color:white; font-size: 13px">Monthly</span>
                        </v-btn>
                    </v-col>
                    <v-col cols="3"></v-col>
                </v-row>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row v-if="this.$vuetify.breakpoint.mdAndDown" class="mb-5">
            <v-spacer></v-spacer>
            <user-chart v-if="uloaded" class="chart" :uData="uData"></user-chart>
            <v-spacer></v-spacer>
        </v-row>
        <v-row v-if="this.$vuetify.breakpoint.mdAndDown" class="mb-2">
            <v-spacer></v-spacer>
            <v-col>
                <v-row>
                    <tweet-chart v-if="twloaded" :twData="twData"></tweet-chart> <!-- should be changed to tdata -->
                    <v-col v-if="noPieDataToShow"></v-col>
                    <div class="mt-n16" v-if="noPieDataToShow"> No data matches your conditions</div>
                    <v-col v-if="noPieDataToShow"></v-col>
                </v-row>
                <v-row v-if="this.$vuetify.breakpoint.mdAndDown">
                    <v-col cols="2"></v-col>
                    <v-col>
                        <v-chip-group v-model="pieCategories" column multiple v-if="twloaded">
                            <!--  v-bind:color=" isActive(0) ? 'secondary' : 'primary'" -->
                            <v-chip v-bind:outlined="isActivePie(0) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActivePie(0) }">Race</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActivePie(1) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActivePie(1) }">Sexuality</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActivePie(2) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActivePie(2) }">Ethnicity</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActivePie(3) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActivePie(3) }">Religion</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActivePie(4) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActivePie(4) }">Gender</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActivePie(5) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActivePie(5) }">Disability</span>
                            </v-chip>
                        </v-chip-group>
                        <v-col cols="2"></v-col>
                    </v-col>
                </v-row>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row v-if="this.$vuetify.breakpoint.mdAndDown" class="mb-5">
            <v-spacer></v-spacer>
            <v-col>
                <v-row>
                    <trend-chart :width="600" v-if="trloaded" class="chart" :labels="labels" :trData="trData">
                    </trend-chart>
                </v-row>
                <v-row v-if="this.$vuetify.breakpoint.mdAndDown" class="mb-5">
                    <v-col cols="1"></v-col>
                    <v-col>
                        <v-chip-group v-model="trendCategories" column multiple>
                            <!--  v-bind:color=" isActive(0) ? 'secondary' : 'primary'" -->
                            <v-chip v-bind:outlined="isActive(0) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActive(0) }">Race</span>
                            </v-chip>

                            <v-chip v-bind:outlined="isActive(1) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActive(1) }">Sexuality</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActive(2) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActive(2) }">Ethnicity</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActive(3) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActive(3) }">Religion</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActive(4) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActive(4) }">Gender</span>
                            </v-chip>
                            <v-chip v-bind:outlined="isActive(5) ?false : true" color="#e27c7c">
                                <span v-bind:class="{chipspan: isActive(5) }">Disability</span>
                            </v-chip>
                        </v-chip-group>
                    </v-col>
                </v-row>
                <v-row v-if="this.$vuetify.breakpoint.mdAndDown" class="mt-n9">
                    <v-col cols="4"></v-col>
                    <v-col>
                        <v-btn class="mr-1" color="#e4bcad" @click="changeLabels('Daily')">
                            <span style="color:white; font-size: 13px">Daily</span>
                        </v-btn>
                        <v-btn class="mr-1" color="#e4bcad" @click="changeLabels('Monthly')">
                            <span style="color:white; font-size: 13px">Monthly</span>
                        </v-btn>
                    </v-col>
                    <v-col cols="3"></v-col>
                </v-row>

            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
import userChart from './plots/userChart.vue'
import tweetChart from './plots/tweetChart.vue'
import trendChart from './plots/trendChart.vue'
import StatisticService from '../../services/StatisticService'

export default {
    components: {
        userChart,
        tweetChart,
        trendChart,
    },
    data() {
        return {
            categories: ['Gender', 'Sexuality', 'Ethnicity', 'Religion', 'Race', 'Disability'],
            pieCategories: [0, 1, 2, 3, 4, 5],
            trendCategories: [0, 1, 2, 3, 4, 5],
            udataChanged: false,
            twdataChanged: false,
            trdataChanged: false,
            uData: { regulars: 0, experts: 0 },
            twData: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
            trData: {
                1: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
                2: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
                3: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
                4: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
                5: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
                6: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
                7: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
            },
            uloaded: false,
            twloaded: false,
            trloaded: false,
            noPieDataToShow: false,
            noTrendsToShow: false,
            labels: [],
            showMonthly: false
        }
    },
    watch: {
        udataChanged() {
            this.uloaded = true
        },
        twdataChanged() {
            this.twloaded = true
        },
        trdataChanged() {
            this.trloaded = true
        },
        async pieCategories(newValue, oldValue) {
            if (newValue.length == 0) this.pieCategories = [0, 1, 2, 3, 4, 5]
            this.twloaded = false
            this.twData = { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 }
            const annotatedTweets = (await StatisticService.getAnnotated(this.pieCategories)).data
            if (annotatedTweets) {
                annotatedTweets.forEach(element => {
                    element.finalLabels.forEach(elem => {
                        this.twData[elem]++
                    })
                });
                this.twdataChanged = !this.twdataChanged
            }
            if (this.twData["Hateful"] == 0 && this.twData["Abusive"] == 0 && this.twData["Neutral"] == 0 && this.twData["Spam"] == 0 && this.twData["Threat"] == 0) {
                this.noPieDataToShow = true
            }
            else this.noPieDataToShow = false
        },
        trendCategories(newValue, oldValue) {
            if (newValue.length == 0) this.trendCategories = [0, 1, 2, 3, 4, 5]
            this.trloaded = false
            this.getTrendsData(this.trendCategories, this.showMonthly)
        }
    },
    methods: {
        isActive(i) {
            return this.trendCategories.findIndex(e => e === i) != -1
        },
        isActivePie(i) {
            return this.pieCategories.findIndex(e => e === i) != -1
        },
        changeLabels(i) {
            switch (i) {
                case 'Monthly':
                    this.trloaded = false
                    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    var chartLabels = [];
                    var d = new Date();
                    d.setDate(1); // <---- this
                    for (var m_month = 0; m_month < 7; m_month++) {
                        chartLabels[m_month] = months[d.getMonth()];
                        d.setMonth(d.getMonth() - 1);
                    }
                    this.showMonthly = true
                    this.labels = chartLabels.reverse()
                    this.getTrendsData(this.trendCategories, this.showMonthly)
                    break;
                case 'Daily':
                    this.trloaded = false
                    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                    var chartLabels = [];
                    var d = new Date();
                    for (var d_day = 0; d_day < 7; d_day++) {
                        chartLabels[d_day] = days[d.getDay()];
                        d.setDate(d.getDate() - 1)
                    }
                    this.showMonthly = false
                    this.labels = chartLabels.reverse()
                    this.labels.splice(-1)
                    this.labels.push("Today")
                    this.getTrendsData(this.trendCategories, this.showMonthly)
                    break;
            }
        },
        async getTrendsData(categories, showMonthly) {
            this.trData = {
                1: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
                2: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
                3: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
                4: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
                5: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
                6: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
                7: { Hateful: 0, Abusive: 0, Neutral: 0, Threat: 0, Spam: 0 },
            }
            const trendTweets = (await StatisticService.getTrends(categories, showMonthly)).data
            if (trendTweets) {
                for (let i = 1; i <= 7; i++) {
                    trendTweets[i - 1].forEach(element => {
                        element.finalLabels.forEach(elem => {
                            this.trData[i][elem]++
                        })
                    });
                }
                this.trdataChanged = !this.trdataChanged
            }
        }
    },
    async mounted() {
        try {
            const users = (await StatisticService.getUsers()).data
            if (users) {
                users.forEach(element => {
                    if (element.isExpert) this.uData["experts"]++
                    else this.uData["regulars"]++
                });
                this.udataChanged = !this.udataChanged
            }
        } catch (e) {
            console.error(e)
        }
        try {
            const annotatedTweets = (await StatisticService.getAnnotated(this.pieCategories)).data
            if (annotatedTweets) {
                annotatedTweets.forEach(element => {
                    element.finalLabels.forEach(elem => {
                        this.twData[elem]++
                    })
                });
                this.twdataChanged = !this.twdataChanged
            }
        } catch (e) {
            console.error(e)
        }
        try {
            this.changeLabels('Daily')
        } catch (e) {
            console.error(e)
        }

    }
}
</script>

<style scoped>
.chart {
    background-color: rgb(255, 255, 255);
}

.selector {
    background-color: rgb(255, 255, 255);
}

.chipspan {
    color: white
}
</style>