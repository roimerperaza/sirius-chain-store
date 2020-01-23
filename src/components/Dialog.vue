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
        <!-- <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Content filtering</v-list-item-title>
              <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
              <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="widgets"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
              <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>-->
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["dialog", "config"],
  beforeCreate() {
    console.log('created!')
    document.getElementsByTagName("body")[0].className = "noscroll";
  },
  beforeDestroy() {
    console.log('destroy!')
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