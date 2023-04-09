const deal = require("../helper/dealWithJson");
const connectDb = require("../../db/dbConnection");
const Task = require("../../db/models/taskModel");

class Data {
  static home = async (req, res) => {
    try {
      const allTasks = await Task.find();
      res.render("home", {
        pageTitle: "All Tasks",
        allTasks,
        hasData: allTasks.length,
      });
    } catch (err) {
      res.send(err);
    }
  };

  static add = (req, res) => {
    res.render("add", {
      pageTitle: "Add Task",
    });
  };

  static addLogic = async (req, res) => {
    try {
      const task = await Task.create({
        ...req.body,
        dueDate: new Date(),
      });
      res.redirect("/");
    } catch (err) {
      res.send(err);
    }
  };

  static edit = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      res.render("edit", {
        pageTitle: "edit",
        task,
      });
    } catch (err) {
      res.send(err);
    }
  };

  static editLogic = async (req, res) => {
    try {
      const { id } = req.params;
      const updateTask = await Task.findByIdAndUpdate(id, req.body, {
        runValidators: true,
      });
    } catch (err) {
      res.send(err);
    }
  };

  static showSingleData = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      res.render("showSingleData", {
        pageTitle: "single data",
        task,
      });
    } catch (err) {
      res.send(err);
    }
  };

  static delete = async (req, res) => {
    try {
      const { id } = req.params;
      await Task.findByIdAndDelete(id);
      res.redirect("/");
    } catch (err) {
      res.send(err);
    }
  };

  static deleteAll = async (req, res) => {
    try {
      await userModel.deleteMany();
      res.redirect("/");
    } catch (err) {
      res.send(err);
    }
  };

  static status = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      const data = await Task.findByIdAndUpdate(id, { status: !task.status });

      res.redirect("/");
    } catch (err) {
      res.send(err);
    }
  };

  static search = async (req, res) => {
    try {
      const { data } = req.query;
      const search = await Task.find({
        $or: [{ title: { $regex: data } }, { content: { $regex: data } }],
      });
      console.log(search);
      res.render("search", {
        pageTitle: "Search Results",
        search,
      });
    } catch (err) {
      res.send(err);
    }
  };
}

module.exports = Data;
