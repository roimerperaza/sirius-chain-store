<template >
  <v-app >
    <v-content>
      <v-container style="height: 100%;">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({}),
  beforeCreate() {
    // console.log(this.lodash.random(20));
    console.log('Users ---> ', this.$storage.getAllUsers());
  }
};
</script>
