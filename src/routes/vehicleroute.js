const express = require("express");
const router = express.Router();
const { getvehicleinfo } = require("../controllers/vehiclecontroller");

router.get("/get", getvehicleinfo);

module.exports = router;
