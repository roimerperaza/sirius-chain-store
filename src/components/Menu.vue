<template>
  <div>
    <!-- Navigation panel -->
    <template v-if="isLogged">
      <v-navigation-drawer temporary dark v-model="drawer" app mobile-break-point="1024">
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
          <template v-for="link in getLinks">
            <v-list-item :key="link.title" router :to="link.route" @click.stop="drawer = !drawer">
              <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ link.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>

        <template v-slot:append>
          <div class="grey darken-4 text-center pa-2">
            <span class="white--text">v0.1.1</span>
          </div>
        </template>
      </v-navigation-drawer>
    </template>

    <!-- Toolbar -->
    <v-app-bar dark app dense id="menu">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="isLogged"></v-app-bar-nav-icon>
      <v-toolbar-title>{{pseudonymApp}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-for="(item, key) of getItemsAppBar">
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
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    drawer: false,
    links: [
      {
        title: 'Home',
        icon: 'mdi-view-dashboard',
        route: '/home',
        role: 1
      },
      {
        title: 'Profile',
        icon: 'mdi-account',
        route: '/profile/account',
        role: 1
      }
    ],
    itemsAppBar: [
      {
        id: 'my-cart',
        text: 'My Cart',
        icon: 'mdi-cart',
        action: '',
        badge: true,
        badgeNumber: '6',
        role: 1
      },
      {
        id: 'my-account',
        text: 'My Account',
        icon: 'mdi-account',
        action: 'authDialog',
        badge: false,
        role: 0
      }
    ]
  }),
  methods: {
    ...mapActions('accountStore', ['LOGOUT']),
    action(type) {
      switch (type) {
        case 'authDialog':
          this.$emit('showDialog', true)
          break
        default:
          break
      }
    },
    goToHome() {
      this.LOGOUT(null)
      this.$router.push('/auth').catch(e => {})
    },
    buildRole(array) {
      const items = []
      array.forEach(element => {
        if (element.role === 1 && this.isLogged) {
          items.push(element)
        } else if (element.role === 0 && !this.isLogged) {
          items.push(element)
        }
      })

      return items
    }
  },
  computed: {
    ...mapGetters(['pseudonymApp']),
    ...mapGetters('accountStore', ['isLogged', 'userData']),
    getVersion() {
      return `v${this.$environment.version}`
    },
    getLinks() {
      return this.buildRole(this.links)
    },
    getItemsAppBar() {
      return this.buildRole(this.itemsAppBar)
    }
  }
}
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