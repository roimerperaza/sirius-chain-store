<template>
  <div>
    <!-- DIALOG -->
    <template v-if="dialog">
      <full-dialog
        :config="{name: 'Sirius Chain Store', 'btn': '', color: 'dark'}"
        :dialog="dialog"
        @dialog="dialog = $event"
      >
        <template slot="body">
          <auth></auth>
        </template>
      </full-dialog>
    </template>

    <!-- Navigation panel -->
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
    <v-app-bar dark app dense id="menu">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{pseudonymApp}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-for="(item, key) of itemsAppBar">
        <template>
          <v-tooltip bottom :key="key">
            <template v-slot:activator="{ on }">
              <v-btn icon dark v-on="on" @click="action(item.action)">
                <v-badge icon dark overlap top color="red" v-if="item.badge">
                  <span slot="badge">{{item.badgeNumber}}</span>
                  <v-avatar :id="item.id">
                    <v-btn icon dark>
                      <v-icon>{{item.icon}}</v-icon>
                    </v-btn>
                  </v-avatar>
                </v-badge>

                <v-icon v-else>{{item.icon}}</v-icon>
              </v-btn>
            </template>
            <span>{{item.text}}</span>
          </v-tooltip>
        </template>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    drawer: false,
    links: [
      { title: "Home", icon: "mdi-view-dashboard", route: "/home" },
      { title: "Profile", icon: "mdi-account", route: "/profile/account" }
    ],
    itemsAppBar: [
      {
        id: "my-cart",
        text: "My Cart",
        icon: "mdi-cart",
        action: "",
        badge: true,
        badgeNumber: "6"
      },
      {
        id: "my-account",
        text: "My Account",
        icon: "mdi-account",
        action: "authDialog",
        badge: false
      }
    ]
  }),
  methods: {
    ...mapActions("accountStore", ["LOGOUT"]),
    action(type) {
      switch (type) {
        case "authDialog":
          this.dialog = true;
          break;
        default:
          break;
      }
    },
    goToHome() {
      this.LOGOUT(null);
      this.$router.push("/auth").catch(e => {});
    }
  },
  components: {
    "full-dialog": () => import("@/components/Dialog"),
    auth: () => import("@/components/Auth")
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