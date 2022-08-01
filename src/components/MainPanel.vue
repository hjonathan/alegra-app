<template>
  <div class="pt-16">
    <v-img
      class="white--text mx-16"
      height="250px"
      src="https://template.hasthemes.com/tm/resta/resta/images/bg/breadcrubs.jpg"
    >
      <v-card
        class="d-flex align-center justify-center mt-6 fill-height"
        color="transparent"
        elevation="0"
      >
        <v-row align="center" justify="center" class="pt-16">
          <v-col class="text-center" cols="12">
            <h1 class="text-h4 font-weight-thin mb-4">Imagenes del Mundo</h1>
            <!--h4 class="subheading">Build your application today!</h4-->
            <v-row>
              <v-col cols="4"></v-col>
              <v-col cols="4"> <SearchText /></v-col>
              <v-col cols="4"></v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-img>
    <v-container class="px-16">
      <v-card class="mx-auto" elevation="0">
        <v-row class="pt-0">
          <v-col class="d-flex text-center">
            <v-row class="text-center">
              <v-col>
                <v-row>
                  <v-col> </v-col>
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
  </div>
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
<style scoped>
.img-world {
  font-size: 2rem !important;
}
</style>
