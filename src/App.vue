<template>
  <v-app>
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
      <v-list>
        <v-list-item
          :to="link.url"
          v-for="link of links"
          :key="link.title"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="link.title"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="isUserLoggedIn"
          @click="onLogout"
        >
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="'Logout'"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="blue" dark :app="true">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          class="pointer"
        >
          Ad aplication
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          text
          tile
          v-for="link of links"
          :to="link.url"
          height="100%"
          :key="link.title"
        >
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>

        <v-btn
          text
          tile
          height="100%"
          v-if="savedUserId || isUserLoggedIn"
          @click="onLogout"
        >
          <v-icon left>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <template v-if="error">
      <v-snackbar
        :color="error"
        :multi-line="true"
        :timeout="5000"
        :value="true"
        @input="closeError"
      >
        {{error}}
        <v-btn  color="red" dark text @click="closeError">
          Close
        </v-btn>
      </v-snackbar>
    </template>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    error () {
      // ловим проброс ошибки из user.js
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.savedUserId || this.isUserLoggedIn) {
        return [
          {
            title: 'Orders',
            icon: 'mdi-bookmark border',
            url: '/orders'
          },
          {
            title: 'New ad',
            icon: 'mdi-note add',
            url: '/new'
          },
          {
            title: 'My ads',
            icon: 'mdi-format-list-bulleted-type',
            url: '/list'
          }
        ]
      } else {
        return [
          {
            title: 'Login',
            icon: 'mdi-lock',
            url: '/login'
          },
          {
            title: 'Registration',
            icon: 'mdi-face',
            url: '/registration'
          }
        ]
      }
    },
    savedUserId () {
      return this.$store.getters.savedUserId
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  },
  data () {
    return {
      drawer: false
    }
  }
}
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
