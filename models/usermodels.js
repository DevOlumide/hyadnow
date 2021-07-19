const mongoose = require("mongoose");

const userModelsSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true 
  },
  companyEmail: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone_no: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  postal: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("users", userModelsSchema);