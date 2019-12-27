<template>
  <div>
    <v-layout>
      <v-container>
        Hi,
        <b>{{userData.username}}</b> your address is:
        <br />
        <b>{{getAddress.pretty()}}</b>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapGetters("authStore", ["userData", "address"]),
    getAddress() {
      return this.$blockchainProvider.createFromRawAddress(
        this.address
      );
    }
  }
};
</script>
