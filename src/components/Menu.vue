<template>
  <div>
    <v-toolbar dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{pseudonymApp}}</v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" absolute temporary app>
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
        <v-list-item v-for="link in links" :key="link.title" router :to="link.route">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="goToHome()">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: false,
    links: [
      //   { title: "Auth", icon: "mdi-account", route: "/auth" },
      { title: "Home", icon: "mdi-view-dashboard", route: "/home" }
      //   { title: "Account", icon: "mdi-account", route: "/account" },
      //   { title: "Admin", icon: "mdi-gavel", route: "/admin" }
    ]
  }),
  methods: {
    ...mapActions("authStore", ["LOGOUT"]),
    goToHome() {
      this.LOGOUT(null);
      this.$router.push("/auth").catch(e => {});
    }
  },
  computed: {
    ...mapGetters(["pseudonymApp"]),
    ...mapGetters("authStore", ["isLogged", "userData"])
  }
};
</script>