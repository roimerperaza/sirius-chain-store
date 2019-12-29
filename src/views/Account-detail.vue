<template>
  <div>
    <v-row>
      <v-col cols="11" class="mx-auto">
        <!-- Title General Info -->
        <template>
          <span class="font-weight-medium">General Info</span>
          <v-btn icon @click.stop="showSignup = !showSignup">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
        </template>

        <!-- Labels Info -->
        <template>
          <template v-for="(item, i) in dataUser">
            <div
              :key="i"
              v-if="item.value !== '' && item.value !== null && !showSignup || (item.showInSignup && showSignup)"
              class="mt-2"
            >
              <v-row>
                <v-col cols="6" sm="4" md="3" class="pt-0 pb-0">
                  <v-icon small>{{ item.icon }}</v-icon>
                  <span class="pl-2 body-2">{{item.label}}:</span>
                </v-col>
                <v-col cols="6" sm="8" md="9" class="pt-0 pb-0 d-flex align-center">
                  <span class="font-regular caption">{{item.value}}</span>
                </v-col>
              </v-row>
            </div>
          </template>
        </template>

        <template v-if="showSignup">
          <sign-up class="mt-4" :fromAuth="false"></sign-up>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    showSignup: false
  }),
  computed: {
    ...mapGetters("accountStore", ["userData", "address"]),
    dataUser() {
      return [
        {
          label: "Address",
          value: this.$blockchainProvider
            .createFromRawAddress(this.address)
            .pretty(),
          icon: "mdi-wallet-outline",
          showInSignup: true
        },
        {
          label: "User name",
          value: this.userData.username,
          icon: "mdi-account-star-outline",
          showInSignup: true
        },
        {
          label: "Name",
          value: this.userData.name,
          icon: "mdi-account-card-details-outline",
          showInSignup: false
        },
        {
          label: "Last name",
          value: this.userData.lastname,
          icon: "mdi-account-card-details-outline",
          showInSignup: false
        },
        {
          label: "Email",
          value: this.userData.email,
          icon: "mdi-account-card-details",
          showInSignup: false
        },
        {
          label: "Date of birth",
          value: this.userData.dateBirth,
          icon: "mdi-account-card-details",
          showInSignup: false
        },
        {
          label: "Country",
          value: this.userData.country,
          icon: "mdi-account-card-details",
          showInSignup: false
        }
      ];
    }
  },
  components: {
    "sign-up": () => import("@/components/Signup")
  },
  created() {
    console.log(this.userData);
  }
};
</script>