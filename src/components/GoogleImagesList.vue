<template>
  <v-container>
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
            dense
            :elevation="hover ? 12 : 0"
            :class="{
              'on-hover': !hover,
              'pa-4': true,
              'google-images': true,
              'mx-auto': true,
            }"
          >
            <v-img :src="getImage(item)" aspect-ratio="1">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <div class="d-flex flex-column align-start">
              <span class="overline text-truncate col-12 px-0 py-0">
                {{ item.title }}
              </span>

              <span
                class="caption justify-start text-truncate col-12 px-0 py-0"
              >
                {{ item.formattedUrl }}
              </span>

              <div class="d-flex" style="width: 100%">
                <v-btn
                  color="orange lighten-2"
                  text
                  class="px-0"
                  v-if="!item.disabled"
                  @click="selectImage(item, index)"
                >
                  Agregar
                </v-btn>
                <v-spacer />
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-avatar size="30px" v-bind="attrs" v-on="on">
                      <img :src="getSellerAvatar(item)" alt="John" />
                    </v-avatar>
                  </template>
                  <span>{{ getSellerName(item) }}</span>
                </v-tooltip>
              </div>
            </div>
          </v-card>
        </v-hover>
      </v-card>
    </v-row>
    <v-row>
      <v-col v-if="items.length != 0">
        <v-btn text color="warning" @click="showMore">
          Mostrar mas
        </v-btn></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import { computed, defineComponent } from "@vue/composition-api";
import { useGoogleImages } from "../store/googleImages";
import { useSellers } from "../store/sellers";
import { useSales } from "../store/sales";

const GoogleImagesList = defineComponent({
  name: "GoogleImagesList",
  setup() {
    const googleImages = useGoogleImages();
    const sellers = useSellers();
    const sales = useSales();
    //AIzaSyA6w7qcirkA0EqaWnw89eM1UdAMTXfWY3Y
    let items = computed({
      get() {
        return googleImages.getImages;
      },
      set(images) {
        googleImages.setImages(images);
      },
    });
    return {
      items,
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
      getSellerAvatar(item) {
        let seller = sellers.getSeller(item.seller);
        return seller["avatar"];
      },
      getSellerName(item) {
        let seller = sellers.getSeller(item.seller);
        return seller["name"];
      },
      selectImage(image, index) {
        sales.addSale({
          idSeller: image.seller,
          photo: image,
        });
        items.value[index]["disabled"] = true;
      },
      showMore() {
        googleImages.getShowMore();
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
