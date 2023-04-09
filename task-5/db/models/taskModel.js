const mongoose = require("mongoose");

const taskModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 200,
  },

  status: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
  },
});

const Task = mongoose.model("Task", taskModel);

module.exports = Task;
