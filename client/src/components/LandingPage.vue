<template>
    <v-container class="my-10">
        <v-layout row>
            <v-flex xs12 md6>
                <v-sheet id="side-sheet" elevation="1" outlined rounded shaped>
                    <!-- <img :src="require('../assets/background.jpg')"
                        style="max-width: 100%; max-height: 100%; min-width: 100%; min-height: 100%;" /> -->
                    <div id="text" class="mx-6" style="color:white">
                        Combat Hate was built to ...
                    </div>
                </v-sheet>
            </v-flex>
            <v-flex></v-flex>
            <v-flex xs12 md5>
               <signuplogin></signuplogin>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import Signuplogin from './Signuplogin.vue'

export default {
    components: {
        Signuplogin
    },
}
</script>

<style scoped>
#side-sheet {
    background: linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)), url('../assets/background.jpg') no-repeat;
    background-size: 100% 100%;
    height: 300px;
    display: table-cell;
    vertical-align: middle;
}
</style>
