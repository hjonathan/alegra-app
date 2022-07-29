<template>
  <v-card>
    <v-toolbar color="teal darken-2" dark>
      <v-toolbar-title>Vendedores</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <v-subheader v-text="'Vendedores'"></v-subheader>
      <template v-for="(item, index) in items">
        <v-list-item :key="item.title">
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>
            <v-list-item-subtitle
              v-html="item.observations + '  ' + item.identification"
            ></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-chip small class="ma-2" color="green" text-color="white">
              <v-avatar left class="green darken-2"> 0 </v-avatar>
              Points
            </v-chip>
          </v-list-item-action>
        </v-list-item>
        <v-divider :inset="true" :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api";
import { useSellers } from "../store/sellers";
const SellersList = defineComponent({
  name: "SellersList",
  setup() {
    const sellers = useSellers();

    let items = computed(() => sellers.getSellers);
    return { items };
  },
});
export default SellersList;
</script>
