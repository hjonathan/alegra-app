import { defineStore } from "pinia";
import { useSellers } from "./sellers";

export const useSales = defineStore("sales", {
  state: () => ({
    showInvoice: false,
    sales: [],
    invoice: null,
  }),
  getters: {
    getPhotos: (state) => state.photos,
    getInvoice: (state) => state.invoice,
    getSalesInformation: (state) => {
      const sellers = useSellers();
      let s = state.sales.map((el) => {
        return { sales: el, seller: sellers.getSeller(el.id) };
      });

      return s;
    },
    getShowInvoice: (state) => {
      return state.showInvoice;
    },
    getWinner(state) {
      const sellers = useSellers();
      let sale = state.sales.find((el) => el.sales >= 20);
      return { sales: sale, seller: sellers.getSeller(sale.id) };
    },
  },
  actions: {
    addSale(payload) {
      let seller = this.sales.find((el) => el.id == payload.idSeller);
      if (seller) {
        seller["sales"] += 3;
        seller["photos"].push(payload.photo);
        if (seller["sales"] >= 20) {
          this.showInvoice = true;
        }
      }
    },
    newSale(payload) {
      this.sales.push({
        id: payload,
        sales: 0,
        photos: [],
      });
    },
    newInvoice(payload) {
      this.invoice = payload;
    },
    reset() {
      this.showInvoice = false;
      this.sales = [];
      this.invoice = null;
    },
  },
});
