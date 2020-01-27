<template>
  <v-layout>
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="10" class="mx-autos">
          <v-tabs
            v-model="tab"
            centered
            icons-and-text
            background-color="transparent"
            color="fantasy"
          >
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#tab-login">Login</v-tab>
            <v-tab href="#tab-register">Register</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <!-- Tab Login -->
            <v-tab-item background-color="transparent" value="tab-login">
              <login></login>
            </v-tab-item>

            <!-- Tab Signup -->
            <v-tab-item background-color="transparent" value="tab-register">
              <sign-up></sign-up>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  inject: ['theme'],
  data: () => ({
    nameApp: '',
    showArrows: false,
    tab: null,
    qrLogin: ''
  }),
  components: {
    'login': () => import('@/components/Login'),
    'sign-up': () => import('@/components/Signup')
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark
      const theme = this.$vuetify.theme.isDark
        ? this.$vuetify.theme.themes.dark
        : this.$vuetify.theme.themes.light
      this.$vuetify.theme.currentTheme = theme
    }
  },
  computed: {
    qrImageLogin() {
      return this.qrLogin !== '' ? '' + this.qrLogin : ''
    }
  },
  async beforeMount() {
    this.nameApp = this.$store.getters.nameApp
    // this.qrLogin = await this.$store.dispatch('siriusIDStore/createLoginMessage')
  }
}
</script>

<style scoped>
#box-landing-page {
  background: #a2ddea;
}

#landing-page {
  background-image: url('../assets/shop-online.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 250px;
  width: 250px;
}

.pointer {
  cursor: pointer;
}

.p-0 {
  padding: 0 !important;
}

.color-card-text {
  color: var(--v-primary-base);
}

.max-h-col-auth {
  overflow-y: auto;
}
</style>
