const DealWithJSON = require("../helper/dealWithJson");
const deal = require("../helper/dealWithJson");
const jsonFile = "models/data.json";
const date = new Date().toLocaleDateString();

class Data {
  static home = (req, res) => {
    const allData = deal.readJsonData(jsonFile);
    res.render("home", {
      pageTitle: "home",
      allData,
      hasData: allData.length,
    });
  };

  static add = (req, res) => {
    res.render("add", {
      pageTitle: "Add Data",
    });
  };

  static addLogic = (req, res) => {
    const allData = deal.readJsonData(jsonFile);
    const newData = {
      id: Date.now(),
      dueDate: date,
      ...req.body,
      status: false,
    };
    allData.push(newData);
    deal.writeJsonData(jsonFile, allData);
    res.redirect("/");
  };

  static edit = (req, res) => {
    const { id } = req.params;
    const allData = deal.readJsonData(jsonFile);
    const data = allData.find((e) => e.id == id);
    res.render("edit", {
      pageTitle: "Edit Data",
      data,
    });
  };

  static editLogic = (req, res) => {
    const { id } = req.params;
    const allData = deal.readJsonData(jsonFile);
    const index = allData.findIndex((e) => e.id == id);
    allData[index] = { id, dueDate: date, ...req.body };
    deal.writeJsonData(jsonFile, allData);
    res.redirect(`/`);
  };

  static showSingleData = (req, res) => {
    const { id } = req.params;
    const allData = deal.readJsonData(jsonFile);
    const data = allData.find((e) => e.id == id);
    res.render("showSingleData", {
      pageTitle: "Single Data",
      data,
    });
  };

  static delete = (req, res) => {
    const { id } = req.params;
    let allData = deal.readJsonData(jsonFile);
    allData = allData.filter((e) => e.id != id);
    deal.writeJsonData(jsonFile, allData);
    res.redirect("/");
  };

  static deleteAll = (req, res) => {
    deal.writeJsonData(jsonFile, []);
    res.redirect("/");
  };

  static status = (req, res) => {
    const { id } = req.params;
    const allData = deal.readJsonData(jsonFile);
    const index = allData.findIndex((e) => e.id == id);

    allData[index].status = !allData[index].status;
    deal.writeJsonData(jsonFile, allData);
    res.redirect("/");
  };

  static search = (req, res) => {
    const { data } = req.query;
    const allData = deal.readJsonData(jsonFile);
    const search = allData.filter(
      (e) => e.title.includes(data) || e.content.includes(data)
    );
    // console.log(search);
    res.render("search", {
      pageTitle: "Search Results",
      search,
    });
  };
}

module.exports = Data;
