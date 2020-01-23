<template>
  <div id="dashboard">

    <!-- Carousel -->
    <my-carousel></my-carousel>

    <!-- Categories -->
    <categories></categories>

    <!-- Products -->
    <template v-if="config && config.length > 0">
      <products :products="config"></products>
    </template>
    
  </div>
</template>

<script>
import productsMixin from "../mixins/products";
export default {
  mixins: [productsMixin],
  async created() {
    this.config = await this.getProducts();
  },
  data: () => ({
    config: []
  }),
  methods: {},
  components: {
    "my-carousel": () => import("@/components/Carousel"),
    categories: () => import("@/components/Categories"),
    products: () => import("@/components/Products")
  }
};
</script>
