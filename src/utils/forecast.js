const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4b5734125b714ad7ca8dfb5120ead1c4&%20query=${latitude},${longitude}`;
  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(
        "No Network ! please re check your Internet Connection",
        undefined
      );
    } else if (body.error) {
      callback(
        "Location Error: Unable to find location! Try Another Search",
        undefined
      );
    } else {
      callback(undefined, {
        weatherDesc: body.current.weather_descriptions,
        temperature: body.current.temperature,
        precip: body.current.precip,
        location:
          body.location.name +
          " , " +
          body.location.country +
          " , " +
          body.location.region,
      });
    }
  });
};

module.exports = forecast;
