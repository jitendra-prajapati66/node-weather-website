const request = require("request");

const getPhoto = (adderess, callback) => {
  const urlForPhoto = `https://api.unsplash.com/search/photos/?per_page=1&query=${encodeURIComponent(
    adderess
  )}%27%20City%20View&client_id=O4qWY5qrqdHS_OnQujQa3GEiPpEEzNSoFeT5b1wD-WA`;
  request({ url: urlForPhoto, json: true }, (error, response) => {
    if (error) {
      callback("Network Error pls check your internet connection", undefined);
    } else if (response.body.results.length == 0) {
      callback("Unable to find location! Try Another Search", undefined);
    } else {
      callback(undefined, response.body.results[0].urls.regular);
    }
  });
};

module.exports = getPhoto;
