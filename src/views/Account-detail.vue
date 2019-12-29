<template>
  <div>
    <v-row>
      <v-col cols="12">
        <div class="font-weight-medium mb-2">General Info</div>
        <template v-for="(data, i) in dataUser">
          <div :key="i" v-if="dataUser[i] !== ''">
            <v-row class="mt-2">
              <v-col cols="12" sm="4" md="2" class="pt-0 pb-0 d-flex align-center">
                <span class="body-2">{{i}}:</span>
              </v-col>
              <v-col cols="12" sm="8" md="10" class="pt-0 pb-0 d-flex align-center">
                <span class="font-regular caption">{{dataUser[i]}}</span>
              </v-col>
            </v-row>
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
        Address: this.$blockchainProvider.createFromRawAddress(this.address).pretty(),
        "User name": this.userData.username,
        Name: this.userData.name,
        "Last name": this.userData.lastname,
        Email: this.userData.email,
        "Date of birth": "",
        "Country": "Venezuela"
      };
    }
  },
  created() {
    console.log(this.userData);
  }
};
</script>