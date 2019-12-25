<template >
  <v-app>
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
      <v-container style="height: 100%;">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>


<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "App",
  computed: {
    ...mapState(["overlay", "snackbar"])
  }
});
</script>
