const mongoose = require("mongoose"); //variable to read

// A DB Schema to define our data structure
let CollaboratorModel = {};

const CollaboratorSchema = new mongoose.Schema({
  Collaborator_id: {
    type: Number,
    required: true,
    unique: true,
  },

  Name: {
    type: String,
    required: true,
  },
});

CollaboratorSchema.statics.findByName = (name, callback) => {
  const search = {
    name,
  };

  return CollaboratorModel.findOne(search, callback);
};
