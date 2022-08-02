export let api = {
  async get(data, keys) {
    let k;
    let url = data.url;
    let index;
    let reg;

    // eslint-disable-next-line no-restricted-syntax
    for (k in keys) {
      if (Object.prototype.hasOwnProperty.call(keys, k)) {
        url = url.replace(new RegExp(`{${k}}`, "g"), keys[k]);
      }
    }

    index = url.indexOf("?");
    if (index !== -1) {
      reg = new RegExp("{\\w+}", "g");
      if (reg.exec(url)) {
        url = url.substring(0, index);
      }
    }
    return await fetch(url, {
      method: data.method,
      headers: data.headers,
    }).then((res) => res.json());
  },

  async post(data, keys, params) {
    let k;
    let url = data.url;
    let index;
    let reg;

    // eslint-disable-next-line no-restricted-syntax
    for (k in keys) {
      if (Object.prototype.hasOwnProperty.call(keys, k)) {
        url = url.replace(new RegExp(`{${k}}`, "g"), keys[k]);
      }
    }

    index = url.indexOf("?");
    if (index !== -1) {
      reg = new RegExp("{\\w+}", "g");
      if (reg.exec(url)) {
        url = url.substring(0, index);
      }
    }

    return await fetch(url, {
      method: data.method,
      body: JSON.stringify(params),
      headers: data.headers,
    }).then((res) => res.json());
  },

  async call(id, keys, params) {
    let api = this.apis.find((el) => el.id == id);
    if (api?.method == "GET") {
      return this.get(api, keys);
    }
    if (api?.method == "POST") {
      return this.post(api, keys, params);
    }
  },

  apis: [
    {
      id: "sellers",
      url: "https://api.alegra.com/api/v1/sellers/",
      method: "GET",
      params: {},
      headers: {
        authorization:
          "Basic aGpvbmF0aGFuLnNnZUBnbWFpbC5jb206MzFiMThiMGVjNmZjMjM1NTQ2MmQ=",
        "content-type": "application/json",
      },
    },
    {
      id: "invoices",
      url: `https://api.alegra.com/api/v1/invoices`,
      method: "POST",
      params: {},
      body: {},
      headers: {
        authorization:
          "Basic aGpvbmF0aGFuLnNnZUBnbWFpbC5jb206MzFiMThiMGVjNmZjMjM1NTQ2MmQ=",
        "content-type": "application/json",
      },
    },
    {
      id: "preview",
      url: `https://api.alegra.com/api/v1/invoices/preview`,
      method: "POST",
      params: {},
      body: {},
      headers: {
        authorization:
          "Basic aGpvbmF0aGFuLnNnZUBnbWFpbC5jb206MzFiMThiMGVjNmZjMjM1NTQ2MmQ=",
        "content-type": "application/json",
      },
    },
    {
      id: "customsearch",
      url: `https://customsearch.googleapis.com/customsearch/v1?cx=63d4301bc938440b6&q={query}&start={start}&key=AIzaSyC_O86IyqBUxJG0MkisKjUESRnuFeCN7CI`,
      method: "GET",
      params: {},
      headers: {
        "content-type": "application/json",
      },
    },
  ],
};
//d4b0754cb24404636
//03bb71055f8198b6f
