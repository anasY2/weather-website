const request = require("request");
const geoCode = (place, callback) => {
  const geoUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(place) +
    ".json?access_token=pk.eyJ1IjoiYW5hc3lhc2VlbjEyMSIsImEiOiJja3gzaGJ4eW4waHVhMnVueGlqbDE0Y3g5In0.kePPe4gD779IiJroCApQ-g&limit=1";

  request({ url: geoUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect!", undefined);
    } else if (!response.body.features || response.body.features.length === 0) {
      callback("Unable to find location!", undefined);
    } else {
      let data = {
        lat: response.body.features[0].center[1],
        long: response.body.features[0].center[0],
        place:response.body.features[0].place_name
      };
      
      callback(undefined, data);
    }
  });
};
module.exports = geoCode;
