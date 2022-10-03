<template>
  <v-layout column>
    <v-flex>
      <div class = "white elevation-2">
        <v-toolbar flat dense color="deep-purple accent-4" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2" >
          <form>
            <input type ="email" name = "email" placeholder="email" v-model="email"/>
            <br>
            <input type ="password" name = "password" placeholder="Password" v-model="password"/>
            <br>
            <div >{{error}}</div>
            <v-btn color="deep-purple accent-4" @click="login" dark>submit</v-btn>
          </form>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setRefreshToken', response.data.refreshToken)
        this.$store.dispatch('setAccessToken', response.data.accessToken)
        this.$store.dispatch('setUser', response.data.user)
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
  /* eslint-disable */
</style>
