<template>
  <div>
    <!-- Form -->
    <template v-if="!showQRCode">
      <v-form v-model="isValidForm" ref="form">
        <v-container>
          <v-row>
            <v-col cols="9" class="mx-auto">
              <v-row>
                <!-- Username -->
                <v-col cols="12">
                  <v-text-field
                    color="fantasy"
                    v-model.trim="username"
                    :minlength="configForm.username.min"
                    :maxlength="configForm.username.max"
                    :counter="configForm.username.max"
                    :rules="[
                      configForm.username.rules.required, 
                      configForm.username.rules.min, 
                      configForm.username.rules.max, 
                      configForm.generalRules.notAllowSpaces
                    ]"
                    :label="configForm.username.label"
                    @keyup="username = removeSpaces(username)"
                  ></v-text-field>
                </v-col>

                <!-- Password -->
                <v-col cols="12">
                  <v-text-field
                    color="fantasy"
                    v-model="password"
                    :append-icon="configForm.password.show ? 'mdi-eye' : 'mdi-eye-off'"
                    :minlength="configForm.password.min"
                    :maxlength="configForm.password.max"
                    :counter="configForm.password.max"
                    :rules="[
                      configForm.password.rules.required, 
                      configForm.password.rules.min, 
                      configForm.password.rules.max
                    ]"
                    :label="configForm.password.label"
                    :type="configForm.password.show ? 'text' : 'password'"
                    name="password"
                    hint
                    @click:append="configForm.password.show = !configForm.password.show"
                    @keyup.enter="submit"
                  ></v-text-field>
                </v-col>

                <!-- Button Cancel -->
                <v-col cols="8" sm="6" class="mx-auto d-flex justify-center justify-sm-end">
                  <v-btn :disabled="sendingForm" @click="reset" outlined color="fantasy">CANCEL</v-btn>
                </v-col>

                <!-- Button Login -->
                <v-col cols="8" sm="6" class="mx-auto d-flex justify-center justify-sm-start">
                  <v-btn
                    :loading="sendingForm"
                    :disabled="!isValidForm || sendingForm"
                    outlined
                    color="fantasy"
                    @click="submit"
                  >LOGIN</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>

    <!-- Waiting For you Scan -->
    <template v-else>
      <scan-qr-code :qrCode="qrCode" :sizeLg="'8'">
        <template slot="body">
          <v-row>
            <v-col cols="12" class="mx-auto">
              <span>{{infoQrCode}}</span>
              <v-sheet color="grey lighten-3 d-flex align-center justify-center">
                <v-progress-circular class="ma-2" width="2" size="12" indeterminate color="primary"></v-progress-circular>&nbsp;
                <span class="subtitle-2">Waiting for you to scan</span>
              </v-sheet>
            </v-col>
            <v-col cols="12" class="pt-0 mx-auto d-flex justify-center">
              <v-btn outlined color="fantasy" @click="reset">CANCEL</v-btn>
            </v-col>
          </v-row>
        </template>
      </scan-qr-code>
    </template>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import generalMixins from '../mixins/general'
import accountMixin from '../mixins/account'

export default {
  mixins: [generalMixins, accountMixin],
  data: () => ({
    ...mapState('accountStore', ['isLoggedFromSSID']),
    username: 'rperaza',
    password: '1qazxsw2',
    configForm: null,
    isValidForm: false,
    sendingForm: false,
    showQRCode: false,
    qrCode: '',
    infoQrCode: 'Use the SiriusID app to scan the QR code to log in',
    userData: null
  }),
  created() {
    this.configForm = this.getConfigForm()
  },
  beforeDestroy() {
    this.closeConection()
  },
  components: {
    'scan-qr-code': () => import('@/components/ScanQRCode')
  },
  methods: {
    ...mapMutations(['SHOW_SNACKBAR', 'SHOW_LOADING']),
    ...mapMutations('accountStore', ['LOGIN']),
    emitEventForm(text, color, status = false) {
      this.sendingForm = false
      this.SHOW_LOADING(status)
      this.SHOW_SNACKBAR({
        snackbar: true,
        text: text,
        color: color
      })
    },
    submit() {
      if (this.isValidForm) {
        this.sendingForm = true
        this.SHOW_LOADING(true)
        setTimeout(async () => {
          this.userData = this.decrypt(this.username, this.password)
          if (this.userData) {
            if (this.userData.integrateSSI) {
              this.qrCode = await this.buildQRCode()
              this.showQRCode = true
              this.SHOW_LOADING(false)
            } else {
              this.LOGIN(this.userData)
              this.emitEventForm(`Hi ${this.userData.name}, welcome!`, 'success')
            }
          } else {
            this.emitEventForm(
              'Combination of username and / or password is invalid.',
              'errorIntense'
            )
          }
        }, 500)
      }
    },
    reset() {
      this.closeConection()
      if (this.$refs.form) {
        this.$refs.form.reset()
      }

      this.username = ''
      this.password = ''
      this.qrCode = ''
      this.sendingForm = false
      this.showQRCode = false
      this.userData = null
    }
  },
  watch: {
    isLoggedFromSSID(newVal) {
      console.log('IS LOGGED CHANGED', newVal)
      this.LOGIN(this.userData)
      this.emitEventForm(`Hi ${this.userData.name}, welcome!`, 'success')
    }
  }
}
</script>