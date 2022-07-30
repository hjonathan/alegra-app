<template>
  <v-navigation-drawer
    class="v-sellers"
    v-model="drawer"
    absolute
    :mini-variant.sync="mini"
  >
    <v-card
      class="d-flex"
      color="lighten-2"
      elevation="0"
    >
      <v-avatar>
        <img
          src="https://i.pinimg.com/originals/73/7c/6a/737c6a8aabb692128609f9d7d5c5c8c0.png"
          alt="John"
        />
      </v-avatar>


    </v-card>

    <v-list dense>
      <v-subheader v-text="'Vendedores'"></v-subheader>
      <template v-for="(item, index) in items">
        <v-list-item :key="item.title" class="ml-0 pl-2">
          <v-list-item-avatar>
            <v-img :src="item.avatar" width="20"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>
            <v-list-item-subtitle
              v-html="item.observations + '  ' + item.identification"
            ></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-chip small class="ma-2" color="white" text-color="white">
              <v-avatar
                left
                :class="item.sales >= 20 ? 'green' : 'red darken-1'"
              >
                {{ item.sales }}
              </v-avatar>
            </v-chip>
          </v-list-item-action>
        </v-list-item>
        <v-divider :inset="true" :key="index"></v-divider>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api";
import { useSellers } from "../store/sellers";
const SellersList = defineComponent({
  name: "SellersList",
  setup() {
    const sellers = useSellers();

    let items = computed(() => sellers.getSellers);
    return {
      items,
      drawer: true,

      mini: true,
    };
  },
});
export default SellersList;
</script>
<style>
.v-sellers {
  padding-top: 128px !important;
}

.v-sellers > .v-navigation-drawer__content::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: #f5f5f5;
}

.v-sellers > .v-navigation-drawer__content::-webkit-scrollbar {
  width: 4px;
  background-color: #f5f5f5;
}

.v-sellers > .v-navigation-drawer__content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}
</style>
