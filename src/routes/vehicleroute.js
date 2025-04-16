const express = require("express");
const router = express.Router();
const { getinfo, addvehicleinfo } = require("../controllers/vehiclecontroller");

router.get("/car", getinfo);

router.post("/car", addvehicleinfo);

module.exports = router;