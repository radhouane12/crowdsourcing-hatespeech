<template>
    <v-container class="my-10">
        <v-layout row>
            <v-spacer v-if="this.$vuetify.breakpoint.lgAndUp"></v-spacer>
            <v-flex xs12 lg5 xl4>
                <v-sheet id="side-sheet" outlined rounded shaped>
                    <img class="my-2 mx-8"  :src="require('../assets/logo-p.png')" height="34" />
                    <div id="text" class="mx-6" style="color:black">
                        Combat Hate was built to assist researchers and practioners in the field of online hate speech
                        detection by providing a platform to annotate data, providing up-to-date labeled dataset with
                        all information that may be relevant in the process.
                    </div>
                    <br>
                    <div id="text" class="mx-6 mb-3 mt-n4" style="color:#673AB7;font-size: 18px;">
                        <b>Help us build a dataset that you could use! Register now 👉</b>
                    </div>
                </v-sheet>
            </v-flex>
            <v-flex xs0 lg1></v-flex>
            <v-flex xs12 lg5 xl4 v-bind:class="(this.$vuetify.breakpoint.mdAndDown) ? 'mt-4' : ''">
                <signuplogin></signuplogin>
            </v-flex>
            <v-spacer v-if="this.$vuetify.breakpoint.lgAndUp"></v-spacer>
        </v-layout>
    </v-container>
</template>

<script>

import Signuplogin from './SignupLogin.vue'

export default {
    components: {
        Signuplogin
    },
}
</script>

<style scoped>
#side-sheet {
    background-color: #E6E6FA;
    height: 200px;
    display: table-cell;
    vertical-align: middle;
}

#text {
    color: black;
    font-size: 16px;
}
</style>
