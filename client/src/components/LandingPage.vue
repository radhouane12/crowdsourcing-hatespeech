<template>
    <v-container class="my-10">
        <v-layout row>
            <v-flex xs12 md6>
                <v-sheet color="deep-purple" elevation="1" height="400" outlined rounded shaped>
                    <img :src="require('../assets/background.jpg')"
                        style="max-width: 100%; max-height: 100%; min-width: 100%; min-height: 100%;" />
                    <!-- <p class="my-3 mx-4" style="color:white">
                        This is a text about the platform
                    </p> -->
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

</style>
