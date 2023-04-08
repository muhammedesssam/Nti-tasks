const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
const dataRoutes = require("./routes/dataRoutes");

const staticDir = path.join(__dirname, "../resources/public");
const viewDir = path.join(__dirname, "../resources/views");
const partialDir = path.join(__dirname, "../resources/layouts");

app.use(express.static(staticDir));
app.set("view engine", "hbs");
app.set("views", viewDir);

hbs.registerPartials(partialDir);
app.use(express.urlencoded({ extended: true }));
const exp = require("constants");

app.use(dataRoutes);
app.all("*", (req, res) =>
  res.render("err404", { pageTitle: "Error in page" })
);

module.exports = app;
