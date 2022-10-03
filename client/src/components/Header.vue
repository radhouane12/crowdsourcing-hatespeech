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
          <v-btn
            v-if="$store.state.auth.isUserLoggedIn"
            outlined
            dark
            @click="navigateTo({name: 'annotation'})">
            Annotate
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="!$store.state.auth.isUserLoggedIn"
            outlined
            dark
            @click="navigateTo({name: 'login'})">
            Login
          </v-btn>
          <v-btn
            v-if="!$store.state.auth.isUserLoggedIn"
            outlined
            dark
            @click="navigateTo({name: 'register'})">
            Sign up
          </v-btn>
          <v-btn
            v-if="$store.state.auth.isUserLoggedIn"
            outlined
            dark
            @click="logout">
            Logout
          </v-btn>
      </v-app-bar>
    </div>
  </template>

<script>
import AuthenticationService from '../services/AuthenticationService'

export default {
    methods: {
      navigateTo (route) {
        this.$router.push(route).catch(error => {
          if (error.name != "NavigationDuplicated") {
            throw error;
          }
        })
      },
      async logout () {
        try {
          const response = await AuthenticationService.logout(this.$store.state.auth.refreshToken)
          this.$store.dispatch('setRefreshToken', null)
          this.$store.dispatch('setAccessToken', null)
          this.$store.dispatch('setUser', null)
          this.$router.push({name: 'root'}).catch(error => {
            if (error.name != "NavigationDuplicated") {
              throw error;
            }
          })
        }
        catch (error){
          this.error = error
        }
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
  