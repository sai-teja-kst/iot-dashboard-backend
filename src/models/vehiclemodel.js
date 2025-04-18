const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
    model: {
        type: String,
        enum: ["nissan", "toyota", "renault", "tesla"],
        required: true,
    },
    zone: {
        type: String,
        enum: ["A", "B", "C", "D"],
        required: true,
    },
    vin: {
        type: String,
        unique: true,
        required: true,
        maxlength: 18,
        minlength: 18,
    },
    chasis: {
        type: String,
        maxlength: 10,
        minlength: 10,
    },
    operator: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["todo", "inprogress", "done"],
        default: "todo",
    },
    checklist: {
        interior: { type: Boolean, default: false },
        exterior: { type: Boolean, default: false },
        undervehicle: { type: Boolean, default: false },
        underhood: { type: Boolean, default: false },
        tires: { type: Boolean, default: false },
    },
    created: { type: Date, default: Date.now },
});

VehicleSchema.index({ zone: 1 });

const vehicleData = mongoose.model("VehicleData", VehicleSchema);

module.exports = vehicleData;
