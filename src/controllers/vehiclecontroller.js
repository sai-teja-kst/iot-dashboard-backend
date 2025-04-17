const vehicleData = require("../models/vehiclemodel");

const getinfo = async (req, res) => {
  try {
    const { zone, vin } = req.query;

    if (!zone) {
      return res.status(400).json({ message: "Zone is required" });
    }

    if (vin) {
      const result = await vehicleData
        .find({ vin, zone })
        .sort({ created: -1 })
        .limit(1);

      if (result.length === 0) {
        return res.status(404).json({ message: "Vehicle not found in the specified zone" });
      }

      return res.status(200).json(result[0]);
    }

    const data = await vehicleData.find({ zone });

    if (data.length === 0) {
      return res.status(404).json({ message: "No data found for this zone" });
    }

    res.status(200).json({ data });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const addvehicleinfo = async (req, res) => {
    try{
        const data = req.body;

        const {vin} = data;

        if(!vin){
            return res.status(400).json({message: "vin no is required"});
        }

        const exists_vin = await vehicleData.findOne({ vin });

        if (exists_vin) {
            if (exists_vin.status === "approved") {
              return res.status(409).json({
                message: `VIN ${vin} is already approved. Please raise a request for re-inspection to delete and resubmit.`,
              });
            }

            await vehicleData.updateOne({ vin }, data);
            return res.status(200).json({ message: "Vehicle record updated successfully." });
          }


        const new_vin = new vehicleData(data);
        await new_vin.save();

        res.status(201).json({ message: "Vehicle record created successfully." });
    }
    catch(err){
        if (err.code === 11000 && err.keyValue.vin) {
            return res.status(400).json({ message: `VIN '${err.keyValue.vin}' already exists.` });
        }
        console.log(err);
        res.status(500).json({message: "internal server error"})
    }
}

module.exports = { addvehicleinfo, getinfo};