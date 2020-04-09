const mongoose = require("mongoose"); //variable to read

// A DB Schema to define our data structure
let MentorModel = {};

const MentorSchema = new mongoose.Schema({
  Mentor_id: {
    type: Number,
    required: true,
    unique: true,
  },

  Name: {
    type: String,
    required: true,
  },
});

MentorSchema.statics.findByName = (name, callback) => {
  const search = {
    name,
  };

  return MentorModel.findOne(search, callback);
};
