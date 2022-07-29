export let loadClient = () => {
  window.gapi.client.setApiKey("AIzaSyA6w7qcirkA0EqaWnw89eM1UdAMTXfWY3Y");
  return window.gapi.client
    .load(
      "https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest"
    )
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
};
