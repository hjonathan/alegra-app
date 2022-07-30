<template>
  <v-container class="pt-16">
    <v-card>
      <v-row class="pt-0">
 
        <v-col class="d-flex text-center">
          <v-row class="text-center">
            <v-col cols="12">
              <v-img
                :src="require('../assets/logo.svg')"
                class="my-3"
                contain
                height="70"
              />
              <h1 class="display-1 font-weight-bold">Welcome to Vuetify</h1>

              <p class="subheading font-weight-regular">
                For help and collaboration with other Vuetify developers,
                <br />please join our online
                <a href="https://community.vuetifyjs.com" target="_blank"
                  >Discord Community</a
                >
              </p>
              <v-row>
                <v-col>
                  <SearchText />
                </v-col>
              </v-row>
              <v-row>
                <GoogleImagesList />
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { defineComponent, onMounted } from "@vue/composition-api";
import GoogleImagesList from "./GoogleImagesList.vue";
import SearchText from "./SearchText.vue";
import { useSellers } from "../store/sellers";
const MainPanel = defineComponent({
  name: "MainPanel",
  components: {
    SearchText,
    GoogleImagesList,
  },
  setup() {
    const sellers = useSellers();
    onMounted(() => {
      sellers.getSellersAPI();
    });
    return {};
  },
});
export default MainPanel;
</script>
