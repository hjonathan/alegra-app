<template>
  <v-navigation-drawer
    class="v-sellers"
    v-model="drawer"
    absolute
    permanent
    @click="mini = !mini"
    :mini-variant.sync="mini"
    style="position: fixed"
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img
          src="https://i.pinimg.com/originals/73/7c/6a/737c6a8aabb692128609f9d7d5c5c8c0.png"
        ></v-img>
      </v-list-item-avatar>

      <v-list-item-title>Vendedores</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>
    <v-list-item-group v-model="selectedItem" color="warning">
      <v-list dense>
        <template v-for="(item, index) in items">
          <v-list-item :key="item.title" class="ml-0 pl-2">
            <v-badge
              offset-x="20"
              offset-y="50"
              :color="
                mini
                  ? item.sales.sales >= 20
                    ? 'green'
                    : 'red lighten-1'
                  : 'transparent'
              "
            >
              <template v-slot:badge v-if="mini">
                <span class="mt-1"> {{ item.sales.sales }}</span>
              </template>
              <v-avatar size="35" class="my-3 mr-2">
                <v-img :src="item.seller.avatar"></v-img>
              </v-avatar>
            </v-badge>

            <v-list-item-content>
              <v-list-item-title v-html="item.seller.name"></v-list-item-title>
              <v-list-item-subtitle
                v-html="
                  item.seller.observations + '  ' + item.seller.identification
                "
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-chip small class="ma-2" color="white" text-color="white">
                <v-avatar
                  left
                  :class="item.sales.sales >= 20 ? 'green' : 'red darken-1'"
                >
                  {{ item.sales.sales }}
                </v-avatar>
              </v-chip>
            </v-list-item-action>
          </v-list-item>
          <v-divider :inset="true" :key="index"></v-divider>
        </template>
      </v-list>
    </v-list-item-group>
  </v-navigation-drawer>
</template>

<script>
import { defineComponent, computed, ref, watch } from "@vue/composition-api";
import { useSales } from "../store/sales";
const SellersList = defineComponent({
  name: "SellersList",
  emits: ["updateSeller"],
  setup(props, context) {
    const sales = useSales();
    let items = computed(() => {
      let sels = sales.getSalesInformation;
      return sels;
    });
    let selectedItem = ref(null);
    let mini = ref(true);
    watch(selectedItem, (nVal) => {
      if (!mini.value) {
        context.emit("updateSeller", items.value[nVal]);
      }
    });
    watch(mini, (nVal) => {
      if (nVal == false) {
        selectedItem.value = null;
      }
    });

    return {
      items,
      drawer: true,
      mini,
      selectedItem,
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
