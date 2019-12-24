<template>
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
                @keyup="deleteSpaces()"
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

<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({
    sendingForm: false,
    configForm: null,
    isValidForm: false,
    username: "",
    password: ""
  }),
  methods: {
    ...mapMutations(["SHOW_SNACKBAR", "SHOW_LOADING", "LOGIN"]),
    deleteSpaces() {
      if (this.username) {
        this.username = this.username.replace(/ /g, "");
      }
    },
    submit() {
      if (this.isValidForm) {
        this.sendingForm = true;
        this.SHOW_LOADING(true);
        setTimeout(() => {
          const login = this.$storage.login(this.username, this.password);
          if (login) {
            this.sendingForm = false;
            this.SHOW_LOADING(false);
            this.LOGIN(login);
            this.SHOW_SNACKBAR({snackbar: true, text: `Hi ${login.name}, welcome!`, color: 'success'});
            this.$router.push("/home").catch(e => {});
          } else {
            this.sendingForm = false;
            this.SHOW_LOADING(false);
            this.SHOW_SNACKBAR({snackbar: true, text: 'Invalid username or password', color: 'errorIntense'});
            this.$router.push("/home").catch(e => {});
          }
        }, 1500);
      }
    },
    reset() {
      this.sendingForm = false;
      this.$refs.form.reset();
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