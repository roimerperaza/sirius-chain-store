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

<script>
import { mapMutations } from "vuex";
import generalMixins from "../mixins/general";
import accountMixin from "../mixins/account";

export default {
  mixins: [generalMixins, accountMixin],
  data: () => ({
    sendingForm: false,
    configForm: null,
    isValidForm: false,
    username: "",
    password: ""
  }),
  created() {
    this.configForm = this.$utils.getConfigForm();
  },
  methods: {
    ...mapMutations(["SHOW_SNACKBAR", "SHOW_LOADING", "LOGIN"]),
    submit() {
      if (this.isValidForm) {
        this.sendingForm = true;
        this.SHOW_LOADING(true);
        setTimeout(() => {
          const userData = this.decrypt(this.username, this.password);
          if (userData) {
            this.$router.push("/home").catch(e => {});
            this.LOGIN(userData);
            this.emitEventForm(
              `Hi ${userData.name}, welcome!`,
              "success",
              false
            );
            this.$router.push("/home").catch(e => {});
          } else {
            this.emitEventForm(
              "Invalid username or password",
              "errorIntense",
              false
            );
          }
        }, 1000);
      }
    },
    emitEventForm(text, color, status) {
      this.sendingForm = false;
      this.SHOW_LOADING(status);
      this.SHOW_SNACKBAR({
        snackbar: true,
        text: text,
        color: color
      });
    },
    reset() {
      this.sendingForm = false;
      this.$refs.form.reset();
    }
  }
};
</script>