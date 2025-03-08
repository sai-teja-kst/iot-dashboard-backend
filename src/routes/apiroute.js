const express = require("express");
const router = express.Router();
const { listdata } = require("../controllers/apicontroller");

router.get("/list", listdata);

module.exports = router;
