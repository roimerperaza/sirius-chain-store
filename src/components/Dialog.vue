<template>
  <v-row justify="center" color="primary">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="h-100vh">
        <v-app-bar dark app dense :color="config.color">
          <v-btn icon dark @click="$emit('dialog', false)">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
          <v-toolbar-title>{{config.name}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items v-if="config.btn !== ''">
            <v-btn dark text @click="$emit('dialog', false)">{{config.btn}}</v-btn>
          </v-toolbar-items>
        </v-app-bar>
        <v-list three-line subheader class="h-100vh">
          <slot name="body" id="hiiii"></slot>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["dialog", "config"],
  beforeCreate() {
    document.getElementsByTagName("body")[0].className = "noscroll";
  },
  beforeDestroy() {
    document.body.removeAttribute("class", "noscroll");
  },
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false
    };
  }
};
</script>

<style lang="scss">
.noscroll {
  position: fixed;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>