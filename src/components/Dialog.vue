<template>
  <v-row justify="center" :color="config.color">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark :color="config.color">
          <v-btn icon dark @click="$emit('dialog', false)">
             <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
          <v-toolbar-title>{{config.name}}</v-toolbar-title>
        </v-toolbar>
        <v-list three-line subheader>
          <slot name="body" id="hiiii"></slot>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['dialog', 'config'],
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false
    }
  }
}
</script>