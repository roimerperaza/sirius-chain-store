<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="9" class="mx-auto">
          <v-row>
            <!-- Name -->
            <v-col cols="12" md="6">
              <v-text-field
                color="fantasy"
                v-model.trim="name"
                required
                :minlength="configForm.name.min"
                :maxlength="configForm.name.max"
                :counter="configForm.name.max"
                :rules="[configForm.name.rules.required, configForm.name.rules.min, configForm.name.rules.max]"
                :label="configForm.name.label"
              ></v-text-field>
            </v-col>

            <!-- Lastname -->
            <v-col cols="12" md="6">
              <v-text-field
                color="fantasy"
                v-model.trim="lastname"
                :minlength="configForm.lastname.min"
                :maxlength="configForm.lastname.max"
                :counter="configForm.lastname.max"
                :rules="[configForm.lastname.rules.required, configForm.lastname.rules.min, configForm.lastname.rules.max]"
                :label="configForm.lastname.label"
              ></v-text-field>
            </v-col>

            <!-- Username -->
            <v-col cols="12" md="6">
              <v-text-field
                color="fantasy"
                v-model.lazy.trim="username"
                :minlength="configForm.username.min"
                :maxlength="configForm.username.max"
                :counter="configForm.username.max"
                :rules="[configForm.username.rules.required, configForm.username.rules.min, configForm.username.rules.max]"
                :label="configForm.username.label"
              ></v-text-field>
            </v-col>

            <!-- Email -->
            <v-col cols="12" md="6">
              <v-text-field
                color="fantasy"
                v-model="email"
                :maxlength="configForm.email.max"
                :counter="configForm.email.max"
                :rules="[configForm.email.rules.required, configForm.email.rules.max, configForm.email.rules.isValid]"
                :label="configForm.email.label"
              ></v-text-field>
            </v-col>

            <!-- Password -->
            <v-col cols="12" md="6">
              <v-text-field
                color="fantasy"
                v-model.trim="password"
                :append-icon="configForm.password.show ? 'mdi-eye' : 'mdi-eye-off'"
                :maxlength="configForm.password.max"
                :counter="configForm.password.max"
                :rules="[configForm.password.rules.required, configForm.password.rules.min, configForm.password.rules.max]"
                :label="configForm.password.label"
                :type="configForm.password.show ? 'text' : 'password'"
                name="password"
                hint="Enter password"
                @click:append="configForm.password.show = !configForm.password.show"
              ></v-text-field>
            </v-col>

            <!-- Confirm Password -->
            <v-col cols="12" md="6">
              <v-text-field
                color="fantasy"
                v-model.trim="confirmPassword"
                :append-icon="configForm.password.showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                :maxlength="configForm.password.max"
                :counter="configForm.password.max"
                :rules="[configForm.password.rules.required, configForm.password.rules.min, configForm.password.rules.max, passwordConfirmationRule]"
                label="Confirm Password"
                :type="configForm.password.showConfirm ? 'text' : 'password'"
                name="confirmPassword"
                hint="Enter password"
                @click:append="configForm.password.showConfirm = !configForm.password.showConfirm"
              ></v-text-field>
            </v-col>

            <!-- Button Register -->
            <v-col cols="8" class="mx-auto d-flex justify-center">
              <v-btn :disabled="!valid" outlined color="fantasy">REGISTER</v-btn>
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
    valid: false,
    name: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: ""
  }),
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Password must match";
    }
  },
  watch: {
    user() {
      this.user = this.user.replace(/ /g, "");
    }
  },
  created() {
    this.configForm = this.$utils.getConfigForm();
  }
};
</script>