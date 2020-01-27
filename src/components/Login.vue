<template>
  <div>
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

    <template v-else>
      <scan-qr-code :qrCode="qrCode" :infoQrCode="infoQrCode">
        <template slot="body">
          <v-col cols="12" sm="10" md="9" lg="8" class="pt-0 mx-auto">
            <div class="text-center">
              <v-sheet color="grey lighten-3">
                <v-progress-circular class="ma-2" width="2" size="15" indeterminate color="primary"></v-progress-circular> &nbsp;Waiting for you to scan
              </v-sheet>
            </div>
          </v-col>
        </template>
      </scan-qr-code>
    </template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import generalMixins from '../mixins/general'
import accountMixin from '../mixins/account'

export default {
  mixins: [generalMixins, accountMixin],
  data: () => ({
    username: '',
    password: '',
    configForm: null,
    isValidForm: false,
    sendingForm: false,
    showQRCode: false,
    qrCode: '',
    infoQrCode: 'Use the SiriusID app to scan the QR code to log in'
  }),
  created() {
    this.configForm = this.getConfigForm()
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
          const userData = this.decrypt(this.username, this.password)
          if (userData) {
            this.SHOW_LOADING(false)
            console.log('userData', userData)
            if (userData.integrateSSI) {
              this.qrCode = await this.$store.dispatch('siriusIDStore/createLoginMessage')
              this.showQRCode = true
            } else {
              this.LOGIN(userData)
              this.emitEventForm(`Hi ${userData.name}, welcome!`, 'success')
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
      this.sendingForm = false
      this.$refs.form.reset()
    }
  }
}
</script>