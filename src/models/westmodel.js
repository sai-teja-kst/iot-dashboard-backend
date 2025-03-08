const mongoose = require("mongoose");

const westDataSchema = new mongoose.Schema(
    {
        id: Number,
        timestamp: { type: Date, default: Date.now },
        temperature: String,
        humidity: String,
        pressure: String,
        co2Gas: String
      }
);

const westData = mongoose.model("WestData", westDataSchema);

module.exports = westData;
