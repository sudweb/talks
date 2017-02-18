const gapi = {
  client: {
    request: () => {
      return Promise.resolve("");
    }
  },
  requestPeople: {}
};

console.log(gapi.client.request());

module.exports = gapi;
