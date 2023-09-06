const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    default: Math.random().toString(36).slice(-8),
  },
  phone: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: Object,
  },
  regd: {
    type: String,
  },
});

mongoose.models = {};
module.exports =
  mongoose.models.doctors || mongoose.model("doctors", doctorSchema);
