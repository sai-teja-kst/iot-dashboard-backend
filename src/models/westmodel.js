const mongoose = require("mongoose");

const westDataSchema = new mongoose.Schema(
  {
    id: Number,
    timestamp: { type: Date, default: Date.now },
    temperature: String,
    humidity: String,
    pressure: String,
    co2Gas: String,
  },
  {
    capped: { size: 846720, max: 10080 }
  }
);

const westData = mongoose.model("WestData", westDataSchema);

module.exports = westData;
