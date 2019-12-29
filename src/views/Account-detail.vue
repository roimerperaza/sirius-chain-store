<template>
  <div>
    <v-row>
      <v-col cols="12">
        <template v-for="(data, i) in dataUser">
          <div :key="i" v-if="dataUser[i] !== ''">
            <span class="subtitle-1">{{i}}:</span>
            {{dataUser[i]}}
          </div>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapGetters("accountStore", ["userData", "address"]),
    dataUser() {
      return {
        "Address": this.$blockchainProvider
          .createFromRawAddress(this.address)
          .pretty(),
        Username: this.userData.username,
        Name: this.userData.name,
        Lastname: this.userData.lastname,
        Email: this.userData.email,
        "Fecha de nacimiento": "",
        "Phisical Address": "call"
      };
    }
  },
  created() {
    console.log(this.userData);
  }
};
</script>