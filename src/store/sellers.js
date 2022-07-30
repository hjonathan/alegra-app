import { defineStore } from "pinia";
import _ from "lodash";

export const useSellers = defineStore("sellers", {
  state: () => ({
    sellers: [],
    avatars: [
      "https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban",
      "https://avataaars.io/?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun",
      "https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong",
      "https://avataaars.io/?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair",
      "https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly",
      "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    ],
  }),
  getters: {
    getSellers: (state) => state.sellers,
  },
  actions: {
    addSeller(payload) {
      this.sellers.sellers.push(payload);
    },
    addSale(idSeller, points) {
      let seller = this.sellers.find((seller) => seller.id == idSeller);
      seller.sales = seller.sales + points;
    },
    async getSellersAPI() {
      let data = {
        url: "https://api.alegra.com/api/v1/sellers/",
        method: "GET",
        params: {},
        headers: {
          authorization:
            "Basic aGpvbmF0aGFuLnNnZUBnbWFpbC5jb206MzFiMThiMGVjNmZjMjM1NTQ2MmQ=",
          "content-type": "application/json",
        },
      };
      let sels = await fetch(data.url, {
        method: data.method,
        headers: data.headers,
      }).then((res) => res.json());
      if (sels) {
        sels.forEach((seller) => {
          seller["avatar"] = this.avatars[_.random(0, this.avatars.length - 1)];
          seller["sales"] = 0;
        });
        this.sellers = sels;
      } else {
        this.sellers = [];
      }
    },
  },
});
