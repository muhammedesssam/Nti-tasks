const deal = require("../helper/dealWithJson");
const connectDb = require("../../models/dbConnection");
const ObjectId = require("mongodb").ObjectId;
const jsonFile = "models/data.json";
const date = new Date().toLocaleDateString();

class Data {
  static home = async (req, res) => {
    try {
      connectDb(async (db) => {
        const allData = await db.collection("tasks").find().toArray();
        res.render("home", {
          pageTitle: "home",
          allData,
          hasData: allData.length,
        });
      });
    } catch (err) {
      res.send(err);
    }
  };

  static add = (req, res) => {
    res.render("add", {
      pageTitle: "Add Data",
    });
  };

  static addLogic = async (req, res) => {
    try {
      connectDb(async (db) => {
        await db
          .collection("tasks")
          .insertOne({ ...req.body, dueDate: date, status: false });
      });
      res.redirect("/");
    } catch (err) {
      res.send(err);
    }
  };

  static edit = async (req, res) => {
    try {
      connectDb(async (db) => {
        const { id } = req.params;
        const data = await db.collection("tasks").findOne({
          _id: new ObjectId(id),
        });
        res.render("edit", {
          pageTitle: "Edit Data",
          data,
        });
      });
    } catch (err) {
      res.send(err);
    }
  };

  static editLogic = async (req, res) => {
    try {
      connectDb(async (db) => {
        const { id } = req.params;

        const data = await db
          .collection("tasks")
          .updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...req.body, dueDate: date } }
          );
        res.redirect(`/`);
      });
    } catch (err) {
      res.send(err);
    }
  };

  static showSingleData = async (req, res) => {
    try {
      connectDb(async (db) => {
        const { id } = req.params;
        const data = await db.collection("tasks").findOne({
          _id: new ObjectId(id),
        });
        res.render("showSingleData", {
          pageTitle: "Single Data",
          data,
        });
      });
    } catch (err) {
      res.send(err);
    }
  };

  static delete = async (req, res) => {
    try {
      connectDb(async (db) => {
        const { id } = req.params;
        await db.collection("tasks").deleteOne({ _id: new ObjectId(id) });
      });
      res.redirect("/");
    } catch (err) {
      res.send(err);
    }
  };

  static deleteAll = async (req, res) => {
    try {
      connectDb(async (db) => await db.collection("tasks").remove());
      res.redirect("/");
    } catch (err) {
      res.send(err);
    }
  };

  static status = async (req, res) => {
    try {
      connectDb(async (db) => {
        const { id } = req.params;
        const task = await db
          .collection("tasks")
          .findOne({ _id: new ObjectId(id) });
        const data = await db
          .collection("tasks")
          .updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: !task.status } }
          );
      });
      res.redirect("/");
    } catch (err) {
      res.send(err);
    }
  };

  static search = async (req, res) => {
    try {
      connectDb(async (db) => {
        const { data } = req.query;
        const search = await db
          .collection("tasks")
          .find({
            $or: [{ title: { $regex: data } }, { content: { $regex: data } }],
          })
          .toArray();
        console.log(search);
        res.render("search", {
          pageTitle: "Search Results",
          search,
        });
      });
    } catch (err) {
      res.send(err);
    }
  };
}

module.exports = Data;
