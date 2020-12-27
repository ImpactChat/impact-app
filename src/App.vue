<template>
  <v-app>
    <v-app-bar app clipped-left color="blue accent-4" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon @click="$store.dispatch('preferences/toggleDarkMode')">
        <v-icon>{{
          $store.state.preferences.dark ? "brightness_4" : "brightness_7"
        }}</v-icon>
      </v-btn>

      <v-btn icon @click="logout">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app clipped v-model="drawer">
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <v-alert elevation="24" :type="alert.type" v-if="alert.message">
          {{ alert.message }}</v-alert
        >

        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>@tommcn</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  computed: {
    alert() {
      return this.$store.state.alert;
    }
  },
  watch: {
    $route(/* to, from */) {
      this.$store.dispatch("alert/clear");
    },
    group() {
      this.drawer = false;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push({ name: "Login" });
    }
  },

  data: () => ({
    drawer: false,
    items: [
      { title: "Home", icon: "home", link: "/" },
      // { title: "Chat", icon: "chat", link: "/chat" },
      // { title: "Notes", icon: "notes", link: "/notes" },
      { title: "Codes", icon: "code", link: "/codes" }
    ]
  })
});
</script>
