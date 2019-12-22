<template dark>
  <v-app dark>
    <v-content :style="theme">
      <v-container style="height: 100%;">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    theme: "background-color: '#212121'"
  })
};
</script>
