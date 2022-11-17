<template>
    <v-container style="width: 75%" class="mt-n2">
        <v-card class="mx-auto" color="grey darken-1" elevation="1"  width="1200" >
            <v-row>
                <v-col>
                    <br>
                    <div class="ml-5 mt-n4" style="color:white;text-align: center;">
                        Combat Hate was built to assist researchers and practioners in the field of online hate speech
                        detection.
                        We Provide this platform to enable the crowdsourcing of data annotation, offering a way to engage the topic by labeling tweets that we have collected. Crowdsourcing has proven to be one of the most effective ways to reach relevant and robust hate speech related datasets. Our goal is to have a relevant and robust dataset that is relevant to use in the field.
                        <br>
                        Our approach is to gather target twitter data that contains terms that we think might be mentioned in hateful content. The terms we target are available on the platform and it's possible to modify and make suggestions.
                        <br>
                        If you wish to use our dataset or have any questions regarding the platform, contact us at: rhimi@campus.tu-berlin.de,
                        <br>
                        a.katsarou@tu-berlin.de 
                    </div>
                </v-col>
                <v-col>
                    <div class="mr-4 mt-1">
                        <img  :src="require('../assets/about.jpg')"
                        style="max-width: 100%; max-height: 100%; min-width: 100%; min-height: 100%;" />
                    </div> 
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
