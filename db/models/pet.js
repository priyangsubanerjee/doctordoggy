const mongoose = require("mongoose");
const { Schema } = mongoose;

const petSchema = new Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  family: {
    type: String,
  },
  sex: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  breed: {
    type: String,
  },
  color: {
    type: String,
  },
  weight: {
    type: String,
  },
  vaccinationRecords: {
    type: Array,
  },
  medicalRecords: {
    type: Array,
  },
  historyOfComplications: {
    type: String,
  },
  parentEmail: {
    type: String,
  },
});

mongoose.models = {};
module.exports = mongoose.models.pets || mongoose.model("pets", petSchema);
