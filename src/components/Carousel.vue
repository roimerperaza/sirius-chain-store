<template>
  <div id="my-carousel">
    <v-carousel hide-delimiter-background cycle :show-arrows="false" class="white" style="width:100%; height: 250px">
      <template v-for="(item,i) in items">
        <v-carousel-item :src="require(`@/assets/store/${item.src}`)" :key="i">
          <v-row>
            <template v-if="item.content.text !== ''">
              <v-col cols="12" :class="'d-flex align-center pb-0 '+item.content.classBox">
                <span :class="item.content.class">{{item.content.text}}</span>
              </v-col>
              <v-col cols="12" :class="'d-flex align-center pt-0 '+item.content.classBox" v-if="item.content.text2 !== ''">
                <span :class="item.content.class2">{{item.content.text2}}</span>
              </v-col>
            </template>
            <template v-if="item.button.text !== ''">
              <v-col cols="12" class="d-flex align-center justify-center">
                <v-btn rounded class="ma-2" :color="item.button.color" text-color="white">
                  <v-icon class="mr-1">{{item.button.icon}}</v-icon>
                  {{item.button.text}}
                </v-btn>
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
          text2: "",
          classBox: "justify-center text-center",
          class: "mt-7 errorIntense--text display-2 font-weight-medium",
          class2: ""
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
          text2: "Tempora incidunt ut labore et dolore veritatis et quasi Previous",
          classBox: "justify-center text-center",
          class: "mt-7 dacota--text display-2 font-weight-medium",
          class2: "mb-0 secondary--text  font-weight-medium pt-1"
        },
        button: {
          text: "Read More",
          action: "",
          icon: "mdi-dots-horizontal-circle",
          class: "",
          color: "dacota"
        }
      },
      {
        src: "ecommerce3.jpg",
        content: {
          text: "Sale off 15% on every headphones!",
          text2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          classBox: "justify-end text-center",
          class: "mt-7 primary--text display-1 font-weight-medium mr-3",
          class2: "mb-0 white--text  font-weight-medium pt-1 mr-3"
        },
        button: {
          text: "",
          action: "",
          icon: "mdi-dots-horizontal-circle",
          class: "",
          color: "primary"
        }
      }
    ]
  })
};
</script>


<style lang="scss">
#my-carousel {
  .carousel {
    height: 200px !important;
  }

  .v-responsive {
    max-height: 250px !important;
  }
}
</style>
