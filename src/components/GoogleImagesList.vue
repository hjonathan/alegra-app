<template>
  <v-row>
    <v-col
      v-for="(item, index) in items"
      :key="index"
      class="d-flex child-flex"
      cols="3"
    >
      <v-hover v-slot="{ hover }">
        <v-card
          :elevation="hover ? 12 : 2"
          :class="{ 'on-hover': !hover, 'ma-4': true, 'google-images': true }"
        >
          <v-img :src="getImage(item)" aspect-ratio="1" class="grey lighten-2">
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
                    <v-btn color="teal lighten-2" text> Explore </v-btn>

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
    </v-col>
  </v-row>
</template>

<script>
import { computed, defineComponent } from "@vue/composition-api";
import { useGoogleImages } from "../store/googleImages";
const GoogleImagesList = defineComponent({
  name: "GoogleImagesList",
  setup() {
    const googleImages = useGoogleImages();
    //AIzaSyA6w7qcirkA0EqaWnw89eM1UdAMTXfWY3Y
    let items = computed(() => googleImages.getImages);
    console.log(items);
    return {
      items,
      icons: ["mdi-rewind", "mdi-play", "mdi-fast-forward"],
      getImage: (item) => {
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
  opacity: 0.9;
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
