<template>
  <div class="h-100vh">
    <v-layout class="h-100vh">
      <v-container fluid class="pb-0 pl-0 pr-0 pt-48">
        <v-row class="mx-auto h-100porcent">
          <!-- Carousel -->
          <v-col
            cols="12"
            sm="5"
            md="4"
            class="p-0 d-none d-sm-flex d-flex justify-center align-center"
            id="box-landing-page"
          >
            <div id="landing-page"></div>
          </v-col>

          <!-- FORM -->
          <v-col cols="12" sm="7" md="8" class="p-0 max-h-col-auth">
            <v-tabs
              v-model="tab"
              centered
              icons-and-text
              background-color="transparent"
              color="fantasy"
            >
              <v-tabs-slider></v-tabs-slider>
              <v-tab href="#tab-login">Login</v-tab>
              <v-tab href="#tab-register" @click="loadSignupQR">Register</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item background-color="transparent" value="tab-login">
                <v-card flat color="transparent">
                  <div class="d-flex align-center justify-center pt-9">
                    <v-img :src="qrImageLogin" max-width="200" max-height="200"></v-img>
                  </div>
                </v-card>
              </v-tab-item>

              <v-tab-item background-color="transparent" value="tab-register">
                <v-card flat color="transparent">
                  <div class="d-flex align-center justify-center pt-9">
                    <!-- <v-img :src="qrImageSignp" max-width="200" max-height="200"></v-img> -->
                    <sign-up></sign-up>
                  </div>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
export default {
  inject: ["theme"],
  data: () => ({
    nameApp: "",
    showArrows: false,
    tab: null,
    qrLogin: "",
    qrSignup: ""
  }),
  components: {
    "sign-up": () => import("@/components/Signup")
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
      const theme = this.$vuetify.theme.isDark
        ? this.$vuetify.theme.themes.dark
        : this.$vuetify.theme.themes.light;
      this.$vuetify.theme.currentTheme = theme;
    },
    async loadSignupQR() {
      if (this.qrSignup === "") {
        this.qrSignup = await this.$store.dispatch(
          "siriusIDStore/createCredential"
        );
      }
    }
  },
  computed: {
    qrImageLogin() {
      return this.qrLogin !== "" ? "" + this.qrLogin : "";
    },
    qrImageSignp() {
      return this.qrSignup !== "" ? "" + this.qrSignup : "";
    }
  },
  async beforeMount() {
    this.nameApp = this.$store.getters.nameApp;
    this.qrLogin = await this.$store.dispatch(
      "siriusIDStore/createLoginMessage"
    );
    this.$store.dispatch("siriusIDStore/initWebsocket");
  }
};
</script>

<style scoped>
#box-landing-page {
  background: #a2ddea;
}

#landing-page {
  background-image: url("../assets/shop-online.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 350px;
  width: 350px;
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
