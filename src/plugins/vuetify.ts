import Vue from 'vue';
//@ts-ignore
import Vuetify from 'vuetify/lib';
//@ts-ignore
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    options: {
      customProperties: true,
      minifyTheme: function (css: string) {
        return process.env.NODE_ENV === 'production' ? css.replace(/[\r\n|\r|\n]/g, '') : css
      }
    },
    themes: {
      light: {
        primary: colors.indigo.lighten5,
        secondary: '#424242',
        accent: '#82B1FF',
        error: colors.red.darken1,
        errorIntense: colors.red.darken1,
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        fantasy: '#272262'
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
        fantasy: colors.teal
      }
    },
  },
});



/**
light: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
},
**/