<template >
  <v-app>
    <!-- DIALOG -->
    <template v-if="dialog">
      <full-dialog
        :config="{name: 'Sirius Chain Store', 'btn': '', color: 'dark'}"
        :dialog="dialog"
        @dialog="dialog = $event"
      >
        <template slot="body">
          <auth></auth>
        </template>
      </full-dialog>
    </template>

    <!-- Menu -->
    <menu-item @showDialog="dialog = $event"></menu-item>

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
import { mapState, mapGetters } from 'vuex'
import webSocket from './mixins/WebSocket'

export default {
  name: 'App',
  mixins: [webSocket],
  data: () => ({
    dialog: false
  }),
  components: {
    auth: () => import('@/components/Auth'),
    'menu-item': () => import('@/components/Menu'),
    'full-dialog': () => import('@/components/Dialog')
  },
  computed: {
    ...mapState(['overlay', 'snackbar']),
    ...mapGetters('accountStore', ['isLogged'])
  },
  watch: {
    dialog: function(val) {
      document.querySelector('html').style.overflow = val ? 'hidden' : null
    }
  }
}
</script>

<style scoped>
.cursor-p {
  cursor: pointer;
}

.v-overlay {
  z-index: 5550 !important;
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