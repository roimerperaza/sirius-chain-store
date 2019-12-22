<template>
  <div style="display: flex; align-items: center; height: 100%;">
    <v-layout>
      <v-container>
        <v-card class="mx-auto">
          <v-container class="p-0">
            <v-row class="mx-auto">
              <v-col cols="12" sm="6" md="4" class="p-0">
                <v-carousel cycle :show-arrows="showArrows">
                  <v-carousel-item
                    v-for="(item,i) in 3"
                    :key="i"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                    class="carousel-login"
                  >
                    <div class="d-flex justify-center">
                      <img :src="require(`@/assets/img/login/step${item}.png`)" alt="Proximax Logo" />
                    </div>
                    <v-card-title class="white--text justify-center">Blockchain Store App</v-card-title>
                  </v-carousel-item>
                </v-carousel>
              </v-col>

              <!-- FORM -->
              <v-col cols="12" sm="6" md="8" class="p-0">
                <v-tabs
                  v-model="tab"
                  centered
                  icons-and-text
                  background-color="transparent"
                  color="deep-purple accent-4"
                >
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab href="#tab-1">Login</v-tab>
                  <v-tab href="#tab-2">Register</v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item background-color="transparent" value="tab-1">
                    <v-card flat color="transparent">
                      <login></login>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item value="tab-2">
                    <v-card flat color="transparent">
                      <sign-up></sign-up>
                    </v-card>
                  </v-tab-item>
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
import SignUp from '@/components/Signup'
import Login from '@/components/Login'

export default {
  data: () => ({
    showArrows: false,
    colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
    tab: null
  }),
  components: {
    "sign-up": SignUp,
    "login": Login
  }
};
</script>

<style scoped>
.p-0 {
  padding: 0 !important;
}

.carousel-login {
  background: #272262;
}
</style>
