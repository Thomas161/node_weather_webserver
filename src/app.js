const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geo-code.js");
const forecast = require("./utils/forecast.js");

const app = express();

//port to be listend to by heroku port to be used
const port = process.env.PORT || 3010;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Tom Magin",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Tom Magin",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Tom Magin",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "address not found",
    });
  }

  geoCode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      //stop execution
      return res.send({ err });
    }
    // forecast particular lat and long
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }

      console.log("Data", location);
      console.log(forecastData);

      res.send({
        location,
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

//check handler if you have vistied help
app.get("/help/*", (req, res) => {
  res.render("notfound", {
    error: "help article not found",
  });
});

//generic 404
app.get("*", (req, res) => {
  res.render("notfound");
});

//IMPORTANT
// when making a request via http
// you can only return one response from that request
// CANNOT set headers after sent to client error that appears
// if you try to get multiple responses
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
