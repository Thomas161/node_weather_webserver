const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d686db4c91b28f318bb81d2f5e462ffa&query=" +
    lat +
    "," +
    long +
    "&units=m";

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("no network", undefined);
    } else if (body.error) {
      callback("location not found", undefined);
    } else {
      let data = body || {};
      console.log(data);
      callback(
        undefined,
        `${data.current.weather_descriptions[0]} with a temperature of
          ${data.current.temperature} degrees, observed time is
          ${data.current.observation_time}`
      );
    }
  });
};

module.exports = forecast;
