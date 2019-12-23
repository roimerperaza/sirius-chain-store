<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="9" class="mx-auto">
          <v-row>
            <!-- Username -->
            <v-col cols="12">
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

            <!-- Password -->
            <v-col cols="12">
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

            <!-- Button Register -->
            <v-col cols="8" class="mx-auto d-flex justify-center">
              <v-btn :disabled="!valid" outlined color="fantasy">LOGIN</v-btn>
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
    username: "",
    password: ""
  }),
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