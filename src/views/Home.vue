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
        <v-btn @click="goToHome(true)">LOG OUT</v-btn>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    address: ""
  }),
  created() {
    // console.log(this.dataUser);
    this.address =  this.$proximaxProvider.createFromRawAddress(this.dataUser.simpleWallet.address["address"])
  },
  computed: {
    ...mapState(["dataUser"])
  },
  methods: {
    ...mapActions(["LOGOUT"]),
    goToHome(logout) {
      if (logout) {
        this.LOGOUT(null);
      }

      this.$router.push("/auth").catch(e => {});
    }
  }
};
</script>
