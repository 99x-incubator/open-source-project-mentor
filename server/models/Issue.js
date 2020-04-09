const mongoose = require("mongoose"); //variable to read

// A DB Schema to define our data structure
let IssueModel = {};

const IssueSchema = new mongoose.Schema({
  issue_id: {
    type: Number,
    required: true,
    unique: true,
  },

  Name: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

IssueSchema.statics.findByName = (name, callback) => {
  const search = {
    name,
  };

  return IssueModel.findOne(search, callback);
};
