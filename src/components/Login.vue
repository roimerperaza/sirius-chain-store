<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="9" class="mx-auto">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model.trim="user"
                :rules="userRules"
                :counter="10"
                label="Username"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model.trim="password"
                :append-icon="passwordRules.show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.rules.required, passwordRules.rules.min, passwordRules.rules.max]"
                :type="passwordRules.show ? 'text' : 'password'"
                name="password"
                label="Password"
                hint="At least 8 characters"
                counter="20"
                @click:append="passwordRules.show = !passwordRules.show"
              ></v-text-field>
            </v-col>

            <v-col cols="8" class="mx-auto d-flex justify-center">
              <v-btn outlined color="secondary">Sign In</v-btn>
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
    valid: false,
    user: "",
    userRules: [
      v => !!v || "User is required",
      v => v.length <= 10 || "User must be less than 10 characters"
    ],
    password: "",
    passwordRules: {
      show: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        max: v => v.length <= 20 || "Max 20 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    }
  }),
  watch: {
    user() {
       this.user = this.user.replace(/ /g, "");
    }
  }
};
</script>