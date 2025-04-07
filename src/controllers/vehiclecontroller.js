const vehicleData = require("../models/vehiclemodel");

const getvehicleinfo = async (req, res) => {
    try {
        const vin = req.query.vin;
        const result = await vehicleData
            .find({ vin })
            .sort({ timestamp: -1 })
            .limit(1)
            .toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const addvehicleinfo = async (req, res) => {
    try{
        const info = req.body;
        const result = await vehicleData.insertOne(info);
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json({message: "internal server error"})
    }
}

module.exports = { getvehicleinfo, addvehicleinfo };