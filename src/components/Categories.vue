<template>
  <div id="categories">
    <v-toolbar dark dense color="primary">
      <v-toolbar-title class="ml-45 mr-5 subtitle-1 font-weight-medium">Categories</v-toolbar-title>
      <template v-for="(category, key) of categories">
        <v-menu
          :key="key"
          :disabled="disabled"
          :absolute="absolute"
          :open-on-hover="openOnHover"
          :close-on-click="closeOnClick"
          :close-on-content-click="closeOnContentClick"
          :offset-x="offsetX"
          :offset-y="offsetY"
        >
          <template v-slot:activator="{ on }">
            <div class="my-2 mr-3">
              <v-btn outlined text small v-on="on">{{category.text}}</v-btn>
            </div>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in category.items" :key="index">
              <v-list-item-title class="font-weight-light caption">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-feature-search-outline</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: [
      {
        text: "Accesories",
        items: [
          { title: "Click Me" },
          { title: "Click Me" },
          { title: "Click Me" },
          { title: "Click Me 2" }
        ]
      },
      {
        text: "smartphone",
        items: [
          { title: "Click Me" },
          { title: "Click Me" },
          { title: "Click Me" },
          { title: "Click Me 2" }
        ]
      },
      {
        text: "Laptop",
        items: [
          { title: "Click Me" },
          { title: "Click Me" },
          { title: "Click Me" },
          { title: "Click Me 2" }
        ]
      },
      {
        text: "Smart TV",
        items: [
          { title: "Click Me" },
          { title: "Click Me" },
          { title: "Click Me" },
          { title: "Click Me 2" }
        ]
      }
    ],
    disabled: false,
    absolute: false,
    openOnHover: false,
    value: false,
    closeOnClick: true,
    closeOnContentClick: true,
    offsetX: false,
    offsetY: true
  })
};
</script>


<style lang="scss">
#categories {
  .ml-45 {
    margin-left: 45px;
  }
}
</style>
