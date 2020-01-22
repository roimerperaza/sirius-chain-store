<template>
  <div id="dashboard">
    <v-carousel cycle :show-arrows="false" class="white" style="width:100%; height: 300px">
      <template v-for="(item,i) in items">
        <v-carousel-item :src="require(`@/assets/store/${item.src}`)" :key="i">
          <v-row>
            <template v-if="item.content.text !== ''">
              <v-col cols="12" class="d-flex align-center justify-center">
                <span :class="item.content.class">Sale off 30% on every saturday!</span>
              </v-col>
            </template>
            <template v-if="item.button.text !== ''">
              <v-col cols="12" class="d-flex align-center justify-center">
                <v-chip class="ma-2" :color="item.button.color" text-color="white">
                  <v-avatar left v-if="item.button.icon !== ''">
                    <v-icon>{{item.button.icon}}</v-icon>
                  </v-avatar>
                  {{item.button.text}}
                </v-chip>
              </v-col>
            </template>
          </v-row>
        </v-carousel-item>
      </template>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data: () => ({
    carouselHeight: 0,
    items: [
      {
        src: "ecommerce1.jpg",
        content: {
          text: "Sale off 30% on every saturday!",
          class: "errorIntense--text display-2 font-weight-medium"
        },
        button: {
          text: "Read More",
          action: "",
          icon: "mdi-dots-horizontal-circle",
          class: "",
          color: "errorIntense"
        }
      },
      {
        src: "ecommerce2.jpg",
        content: {
          text: "Sale off 10% on every headphones!",
          class: "errorIntense--text display-2 font-weight-medium"
        },
        button: {
          text: "Read More",
          action: "",
          icon: "mdi-dots-horizontal-circle",
          class: "",
          color: "errorIntense"
        }
      },
      {
        src: "ecommerce3.jpg",
        content: {
          text: "Sale off 99  0% on every headphones!",
          class: "errorIntense--text display-2 font-weight-medium"
        },
        button: {
          text: "Read More",
          action: "",
          icon: "mdi-dots-horizontal-circle",
          class: "",
          color: "errorIntense"
        }
      }
    ]
  })
};
</script>

<style lang="scss">
#dashboard {
  .carousel {
    height: 200px !important;
  }

  .v-responsive {
    max-height: 300px !important;
  }
}
</style>
