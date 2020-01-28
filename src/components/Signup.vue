<template>
  <div>
    <template v-if="!showQrSignup">
      <v-form v-model="valid" ref="form">
        <v-container>
          <v-row>
            <!-- Name -->
            <v-col cols="12" sm="6">
              <v-text-field
                color="fantasy"
                v-model.trim="formValue.name"
                required
                :minlength="configForm.name.min"
                :maxlength="configForm.name.max"
                :counter="configForm.name.max"
                :rules="[configForm.name.rules.required, configForm.name.rules.min, configForm.name.rules.max, configForm.generalRules.notAllowSpaces]"
                :label="configForm.name.label"
                @keyup="formValue.name = removeSpaces(formValue.name)"
              ></v-text-field>
            </v-col>

            <!-- Lastname -->
            <v-col cols="12" sm="6">
              <v-text-field
                color="fantasy"
                v-model.trim="formValue.lastname"
                :minlength="configForm.lastname.min"
                :maxlength="configForm.lastname.max"
                :counter="configForm.lastname.max"
                :rules="[configForm.lastname.rules.required, configForm.lastname.rules.min, configForm.lastname.rules.max, configForm.generalRules.notAllowSpaces]"
                :label="configForm.lastname.label"
                @keyup="formValue.lastname = removeSpaces(formValue.lastname)"
              ></v-text-field>
            </v-col>

            <!-- Username -->
            <v-col cols="12" sm="6" v-if="!actionUpdate">
              <v-text-field
                color="fantasy"
                v-model.trim="formValue.username"
                :loading="searchingUser"
                :disabled="searchingUser"
                :minlength="configForm.username.min"
                :maxlength="configForm.username.max"
                :counter="configForm.username.max"
                :rules="[
                  configForm.username.rules.required, 
                  configForm.username.rules.min, 
                  configForm.username.rules.max, 
                  configForm.generalRules.notAllowSpaces,
                  userIsRepeat
                ]"
                :label="configForm.username.label"
                @keyup="formValue.username = removeSpaces(formValue.username)"
              ></v-text-field>
            </v-col>

            <!-- Email -->
            <v-col cols="12" sm="6" v-if="actionUpdate">
              <v-text-field
                color="fantasy"
                v-model.trim="formValue.email"
                :maxlength="configForm.email.max"
                :counter="configForm.email.max"
                :rules="[configForm.email.rules.required, configForm.email.rules.max, configForm.email.rules.isValid, configForm.generalRules.notAllowSpaces]"
                :label="configForm.email.label"
                @keyup="formValue.email = removeSpaces(formValue.email)"
              ></v-text-field>
            </v-col>

            <!-- Country -->
            <v-col cols="12" sm="6">
              <country :countrySelected="formValue.country" v-model="formValue.country"></country>
            </v-col>

            <!-- Integrate con SSI -->
            <v-col cols="12" class="d-flex justify-center">
              <v-checkbox v-model="formValue.integrateSSI" :label="`Integrate with SiriusID app`"></v-checkbox>
            </v-col>

            <!-- Password -->
            <v-col cols="12" sm="6" class="pt-0">
              <v-text-field
                color="fantasy"
                v-model="formValue.password"
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
              ></v-text-field>
            </v-col>

            <!-- Confirm Password -->
            <v-col cols="12" sm="6" class="pt-0" v-if="!actionUpdate">
              <v-text-field
                color="fantasy"
                name="confirmPassword"
                label="Confirm Password"
                hint="Confirm Password"
                v-model="formValue.confirmPassword"
                :append-icon="configForm.password.showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                :minlength="configForm.password.min"
                :maxlength="configForm.password.max"
                :counter="configForm.password.max"
                :rules="[
                  configForm.password.rules.required,
                  configForm.password.rules.min,
                  configForm.password.rules.max,
                  isMatch(formValue.password, formValue.confirmPassword, 'Password')
                ]"
                :type="configForm.password.showConfirm ? 'text' : 'password'"
                :disabled="disabledConfirmPassword"
                @click:append="configForm.password.showConfirm = !configForm.password.showConfirm"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Buttons -->
          <v-row>
            <!-- Button Cancel -->
            <v-col cols="8" sm="6" class="mx-auto d-flex justify-center justify-sm-end">
              <v-btn :disabled="sendingForm" @click="reset" outlined color="fantasy">CANCEL</v-btn>
            </v-col>

            <!-- Button Register -->
            <v-col cols="8" sm="6" class="mx-auto d-flex justify-center justify-sm-start">
              <v-btn
                :loading="sendingForm"
                :disabled="!valid || sendingForm || searchingUser"
                outlined
                color="fantasy"
                @click="submit"
              >{{actionLabel()}}</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>

    <template v-else>
      <scan-qr-code :qrCode="qrSignup" :sizeLg="'7'">
        <template slot="body">
          <v-row>
            <v-col cols="12" class="d-flex justify-center mb-0 pb-0">
              <v-checkbox
                class="mb-0"
                v-model="formValue.credentialCreated"
                :label="`I created my credential in SiriusID app`"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" class="d-flex justify-center mt-0 pt-0">
              <v-btn
                :disabled="!formValue.credentialCreated"
                outlined
                color="fantasy"
                @click="continueAction"
              >CONTINUE</v-btn>
            </v-col>
          </v-row>
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
  props: ['actionUpdate'],
  data: () => ({
    configForm: null,
    sendingForm: false,
    valid: false,
    searchingUser: false,
    userIsRepeat: false,
    qrSignup: '',
    showQrSignup: false,
    credentialCreated: false,
    formValue: {
      name: '',
      lastname: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      country: { state: '', code: '' },
      dateBirth: '',
      integrateSSI: false
    },
    infoQrCode: 'Use the SiriusID app to scan the QR code and create your credential'
  }),
  beforeMount() {
    this.configForm = this.getConfigForm()
    this.debouncedValidateUser = this.lodash.debounce(this.validateUser, 500)
    if (this.actionUpdate) {
      const userData = this.$store.getters['accountStore/userData']
      this.formValue.name = userData.name
      this.formValue.lastname = userData.lastname
      this.formValue.username = userData.username
      this.formValue.email = userData.email
      this.formValue.country = {
        state: userData.country.state,
        code: userData.country.code
      }
      this.formValue.dateBirth = userData.dateBirth
    }
  },
  components: {
    country: () => import('@/components/Country'),
    'scan-qr-code': () => import('@/components/ScanQRCode')
  },
  computed: {
    disabledConfirmPassword() {
      const password = this.formValue.password
      if (password) {
        if (password === '' || password.length < this.configForm.password.min) {
          this.formValue.confirmPassword = ''
          return true
        }
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapMutations('accountStore', ['UPDATE_DATA_USER']),
    ...mapMutations(['SHOW_SNACKBAR', 'SHOW_LOADING']),
    actionLabel() {
      return this.actionUpdate ? 'UPDATE' : 'REGISTER'
    },
    continueAction() {
      this.sendingForm = true
      this.SHOW_LOADING(true)
      setTimeout(async () => {
        this.qrSignup = ''
        const create = await this.createCredential(this.formValue, false)
        this.reset()
        this.showQrSignup = false
        this.SHOW_LOADING(false)
        if (create) {
          this.SHOW_SNACKBAR({
            snackbar: true,
            text: `Registered user successfully`,
            color: 'success'
          })
        } else {
          this.SHOW_SNACKBAR({
            snackbar: true,
            text: `Has ocurred a error`,
            color: 'error'
          })
        }
      }, 500)
    },
    submit() {
      this.sendingForm = true
      this.SHOW_LOADING(true)
      setTimeout(async () => {
        const create = await this.createCredential(this.formValue, this.formValue.integrateSSI)
        if (create) {
          if (create.qr) {
            this.showQrSignup = true
            this.qrSignup = create.qr
            this.SHOW_LOADING(false)
          } else {
            this.reset()
            this.showQrSignup = false
            this.SHOW_LOADING(false)
            this.SHOW_SNACKBAR({
              snackbar: true,
              text: `Registered user successfully`,
              color: 'success'
            })
          }
        } else {
          this.reset()
          this.showQrSignup = false
          this.SHOW_LOADING(false)
          this.SHOW_SNACKBAR({
            snackbar: true,
            text: `Has ocurred a error`,
            color: 'error'
          })
        }
      }, 500)
    },
    reset() {
      this.userIsRepeat = false
      this.searchingUser = false
      this.sendingForm = false
      if (this.$refs.form) {
        this.$refs.form.reset()
      }
      this.formValue = {
        name: '',
        lastname: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        country: { state: '', code: '' },
        dateBirth: '',
        integrateSSI: false
      }
    },
    validateUser() {
      const usr = this.formValue.username
      const min = this.configForm.username.min
      if (usr && usr !== '' && usr.length >= min) {
        this.searchingUser = true
        setTimeout(() => {
          if (this.getByUsername(usr)) {
            this.searchingUser = false
            this.userIsRepeat = `${usr} already exists, try another user.`
            return
          }

          this.userIsRepeat = false
          this.searchingUser = false
        }, 500)
      }
    }
  },
  watch: {
    'formValue.username'(newVal) {
      this.debouncedValidateUser()
    }
  }
}
</script>