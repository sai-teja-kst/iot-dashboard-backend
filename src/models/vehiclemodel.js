const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
    model: String,
    zone: String,
    vin : String,
    chasis : String,
    operator: String,
    status : String,
    checklist : Object,
    created: { type: Date, default: Date.now },
});

const VehicleModel = mongoose.model("VehicleData", VehicleSchema);

module.exports = VehicleModel;