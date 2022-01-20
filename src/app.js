const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const weather = require("./utils/weather");
const app = express();
const port=process.env.PORT || 3000
// Defining paths for Express config
let publicPathDirectory = path.join(__dirname, "../public");
//let viewPath = path.join(__dirname, "../templates/views");
let partialPath = path.join(__dirname, "../views/partials");
// Setup handlerbars location and views location
app.set("view engine", "hbs");
//app.set("views", viewPath);
hbs.registerPartials(partialPath);
// Setup static directory to serve
app.use(express.static(publicPathDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Bruce",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    msg: "If u need any help i am there",
    name: "Bruce",
  });
});
app.get("/help/data", (req, res) => {
  res.send("DATA");
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Bruce",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address query is missing",
    });
  }
  geoCode(req.query.address, (error, {lat,long,place}={}) => {
    if (error) {
      res.send({
        error: error,
      });
    } else {
      weather({lat,long,place}, (error, { temp, feelTemp, desc,place }) => {
       if(error){
         res.send({
           error:error
         })
       }
        res.send({
         forecast: desc+".It is "+temp+"deg out.It feels like "+feelTemp+"deg",
          location:place,
          address:req.query.address
        });
      });
    }
  });
  
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Search query is missing",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404page", {
    error: "Help article not found",
    name: "Bruce",
    title: "404",
  });
});
app.get("*", (req, res) => {
  res.render("404page", {
    error: "Page Not Found",
    name: "Bruce",
    title: "404",
  });
});
app.listen(port, () => {
  console.log("Server running on port:"+port);
});
