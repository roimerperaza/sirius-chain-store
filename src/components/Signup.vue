<template>
  <div>
    <v-img :src="qrImage" max-width="200" max-height="200"></v-img>
  </div>
</template>

<script>
export default {
  data: () => ({
    qrLogin: ""
  }),
  async beforeMount() {
    this.qrLogin = await this.$store.dispatch("siriusIDStore/createCredential");
  },
  components: {
  },
  computed: {
    qrImage() {
      return this.qrLogin !== "" ? "" + this.qrLogin : "";
    }
  },
  methods: {
  }
};
</script>