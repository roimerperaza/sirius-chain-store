import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    options: {
      customProperties: true,
      minifyTheme: function (css) {
        return process.env.NODE_ENV === 'production'
          ? css.replace(/[\r\n|\r|\n]/g, '')
          : css
      }
    },
    themes: {
      light: {
        primary: "#4285F4",
        secondary: '#424242',
        accent: '#82B1FF',
        error: colors.red.darken1,
        errorIntense: colors.red.darken1,
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        fantasy: '#272262',
        dacota: "#8a4f53",
        terra: "#e53935"
      },
      dark: {
        primary: colors.indigo.lighten5,
        secondary: '#424242',
        accent: '#82B1FF',
        error: colors.orange,
        errorIntense: colors.red.darken1,
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        fantasy: colors.teal,
        dacota: "#8a4f53",
        terra: "#e53935"
      }
    }
  },
});