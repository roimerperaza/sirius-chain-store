export default {
  methods: {
    getProducts() {
      return this.$store.getters['productsStore/getProducts']
    }
  }
}
