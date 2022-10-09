<template>
  <div>
    <v-app-bar color="deep-purple" dark fixed app>
      <div @click="navigateTo({name: 'landing'})">
        <img class="mr-3 mt-2 d-md home" :src="require('../assets/logo.png')" height="34" />
      </div>
      <v-spacer></v-spacer>
      <!-- Flags only if user is expert -->
      <div v-if="windowIsBigEnough">
        <v-btn v-if="$store.state.auth.testState" dark small contained depressed @click="quitTest">
          Quit Test
        </v-btn>
        <v-btn v-if="$store.state.auth.isUserLoggedIn && !$store.state.auth.testState" dark small text>
          Flags
        </v-btn>
        <v-btn v-if="$store.state.auth.isUserLoggedIn && !$store.state.auth.testState" dark small text class="ml-1"
          @click="navigateTo({name: 'annotation'})">
          Annotation
        </v-btn>
        <v-btn v-if="$store.state.auth.isUserLoggedIn && !$store.state.auth.testState" dark small text class="ml-1">
          Dictionaries
        </v-btn>
        <v-btn v-if="$store.state.auth.isUserLoggedIn && !$store.state.auth.testState" dark small class="ml-1" text>
          Statistics
        </v-btn>
        <v-btn v-if="!$store.state.auth.testState" dark small text class="ml-1">
          About
        </v-btn>
        <v-btn v-if="$store.state.auth.isUserLoggedIn && !$store.state.auth.testState" dark small contained depressed class="ml-5" @click="logout">
          Sign out
        </v-btn>
      </div>
      <v-menu bottom left v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="white" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="$store.state.auth.testState" @click="quitTest">
            <v-list-item-title>Quit Test</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.auth.isUserLoggedIn && !$store.state.auth.testState">
            <v-list-item-title>Flags</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.auth.isUserLoggedIn && !$store.state.auth.testState" @click="navigateTo({name: 'annotation'})">
            <v-list-item-title>Annotation</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.auth.isUserLoggedIn && !$store.state.auth.testState">
            <v-list-item-title>Dictionaries</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.auth.isUserLoggedIn && !$store.state.auth.testState">
            <v-list-item-title>Statistics</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!$store.state.auth.testState">
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.auth.isUserLoggedIn && !$store.state.auth.testState" @click="logout">
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'

export default {
  data() {
    return {
      windowWidth: window.innerWidth
    }
  },
  computed: {
    windowIsBigEnough() {
      return this.windowWidth > 948
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route).catch(error => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      })
    },
    async logout() {
      try {
        const response = await AuthenticationService.logout(this.$store.state.auth.refreshToken)
        this.$store.dispatch('setRefreshToken', null)
        this.$store.dispatch('setAccessToken', null)
        this.$store.dispatch('removeUser')
        this.$router.push({ name: 'landing' }).catch(error => {
          if (error.name != "NavigationDuplicated") {
            throw error;
          }
        })
      }
      catch (error) {
        this.error = error
      }
    },
    quitTest() {
      this.$store.dispatch('testState', false)
      this.$router.push({ name: 'annotation' }).catch(error => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      })
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  },
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
</style>
  