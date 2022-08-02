<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2"
      >Fotografias por vendedor
    </v-card-title>

    <v-card v-if="winner" class="pt-6 mx-auto" flat>
      <v-card-text class="text-center">
        <v-avatar v-if="winner.seller.avatar" size="50">
          <v-img :src="winner.seller.avatar" class=""></v-img>
        </v-avatar>
        <h3 class="text-h6">
          {{ winner.seller.name }}
        </h3>
        <h3 class="overline">
          {{ winner.seller.observations + "  " + winner.seller.identification }}
        </h3>
      </v-card-text>
      <v-divider></v-divider>
      <v-simple-table class="mx-16 pb-8">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left text-truncate"></th>
              <th class="text-left text-truncate">Fotografia</th>
              <th class="text-left text-truncate">URL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in winner.sales.photos" :key="index">
              <td>
                <v-avatar size="35" class="my-3 mr-2">
                  <v-img :src="getImage(item)"></v-img>
                </v-avatar>
              </td>

              <td>{{ item.title }}</td>
              <td>{{ getImage(item) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-card>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";

const SummarySeller = defineComponent({
  name: "SummarySeller",
  props: ["seller"],
  setup(props) {
    const winner = ref(props.seller);
    const pdf = ref(null);
    return {
      winner,
      pdf,
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
    };
  },
});
export default SummarySeller;
</script>
<style scoped>
.btn-search {
  height: 56px !important;
}
</style>
