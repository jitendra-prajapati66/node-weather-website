const express = require("express");
const hbs = require("hbs");
const path = require("path");
console.log(path.join(__dirname, "../public"));
const geocode = require("./utils/geoCode");
const forecast = require("./utils/forecast");
const getPhoto = require("./utils/getPhoto");
const port = process.env.PORT || 3000;

//out application
const application = express();
//paths for express configuration
const pathToStatic = path.join(__dirname, "../public");
const pathToViews = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setting engine to use static file using handlebar for dynamic purpose and view path
application.set("view engine", "hbs");
application.set("views", pathToViews);
hbs.registerPartials(partialPath);

//we still need static files to load style img and js etc to be serverd
application.use(express.static(pathToStatic));

//render pages using render method
//1 index
application.get("", (req, res) => {
  res.render("index", {
    name: "jitendra prajapati",
  });
});

//2 help
application.get("/help", (req, res) => {
  res.render("help", {
    name: "jitendra prajapati",
    helpText: "This is help Content",
  });
});

application.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "jitendra prajapati",
    errorMassage: "Help Article Not Found.",
  });
});

//3. about
application.get("/about", (req, res) => {
  console.log(req.query.adderess);
  getPhoto(req.query.adderess, (error, response) => {
    if (req.query.adderess == "c") {
      if (error) {
        return res.send({ error });
      }
      console.log(response);
      res.render("about", {
        name: "prajapati Jitendra",
        path: `${response}`,
      });
    } else {
      if (error) {
        return res.send({ error });
      }
      console.log(response);
      res.render("about", {
        name: "prajapati Jitendra",
        path: "./image/jitendra.jpg",
      });
    }
  });
});

application.get("/weather", (req, res) => {
  if (!req.query.adderess) {
    return res.send({
      error: "please provide adderess for forecast!",
    });
  }

  geocode(
    req.query.adderess,
    (error, { latitude, longitude, location } = {}) => {
      //if dont assign default value while destructing data of geocode and if some error occur while at geo then code will try to destruct undefined and thrpw error
      if (error) {
        // return console.log("Error In GeoCode", error);
        return res.send({ error });
      }
      forecast(
        latitude,
        longitude,
        (error, { weatherDesc, temperature, precip, humidity } = {}) => {
          if (error) {
            // return console.log("Error In Forecast", error);
            return res.send({ error: error });
          }
          // console.log("Location :", location);
          // console.log("Data : ", forecastData);
          res.send({
            location: location,
            forecast: ` ${weatherDesc[0]} untill evenning. It is currently ${temperature} ° And ${humidity} humidity out there ,There is ${precip} chance of rain `,
            // weather: weatherDesc[0],
            // temprature: temperature,
          });
        }
      );
    }
  );
});

//if someone try to access page that dont exist
application.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "jitendra prajapati",
    errorMassage: "Page Not Found.",
  });
});

//to end application
application.listen(port, () => {
  console.log("server port No :3000");
});
