const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  image: {
    type: Object,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  details: {
    type: String,
  },
  daysOn: {
    type: Array,
  },
  digitalSignature: {
    type: Object,
  },
});

mongoose.models = {};
module.exports =
  mongoose.models.doctors || mongoose.model("doctors", doctorSchema);
