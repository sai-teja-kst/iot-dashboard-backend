const express = require("express");
const router = express.Router();
const { listalldata, timebasedata, latest } = require("../controllers/apicontroller");

router.get("/list", listalldata);

router.get("/lastest", latest);

router.get("/timestamp", timebasedata);

module.exports = router;
