import { defineStore } from "pinia";
import { useSellers } from "./sellers";
import _ from "lodash";
import { api } from "./../composables/gapi";

export const useGoogleImages = defineStore("googleImages", {
  state: () => ({
    response: {},
    items: [],
  }),
  getters: {
    getImages: (state) => {
      return state.items;
    },
  },
  actions: {
    setImages(items) {
      this.items = items;
    },
    loadClientAPI() {},
    async getNewSearch(query) {
      const sellers = useSellers();
      let res = await api.call("customsearch", {
        query: query,
        start: 0,
      });

      res.items.forEach((img) => {
        img["seller"] =
          sellers.getSellers[_.random(0, sellers.getSellers.length - 1)]["id"];
        img["disabled"] = false;
      });
      this.response = res;
      this.items = res.items;
    },
    async getShowMore() {
      const sellers = useSellers();
      let start = this.response?.queries
        ? this.response.queries.nextPage[0]["startIndex"]
        : 0;
      let q = this.response?.queries
        ? this.response.queries.nextPage[0]["searchTerms"]
        : "";

      let sels = await api.call("customsearch", {
        query: q,
        start: start,
      });

      if (sels) {
        sels.items.forEach((img) => {
          img["seller"] =
            sellers.getSellers[_.random(0, sellers.getSellers.length - 1)][
              "id"
            ];
          img["disabled"] = false;
        });

        this.response = sels;
        this.items = this.items.concat(sels.items);
      }
    },
    reset() {
      this.response = {};
      this.items = [];
    },
  },
});
