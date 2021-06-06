const request = require("postman-request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidG9tbXkxNjEiLCJhIjoiY2twMG41dnNlMTQ4YzJ3bXc2ZnRoNDRxdCJ9.w1KlTV-Fjxl56yzgHz72Gw";
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      console.log("low level error no network", undefined);
    } else if (body.features.length === 0) {
      console.log("location not found");
    } else {
      callback(undefined, {
        latitude: body.features[0].bbox[1],
        longitude: body.features[0].bbox[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
