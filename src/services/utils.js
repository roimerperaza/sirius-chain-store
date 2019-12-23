export default class Utils {
  static getConfigForm() {
    return {
      username: {
        label: "Username",
        min: 4,
        max: 10,
        rules: {
          required: v => !!v || "Username is required",
          min: v =>
            v.length >= 4 || "Username must be less than 4 characters",
          max: v =>
            v.length <= 10 || "Username must be a maximum of 10 characters"
        }
      },
      name: {
        label: "Name",
        min: 3,
        max: 20,
        rules: {
          required: v => !!v || "Name is required",
          min: v => v.length >= 3 || "Name must be less than 3 characters",
          max: v =>
            v.length <= 20 || "Name must be a maximum of 20 characters"
        }
      },
      lastname: {
        label: "Lastname",
        min: 3,
        max: 20,
        rules: {
          required: v => !!v || "Last name is required",
          min: v =>
            v.length >= 3 || "Last name must be less than 3 characters",
          max: v =>
            v.length <= 20 || "Last name must be a maximum of 20 characters"
        }
      },
      password: {
        label: "Password",
        min: 5,
        max: 20,
        show: false,
        showConfirm: false,
        rules: {
          required: value => !!value || "Password is required",
          min: v =>
            v.length >= 5 || "Password must be less than 5 characters",
          max: v =>
            v.length <= 20 || "Password must be a maximum of 20 characters"
        }
      },
      email: {
        label: "Email",
        min: 5,
        max: 30,
        rules: {
          required: v => !!v || "E-mail is required",
          min: v => v.length >= 4 || "Email must be less than 5 characters",
          max: v =>
            v.length <= 10 || "Email must be a maximum of 30 characters",
          isValid: v => /.+@.+/.test(v) || "E-mail must be valid"
        }
      }
    }
  }
}
