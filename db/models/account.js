const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  pincode: {
    type: String,
  },
  address: {
    type: String,
  },
  pets: {
    type: Array,
  },
});

mongoose.models = {};
module.exports =
  mongoose.models.accounts || mongoose.model("accounts", accountSchema);
