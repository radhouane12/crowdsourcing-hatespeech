<template>
  <v-container>
    <v-layout row>
      <tweets-panel></tweets-panel>
    </v-layout>
    <v-dialog v-model="$store.state.auth.tutorial" persistent max-width="1200">
      <v-card>
        <v-card-title class="text-h5">
          Welcome to Combat Hate, please read the following guidelines before starting the labeling process !
        </v-card-title>
        <v-card-text style="font-size: 18px;">In order to annotate our data, we define the available labels as follows:
          <br>
          <strong>Hateful: </strong>tweet expresses hatred towards a targeted individual or group, or is intended
          to be derogatory, to humiliate, or to insult the
          members of the group, on the basis of attributes
          such as race, religion, ethnic origin, sexual orientation, disability, or gender.
          <br>
          <strong>Abusive: </strong>Any strongly impolite, rude or
          hurtful language using profanity, that can show a debasement of someone or something, or show intense
          emotion.
          <br>      
          <strong>Spam: </strong>Posts consisted of related or unrelated advertising
          / marketing, selling products of adult nature, linking to
          malicious websites, phishing attempts and other kinds of
          unwanted information, usually executed repeatedly.
          <br>
          <strong>Threat: </strong>Tweets that are violent in nature and pose a threat to the safety of an individual or a group.
          <br>
          <strong>Neutral: </strong>All tweets that do not fall in any of the other categories.
          <br>
          <strong>Additional Label:</strong> Label that you think describes the tweet better than any of the other labels and you suggest adding to the list of possible labels.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$store.state.auth.tutorial = false">
            I understand.
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import TweetsPanel from './TweetsPanel.vue'

export default {
  components: {
    TweetsPanel
  },
}
</script>

<style scoped>
</style>
