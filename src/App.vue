<template >
  <v-app>
    <!-- Menu -->
    <menu-item v-if="isLogged"></menu-item>

    <!-- Overlay -->
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <!-- Message -->
    <v-snackbar
      v-model="snackbar.snackbar"
      :bottom="snackbar.y === 'bottom'"
      :top="snackbar.y === 'top'"
      :right="snackbar.x === 'right'"
      :left="snackbar.x === 'left'"
      :vertical="snackbar.mode === 'vertical'"
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}
      <v-btn dark text @click="snackbar.snackbar = false">Close</v-btn>
    </v-snackbar>

    <!-- Content -->
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.path"></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "App",
  data: () => ({}),
  components: {
    "menu-item": () => import("@/components/Menu")
  },
  computed: {
    ...mapState(["overlay", "snackbar"]),
    ...mapGetters("accountStore", ["isLogged"])
  }
};
</script>

<style scoped>
.cursor-p{
  cursor: pointer;
}
/*
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}*/
</style>