<template>
  <div>
    <v-layout>
      <v-container>
        IS HOME <br>
        <v-btn @click="goToHome(true)">LOG OUT</v-btn> <br><br>
        <v-btn @click="goToHome(false)">GO TO LOGIN</v-btn>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
  }),
  methods: {
    ...mapActions(["LOGOUT"]),
    goToHome(logout) {
      if (logout) {
        this.LOGOUT(null)
      }

      
      this.$router.push('/auth').catch(e => {})
    }
  },
};
</script>
