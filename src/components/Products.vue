<template>
  <div>
    <template v-for="(config, kk) of products">
      <v-container :key="kk" class="mt-10">
        <v-row>
          <v-col cols="12">
            <span class="text-left title font-weight-medium mb-0">{{config.title}}</span>
            <v-divider :class="config.classDivider"></v-divider>
          </v-col>
        </v-row>

        <v-row v-if="config && config.products">
          <template v-for="(item, key) of config.products">
            <v-col cols="12" sm="6" md="4" :key="key">
              <v-card class="mx-auto" max-width="350">
                <div class="d-flex justify-center">
                  <img width="230" :src="require(`@/assets/store/products/${item.image}`)" />
                </div>

                <v-card-title class="pb-0 font-weight-bold">{{item.title}}</v-card-title>
                <template v-for="(i, k) of config.chip">
                  <v-chip
                    class="ma-2 mt-0 mb-0 ml-3"
                    :color="i.color"
                    outlined
                    small
                    :key="k"
                  >{{i.name}}</v-chip>
                </template>

                <v-card-text class="pt-1">
                  <v-row align="center" class="mx-0">
                    <v-rating
                      :value="item.rating"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>
                    <div class="grey--text ml-4">{{item.rating}} ({{item.totalRating}})</div>
                  </v-row>

                  <v-divider class="my-4"></v-divider>

                  <div class="mt-2 line-h-1-02em d-flex align-center">
                    <img class="mr-1" width="18" :src="require(`@/assets/icon-usd-blue.svg`)" />
                    <span v-quantity="{q: item.usdAmount, coin: 'USD'}"></span>
                  </div>

                  <div class="line-h-1-02em pt-1 d-flex align-center">
                    <img class="mr-1" width="18" :src="require(`@/assets/icon-prx-xpx-green.svg`)" />
                    <span v-quantity="{q: item.xpxAmount, coin: 'XPX'}"></span>
                  </div>

                  <!-- <v-divider></v-divider> -->
                  <!-- <div>The iPad Pro 2018 is undoubtedly one of the most interesting technological achievements I've seen in many years, not only from Apple, but in general.</div> -->
                </v-card-text>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </template>
  </div>
</template>


<script>
export default {
  props: ["products"]
};
</script>

<style lang="scss" scoped>
.terra-divider {
  border: 2px solid #e53935 !important;
}

.primary-divider {
  border: 2px solid var(--v-primary-base) !important;
}
</style>