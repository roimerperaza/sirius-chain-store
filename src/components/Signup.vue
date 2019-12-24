<template>
  <v-form v-model="valid" ref="form">
    <v-container>
      <v-row>
        <v-col cols="9" class="mx-auto">
          <v-row>
            <!-- Name -->
            <v-col cols="12" md="6">
              <v-text-field
                color="fantasy"
                v-model.trim="formValue.name"
                required
                :minlength="configForm.name.min"
                :maxlength="configForm.name.max"
                :counter="configForm.name.max"
                :rules="[configForm.name.rules.required, configForm.name.rules.min, configForm.name.rules.max, configForm.generalRules.notAllowSpaces]"
                :label="configForm.name.label"
                @keyup="deleteSpaces('name')"
              ></v-text-field>
            </v-col>

            <!-- Lastname -->
            <v-col cols="12" md="6">
              <v-text-field
                color="fantasy"
                v-model.trim="formValue.lastname"
                :minlength="configForm.lastname.min"
                :maxlength="configForm.lastname.max"
                :counter="configForm.lastname.max"
                :rules="[configForm.lastname.rules.required, configForm.lastname.rules.min, configForm.lastname.rules.max, configForm.generalRules.notAllowSpaces]"
                :label="configForm.lastname.label"
                @keyup="deleteSpaces('lastname')"
              ></v-text-field>
            </v-col>

            <!-- Username -->
            <v-col cols="12" md="6">
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
                @keyup="deleteSpaces('username')"
              ></v-text-field>
            </v-col>

            <!-- Email -->
            <v-col cols="12" md="6">
              <v-text-field
                color="fantasy"
                v-model.trim="formValue.email"
                :maxlength="configForm.email.max"
                :counter="configForm.email.max"
                :rules="[configForm.email.rules.required, configForm.email.rules.max, configForm.email.rules.isValid, configForm.generalRules.notAllowSpaces]"
                :label="configForm.email.label"
                @keyup="deleteSpaces('email')"
              ></v-text-field>
            </v-col>

            <!-- Password -->
            <v-col cols="12" md="6">
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
            <v-col cols="12" md="6">
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
                  passwordConfirmationRule
                ]"
                :type="configForm.password.showConfirm ? 'text' : 'password'"
                :disabled="disabledConfirmPassword"
                @click:append="configForm.password.showConfirm = !configForm.password.showConfirm"
              ></v-text-field>
            </v-col>

            <!-- Button Cancel -->
            <v-col cols="8" sm="6" class="mx-auto d-flex justify-center justify-sm-end">
              <v-btn @click="reset" outlined color="fantasy">CANCEL</v-btn>
            </v-col>

            <!-- Button Register -->
            <v-col cols="8" sm="6" class="mx-auto d-flex justify-center justify-sm-start">
              <v-btn
                :loading="sendingForm"
                :disabled="!valid || sendingForm || searchingUser"
                outlined
                color="fantasy"
                @click="submit"
              >REGISTER</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    configForm: null,
    sendingForm: false,
    valid: false,
    searchingUser: false,
    userIsRepeat: false,
    formValue: {
      name: "",
      lastname: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: ""
    }
  }),
  computed: {
    disabledConfirmPassword() {
      const password = this.formValue.password;
      if (password) {
        if (password === "" || password.length < this.configForm.password.min) {
          this.formValue.confirmPassword = "";
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    passwordConfirmationRule() {
      return () =>
        this.$utils.isMatch(this.formValue.password, this.formValue.confirmPassword, "Password");
    }
  },
  methods: {
    deleteSpaces(input) {
      if (this.formValue[input]) {
        this.formValue[input] = this.formValue[input].replace(/ /g, "");
      }
    },
    submit() {
      this.sendingForm = true;
      setTimeout(() => {
        const save = this.$storage.saveUser(this.formValue);
        this.reset();
      }, 2500);
    },
    reset() {
      this.userIsRepeat = false;
      this.searchingUser = false;
      this.sendingForm = false;
      this.$refs.form.reset();
    },
    validateUsername() {
      const username = this.formValue.username;
      const validation = username && username !== "" && username.length >= this.configForm.username.min;
      if (validation) {
        this.searchingUser = true;
        setTimeout(() => {
          if (validation && this.$storage.getUserByUsername(username)) {
            this.searchingUser = false;
            this.userIsRepeat = `${username} already exists, try another user.`;
            return;
          }

          this.userIsRepeat = false;
          this.searchingUser = false;
        }, 1500);
      }
    }
  },
  watch: {
    "formValue.username"(newVal) {
      this.debouncedValidateUsername();
    }
  },
  created() {
    this.configForm = this.$utils.getConfigForm();
    this.debouncedValidateUsername = this.lodash.debounce(this.validateUsername, 500);
  }
};
</script>