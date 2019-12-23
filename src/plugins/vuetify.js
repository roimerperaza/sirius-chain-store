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
        primary: colors.indigo.lighten5,
        secondary: '#424242',
        accent: '#82B1FF',
        error: colors.red.darken1,
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        fantasy: '#272262'
      },
      dark: {
        primary: colors.grey.lighten4,
        secondary: '#424242',
        accent: colors.blue.lighten5,
        error: colors.orange,
        info: colors.blue.lighten5,
        success: colors.blue,
        warning: colors.blue.lighten5,
        fantasy: colors.teal
      }
    },
  },
});

/*
primary: '#ee44aa',
secondary: '#424242',
accent: '#82B1FF',
error: '#FF5252',
info: '#2196F3',
success: '#4CAF50',
warning: '#FFC107',
fantasy: '#272262'
*/

/*
primary: colors.indigo.darken1,
secondary: '#424242',
accent: '#82B1FF',
error: colors.red.darken1,
info: '#2196F3',
success: '#4CAF50',
warning: '#FFC107',
fantasy: '#272262'
*/