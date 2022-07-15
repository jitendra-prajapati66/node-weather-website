const request = require("request");
const log = console.log;
const geoCode = (adderess, callback) => {
  const urlForGeocoding = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adderess
  )}.json?access_token=pk.eyJ1Ijoiaml0ZW5kcmEzMjAiLCJhIjoiY2w0cjF5cjJrMGNncjNlazJrZ3BlZjdpOSJ9.tlPc81bInK1gvs_q2xe2gA&limit=1`;
  request(
    { url: urlForGeocoding, json: true },
    function (error, { body } = {}) {
      // console.log(response.body);
      if (error) {
        callback(
          "No Network ! please re check your Internet Connection",
          undefined
        );
      } else if (body.features.length == 0) {
        callback("Unable to find location! Try Another Search", undefined);
      } else {
        callback(undefined, {
          location: body.features[0].place_name,
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
        });
      }
    }
  );
};
module.exports = geoCode;
