<template>
    <div>
      <v-app-bar
        color="deep-purple accent-4"
        dense
        dark
      > 
        <v-toolbar-title>
          <span class = "home" @click="navigateTo({name: 'root'})">Platfrom for crowdsourcing hatespeech</span>
        </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            dark
            @click="navigateTo({name:'login'})">
            Login
          </v-btn>
          <v-btn
            outlined
            dark
            @click="navigateTo({name:'register'})">
            Sign up
          </v-btn>

      </v-app-bar>
    </div>
  </template>

<script>
export default {
    methods: {
      navigateTo (route) {
        this.$router.push(route)
      }
    }
}
</script>

<style scoped>
  .home{
    cursor: pointer;
  }
  .home:hover{
    color:aqua
  }
  /* eslint-disable */
</style>
  