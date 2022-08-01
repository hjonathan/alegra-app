<template>
  <v-app>
    <v-app-bar
      absolute
      color="white"
      prominent
      permanent
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      style="z-index: 200"
    >
      <v-card
        class="d-flex align-center mt-2"
        color="lighten-2 ml-16"
        elevation="0"
        height="100"
        width="50%"
      >
        <v-img
          alt="Vuetify Logo"
          class="shrink"
          contain
          src="https://i.pinimg.com/originals/73/7c/6a/737c6a8aabb692128609f9d7d5c5c8c0.png"
          transition="scale-transition"
          width="160"
        />
        <v-btn :disabled="loading" class="ma-1" color="grey" plain>
          HOME
        </v-btn>
        <v-btn :disabled="loading" class="ma-1" color="grey" plain>
          ABOUT
        </v-btn>
        <v-btn :disabled="loading" class="ma-1" color="grey" plain>
          CONTACT
        </v-btn>
      </v-card>
      <v-card
        class="d-flex align-center justify-end mt-2"
        color="lighten-2 mr-16"
        elevation="0"
        height="100"
        width="50%"
      >
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-card>
    </v-app-bar>
    <SellersList />

    <MainPanel class="mt-16" />
  </v-app>
</template>

<script>
import MainPanel from "./components/MainPanel.vue";
import SellersList from "./components/SellersList.vue";

export default {
  name: "App",

  components: {
    MainPanel,
    SellersList,
  },

  data: () => ({
    //
  }),
};
</script>
