<template>
  <v-app>
    <v-app-bar
      absolute
      color="white"
      prominent
      permanent
      style="z-index: 200; position: fixed"
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
        <v-btn class="ma-1" color="grey" plain> HOME </v-btn>
        <v-btn class="ma-1" color="grey" plain> ABOUT </v-btn>
        <v-btn class="ma-1" color="grey" plain> CONTACT </v-btn>
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

    <SellersList @updateSeller="updateSeller" />

    <MainPanel class="mt-16" />
    <v-dialog persistent v-model="dialog" width="1000"
      ><InvoiceView />
    </v-dialog>
    <v-dialog
      v-model="dialogSummary"
      v-if="dialogSummary && seller"
      width="1000"
      ><SummarySeller :seller="seller" />
    </v-dialog>
  </v-app>
</template>

<script>
import MainPanel from "./components/MainPanel.vue";
import SellersList from "./components/SellersList.vue";
import InvoiceView from "./components/InvoiceView.vue";
import SummarySeller from "./components/SummarySeller.vue";

import { useSales } from "./store/sales";
import { defineComponent, computed, ref } from "@vue/composition-api";

const AppAlegra = defineComponent({
  name: "AppAlegra",
  components: {
    MainPanel,
    SellersList,
    InvoiceView,
    SummarySeller,
  },

  setup: () => {
    const sales = useSales();
    let dialogSummary = ref(false);
    let seller = ref(null);
    let key = ref(0);
    return {
      dialog: computed(() => sales.getShowInvoice),
      dialogSummary,
      seller,
      key,
      updateSeller(sel) {
        dialogSummary.value = true;
        seller.value = sel;
      },
    };
  },
});
export default AppAlegra;
</script>
