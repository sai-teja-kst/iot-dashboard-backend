const express = require("express");
const router = express.Router();
const { listalldata, timebasedata } = require("../controllers/apicontroller");

router.get("/list", listalldata);

router.get("/timestamp", timebasedata);

module.exports = router;
