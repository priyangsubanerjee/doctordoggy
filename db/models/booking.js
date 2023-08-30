const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
  },
  status: {
    type: String,
    default: "due",
  },
  petId: {
    type: String,
  },
  petName: {
    type: String,
  },
  serviceType: {
    type: String,
  },
  dateTime: {
    type: String,
  },
  note: {
    type: String,
  },
});

mongoose.models = {};
module.exports =
  mongoose.models.accounts || mongoose.model("bookings", bookingSchema);
