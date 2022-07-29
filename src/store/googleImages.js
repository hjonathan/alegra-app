import { defineStore } from "pinia";

export const useGoogleImages = defineStore("googleImages", {
  state: () => ({
    response: {},
  }),
  getters: {
    getImages: (state) => state.response.items,
  },
  actions: {
    addImages(payload) {
      this.sellers.sellers.push(payload);
    },
    newSearch() {},
    loadClientAPI() {},
    async getImagesAPI(query) {
      let data = {
        url: `https://customsearch.googleapis.com/customsearch/v1?cx=03bb71055f8198b6f&q=${query}&start=10&key=AIzaSyA6w7qcirkA0EqaWnw89eM1UdAMTXfWY3Y`,
        method: "GET",
        params: {},
        headers: {
          "content-type": "application/json",
        },
      };

      let sels = await fetch(data.url, {
        method: data.method,
        headers: data.headers,
      }).then((res) => res.json());
      console.log(sels);

      this.response = sels;
    },
  },
});
