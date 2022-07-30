<template>
  <v-row>
    <v-card
      v-for="(item, index) in items"
      :key="index"
      class="d-flex child-flex"
      max-width="250"
      min-width="250"
      elevation="0"
    >
      <v-hover v-slot="{ hover }">
        <v-card
          :elevation="hover ? 12 : 0"
          :class="{ 'on-hover': !hover, 'ma-0': true, 'google-images': true }"
          @click="selectImage(item)"
        >
          <v-img
            :src="getImage(item)"
            aspect-ratio="1"
            class="grey lighten-2 ma-4"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>

            <div class="d-block" style="height: 60%"></div>
            <v-expand-transition>
              <div class="d-flex fill-height fill-width">
                <v-card
                  :class="{
                    'on-hover': hover,
                    'google-images-card': true,
                  }"
                >
                  <v-card-title class="caption text-truncate">
                    {{ item.title }}
                  </v-card-title>

                  <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

                  <v-card-actions>
                    <v-btn color="teal lighten-2" text> SELECCIONAR </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                      <v-icon>{{ "mdi-chevron-down" }}</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-expand-transition>
          </v-img>
        </v-card>
      </v-hover>
    </v-card>
  </v-row>
</template>

<script>
import { computed, defineComponent } from "@vue/composition-api";
import { useGoogleImages } from "../store/googleImages";
import { useSellers } from "../store/sellers";

const GoogleImagesList = defineComponent({
  name: "GoogleImagesList",
  setup() {
    const googleImages = useGoogleImages();
    const sellers = useSellers();
    //AIzaSyA6w7qcirkA0EqaWnw89eM1UdAMTXfWY3Y
    let items = computed(() => googleImages.getImages);
    console.log(items);
    return {
      items,
      icons: ["mdi-rewind", "mdi-play", "mdi-fast-forward"],
      getImage(item) {
        if (item.pagemap.cse_thumbnail?.[0].src) {
          return item.pagemap.cse_thumbnail?.[0].src;
        }
        if (item.pagemap.metatags?.[0]["og:image"]) {
          return item.pagemap.metatags?.[0]["og:image"];
        }
        if (item.pagemap.metatags?.[0]["msapplication-tileimage"]) {
          return item.pagemap.metatags?.[0]["msapplication-tileimage"];
        }
      },
      selectImage(image) {
        console.log(image);
        sellers.addSale(image.seller, 3);
      },
    };
  },
});
export default GoogleImagesList;
</script>
<style>
.v-card.google-images {
  transition: opacity 0.4s ease-in-out;
}

.v-card.google-images:not(.on-hover) {
  opacity: 0.7;
}

.v-card.google-images-card:not(.on-hover) {
  opacity: 0;
  transition: 0.5s;
}

.v-card.google-images-card {
  transition: 0.5s;
  width: 100%;
}

.show-btns {
  color: rgba(247, 7, 7, 0) !important;
}
</style>
