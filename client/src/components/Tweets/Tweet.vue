<template>
  <v-card class="card" max-width="800" @mouseover="hover = true" @mouseleave="hover = false" hover outlined>
    <v-card-text>
      <span class="text-h8 text--primary">
        "{{passedTweet.tweet}}"
      </span>
      <br>
      <span class="grey--text" style="font-size:x-small;" v-if="hover || isOpened">Posted on {{passedTweet.created_at}},
        Assigned Category: {{passedTweet.Category}}</span>
      <v-chip-group v-model="labels" column multiple v-if="hover || isOpened">
        <v-chip filter outlined color="deep-purple">
          Hateful
        </v-chip>
        <v-chip filter outlined color="deep-purple">
          Abusive
        </v-chip>
        <v-chip filter outlined color="deep-purple">
          Normal
        </v-chip>
        <v-chip filter outlined color="deep-purple">
          Spam
        </v-chip>
        <v-chip filter outlined color="deep-purple">
          Threat
        </v-chip>
        <v-chip outlined :disabled="!oneLabelSelected" color="deep-purple">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <div class="textField">
                <v-text-field label="Additional label" v-bind="attrs" v-on="on" v-model="additionalLabel"
                  :disabled="!oneLabelSelected">
                  <!-- Disabled if no other chip is selected
                if text field full then select it, if not -->
                </v-text-field>
              </div>
            </template>
            <span>Optionally, you can add an additional label that you think describes this tweet</span>
          </v-tooltip>
        </v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-actions class="mt-n7" v-if="hover || isOpened">
      <v-spacer></v-spacer>
      <v-btn small outlined color="deep-purple">
        skip
      </v-btn>
      <v-btn small contained color="deep-purple" :disabled="!oneLabelSelected">
        <span style="color:#FFFFFF;">Submit</span>
      </v-btn>
      <v-menu top left v-model="isOpened">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="deep-purple" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Tweet is not comprehensible</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Tweet is not in English</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Assign to another category</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

  
<script>
export default {
  props: {
    passedTweet: Object
  },
  data() {
    return {
      additionalLabel: '',
      isOpened: false,
      hover: false,
      labels: null,
    }
  },
  computed: {
    oneLabelSelected() {
      if (this.labels) {
        if (this.labels.length > 0) {
          if (this.labels.length == 1) {
            if (this.labels[0] == 5) {
              this.additionalLabel = ''
              return false
            }
          }
          return true
        }
        this.additionalLabel = ''
        return false
      }
      this.additionalLabel = ''
      return false
    }
  }
}
</script>

<style>

</style>