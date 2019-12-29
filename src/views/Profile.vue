<template>
  <div class="mt-5">
    <v-layout>
      <v-container>
        <v-row>
          <v-col cols="11" md="10" class="mx-auto">
            <span class>Basic Info</span>
            <v-card class="pa-2 mt-2">
              <v-row>
                <v-col cols="4">
                  <v-list dense>
                    <v-list-item-group color="primary">
                      <v-list-item v-for="option in options" :key="option.id" router :to="option.route">
                        <v-list-item-icon>
                          <v-icon v-text="option.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title v-text="option.text"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>

                <v-col cols="8">
                  <router-view></router-view>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    showDetail: true,
    options: [
      { text: "Account", icon: "mdi-account", route: "/profile/account", id: 'account' },
      { text: "Home", icon: "mdi-home", route: "/profile/home", id: 'home' }
    ]
  })
};
</script>
