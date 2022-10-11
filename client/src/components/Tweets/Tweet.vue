<template>
  <v-card class="card" @mouseover="hover = true" @mouseleave="hover = false" hover outlined>
    <v-card-text>
      <span class="text-h8 text--primary">
        "{{passedTweet.tweet}}"
      </span>
      <br>
      <span class="grey--text" style="font-size:x-small;" v-if="hover || isOpened">Posted on
        {{passedTweet.created_at.slice(0,10)}},
        Assigned Category: {{passedTweet.category}}</span>
      <v-chip-group v-model="labels" column multiple v-if="hover || isOpened">
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
      <v-btn @click="skip" small outlined color="deep-purple">
        skip
      </v-btn>
      <v-btn small contained color="deep-purple" :disabled="!oneLabelSelected" @click="submit">
        <span style="color:#FFFFFF;">Submit</span>
      </v-btn>
      <v-menu :close-on-content-click="false" top left v-model="isOpened">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="deep-purple" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <v-list style="overflow-y: auto">
          <v-list-item dense @click ="flag('Tweet is not comprehensible')">
            <v-list-item-title>Tweet is not comprehensible</v-list-item-title>
          </v-list-item>
          <v-list-item dense @click ="flag('Tweet is not in English')">
            <v-list-item-title>Tweet is not in English</v-list-item-title>
          </v-list-item>
          <v-list-group no-action v-if="$store.state.auth.isExpert">
            <template v-slot:activator>
              <v-list-item dense>
                  <v-list-item-title>Assign to another category</v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item v-for="category in categories" :key="category" dense @click="addCategory(category)">
                <v-list-item-title>{{category}}</v-list-item-title>
            </v-list-item>
          </v-list-group>
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
      categories: ['Gender','Sexuality','Ethnicity','Religion','Race','Disability']
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
  },
  methods: {
    skip() {
      this.$emit('skipTweet', this.passedTweet._id)
    },
    submit() {
      var convertedLabels = this.labels.map(item=> item==0 ? 'Hateful' : item==1 ? 'Abusive' : item==2 ? 'Neutral' :item==3 ? 'spam' :item==4 ? 'Threat' :'')
      convertedLabels = convertedLabels.filter(Boolean);
      if (this.additionalLabel) convertedLabels.push(this.additionalLabel)
      this.$emit('submit', {'tweetId' :this.passedTweet._id, "labels": convertedLabels})
      this.additionalLabel = ''
      this.labels = null
    },
    flag(flag) {
      this.isOpened=false
      this.$emit('flagTweet', {'tweetId' :this.passedTweet._id, 'flag' : flag})
    },
    addCategory(category) {
      this.isOpened=false
      this.$emit('addCategory', {'tweetId':this.passedTweet._id, 'newCategory' : category})
    }
  }

}
</script>

<style>

</style>