<template>
  <div>
    <!-- Navigation Drawer -->
    <!-- <v-navigation-drawer v-model="drawer" absolute temporary app mini-variant> -->
    <v-navigation-drawer v-model="drawer" app mobile-break-point="1024">
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ userData.name }} {{ userData.lastname }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="link in links" :key="link.title" router :to="link.route" @click.stop="drawer = !drawer">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="grey darken-4 text-center pa-2">
          <span class="white--text">{{getVersion}}</span>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-app-bar app dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{pseudonymApp}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on" @click="goToHome">
            <v-icon>mdi-logout-variant</v-icon>
          </v-btn>
        </template>
        <span>Sign out</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: false,
    links: [
      { title: "Home", icon: "mdi-view-dashboard", route: "/home" },
      { title: "Profile", icon: "mdi-account", route: "/profile/account" }
    ]
  }),
  methods: {
    ...mapActions("accountStore", ["LOGOUT"]),
    goToHome() {
      this.LOGOUT(null);
      this.$router.push("/auth").catch(e => {});
    }
  },
  computed: {
    ...mapGetters(["pseudonymApp"]),
    ...mapGetters("accountStore", ["isLogged", "userData"]),
    getVersion() {
      return `v${this.$environment.version}`;
    }
  }
};
</script>