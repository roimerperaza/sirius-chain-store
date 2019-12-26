<template>
  <div style="display: flex; align-items: center; height: 100%;">
    <v-layout>
      <v-container>
        <v-card class="mx-auto" >
          <v-container class="p-0">
            <v-row class="mx-auto">
              <!-- Carousel -->
              <v-col cols="12" sm="5" md="4" class="p-0 d-none d-sm-block">
                <v-carousel cycle :show-arrows="showArrows">
                  <v-carousel-item
                    v-for="(item,i) in 3"
                    :key="i"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                    class="fantasy"
                  >
                    <div class="d-flex justify-center">
                      <img :src="require(`@/assets/img/login/step${item}.png`)" alt="Proximax Logo" />
                    </div>
                    <v-card-title class="justify-center color-card-text">Blockchain Store App</v-card-title>
                  </v-carousel-item>
                </v-carousel>
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
                  <v-tab href="#tab-register">Register</v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item background-color="transparent" value="tab-login">
                    <v-card flat color="transparent">
                      <login></login>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item value="tab-register">
                    <v-card flat color="transparent">
                      <sign-up></sign-up>
                    </v-card>
                  </v-tab-item>

                  <!-- <div class="d-flex justify-center">
                    <span class="pointer" @click="changeTheme">Change Theme</span>
                  </div>-->
                </v-tabs-items>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import SignUp from "@/components/Signup";
import Login from "@/components/Login";
export default {
  inject: ["theme"],
  data: () => ({
    showArrows: false,
    tab: null
  }),
  components: {
    "sign-up": SignUp,
    login: Login
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
      const theme = this.$vuetify.theme.isDark
        ? this.$vuetify.theme.themes.dark
        : this.$vuetify.theme.themes.light;
      this.$vuetify.theme.currentTheme = theme;
    }
  }
};
</script>

<style scoped>
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
  max-height: 500px;
}
</style>
