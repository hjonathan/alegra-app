<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2"> Venta Exitosa </v-card-title>

    <v-card class="pt-6 mx-auto" flat>
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
      <v-simple-table class="mx-16">
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

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        v-if="pdf"
        color="purple"
        text
        :link="true"
        :href="pdf"
        target="_blank"
        >DESCARGAR FACTURA</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn color="warning" text @click="invoiceGenerator">
        GENERAR FACTURA
      </v-btn>
      <v-btn color="error" text @click="reset"> RESET </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import { useSales } from "./../store/sales";
import { useGoogleImages } from "./../store/googleImages";
import { useSellers } from "./../store/sellers";

import { api } from "./../composables/gapi";

const InvoiceView = defineComponent({
  name: "InvoiceView",
  setup() {
    const sales = useSales();
    const sellers = useSellers();
    const googleImages = useGoogleImages();
    const winner = ref(sales.getWinner);
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
      async invoiceGenerator() {
        let data = {
          date: new Date().toISOString().split("T")[0],
          dueDate: "2023-08-01",
          client: "2",
          seller: winner.value.seller.id,
          items: [
            {
              id: 1,
              price: 3,
              quantity: sales.getSalesInformation.length - 1,
            },
          ],
          retentions: [],
          payments: [],
          remissions: [],
          comments: [],
          quotas: [],
          stamp: {
            generateStamp: true,
          },
        };
        let res = await api.call("invoices", {}, data);

        if (res) {
          sales.newInvoice(res);
          this.invoicePDFGenerator();
        }
      },
      async invoicePDFGenerator() {
        let data = {
          date: new Date().toISOString().split("T")[0],
          dueDate: "2023-08-05",
          client: {
            id: 2,
          },
          items: [
            {
              id: 1,
              price: 3,
              quantity: sales.getSalesInformation.length - 1,
            },
          ],
          paymentMethod: "cash",
          paymentForm: "CASH",
          numberTemplate: {
            id: 1,
          },
        };
        let res = await api.call("preview", {}, data);
        if (res) {
          pdf.value = res.pdfUrl;
          window.open(res.pdfUrl);
        }
      },
      async reset() {
        sales.reset();
        googleImages.reset();
        sellers.reset();
      },
    };
  },
});
export default InvoiceView;
</script>
<style scoped>
.btn-search {
  height: 56px !important;
}
</style>
