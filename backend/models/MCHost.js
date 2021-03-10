const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MCHostSchema = new Schema({
  address: {
    type: String,
    required: true
  }
})

module.exports = User = mongoose.model("mc_hosts", MCHostSchema);
