<template>
  <div>
    <v-row>
      <v-col cols="11" class="mx-auto">
        <!-- Title General Info -->
        <template>
          <span class="font-weight-medium">General Info</span>
          <v-btn icon @click.stop="update = !update">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
        </template>

        <!-- Labels Info -->
        <template>
          <template v-for="(item, i) in dataUser">
            <div
              :key="i"
              v-if="item.value !== '' && item.value !== null && !update || (item.showInSignup && update)"
              class="mt-3"
            >
              <v-row>
                <v-col cols="6" sm="4" md="3" class="pt-0 pb-0  d-flex align-center">
                  <v-icon small>{{ item.icon }}</v-icon>
                  <span class="pl-2 body-2">{{item.label}}:</span>
                </v-col>
                <v-col cols="6" sm="8" md="9" class="pt-0 pb-0 d-flex align-center">
                  <span class="font-regular caption">{{item.value}}</span>
                  <template v-if="item.id === 'address'">
                    <v-btn icon @click.stop="doCopy(item.value)">
                      <v-icon small>mdi-content-copy</v-icon>
                    </v-btn>
                  </template>
                </v-col>
              </v-row>
            </div>
          </template>
        </template>

        <template v-if="update">
          <update class="mt-4" :actionUpdate="true"></update>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import generalMixins from "../mixins/general";

export default {
  mixins: [generalMixins],
  data: () => ({
    update: false
  }),
  computed: {
    ...mapGetters("accountStore", ["userData", "address"]),
    dataUser() {
      return [
        {
          id: "address",
          label: "Address",
          value: this.$blockchainProvider
            .createFromRawAddress(this.address)
            .pretty(),
          icon: "mdi-wallet-outline",
          showInSignup: true
        },
        {
          id: "username",
          label: "User name",
          value: this.userData.username,
          icon: "mdi-account-star-outline",
          showInSignup: true
        },
        {
          id: "name",
          label: "Name",
          value: this.userData.name,
          icon: "mdi-account-card-details-outline",
          showInSignup: false
        },
        {
          id: "lastname",
          label: "Last name",
          value: this.userData.lastname,
          icon: "mdi-account-card-details-outline",
          showInSignup: false
        },
        {
          id: "email",
          label: "Email",
          value: this.userData.email,
          icon: "mdi-at",
          showInSignup: false
        },
        {
          id: "dateBirth",
          label: "Date of birth",
          value: this.userData.dateBirth,
          icon: "mdi-party-popper",
          showInSignup: false
        },
        {
          id: "country",
          label: "Country",
          value:
            this.userData.country.state !== ""
              ? `${this.userData.country.state}, ${this.userData.country.code}`
              : "",
          icon: "mdi-home-outline",
          showInSignup: false
        }
      ];
    }
  },
  components: {
    update: () => import("@/components/Signup-update")
  }
};
</script>