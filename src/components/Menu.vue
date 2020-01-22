<template>
  <div>
    <!-- Navigation Drawer -->
    <!-- <v-navigation-drawer v-model="drawer" absolute temporary app mini-variant> -->

    <v-navigation-drawer dark v-model="drawer" app mobile-break-point="1024">
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Roimer Peraza</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="link in links"
          :key="link.title"
          router
          :to="link.route"
          @click.stop="drawer = !drawer"
        >
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
          <span class="white--text">v0.1.1</span>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-app-bar app dense dark id="menu">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-avatar>
        <img :src="require(`@/assets/pay.png`)"/>
      </v-avatar>-->
      <v-toolbar-title>{{pseudonymApp}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on" @click="goToHome">
            <v-badge icon dark overlap top color="red">
              <span slot="badge">6</span>
              <v-avatar id="my-cart">
                <v-btn icon dark>
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
              </v-avatar>
            </v-badge>
          </v-btn>
        </template>
        <span>My Cart</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on" @click="goToHome">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <span>My Account</span>
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


<style lang="scss">
#menu {
  .v-badge__badge {
    padding: 0 !important;
    font-size: 11px !important;
    height: 14px !important;
    min-width: 15px !important;
    right: 0px !important;
  }

  #my-cart {
    height: 20px !important;
    min-width: 48px !important;
    width: 48px !important;
  }
}
</style>