const mongoose = require("mongoose"); //variable to read

// A DB Schema to define our data structure
let IssueModel = {};

const IssueSchema = new mongoose.Schema({
  //required true means it must be essential
  issue_id: {
    type: Number,
    required: true,
    unique: true,
  },

  Name: {
    type: String,
    //required: true,
  },

  Description: {
    type: String,
  },

  CreatedDate: {
    type: Date,
    default: Date.now,
  },

  Status: {
    //whether it is assigned or not
    type: String,
    //required: true,  may become needed needed
  },
});

IssueSchema.statics.findByName = (name, callback) => {
  const search = {
    name,
  };

  return IssueModel.findOne(search, callback);
};

// Create the issue model based on the schema.
IssueModel = mongoose.model("Issue", IssueSchema);

// exporting the properties
module.exports.IssueModel = IssueModel;
module.exports.IssueSchema = IssueSchema;
