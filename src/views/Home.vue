<template>
  <div>
    <v-layout>
      <v-container>
        Hi,
        <b>{{dataUser.username}}</b> your address is:
        <br />
        <b>{{address.pretty()}}</b>
        <br />
        <br />
        <v-btn @click="goToHome(true)">LOG OUT</v-btn> <br> <br>
        <v-btn @click="changeName(true)">CAMBIAR NOMBRE DE USUARIO {{dataUser.name}}</v-btn>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  data: () => ({
  }),
  computed: {
    ...mapState("authStore", ["dataUser"]),
    address() {
      return this.$blockchainProvider.createFromRawAddress(this.$store.getters['authStore/address'])
    }
  },
  methods: {
    ...mapMutations("authStore", ["CHANGE_NAME_USER"]),
    ...mapActions("authStore", ["LOGOUT"]),
    changeName(){
      this.CHANGE_NAME_USER('RPERAZAAaaaa++++');
    },
    goToHome(logout) {
      if (logout) {
        this.LOGOUT(null);
      }

      this.$router.push("/auth").catch(e => {});
    }
  }
};
</script>
