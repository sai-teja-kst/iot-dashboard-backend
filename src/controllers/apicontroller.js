const westData = require("../models/westmodel");

const listalldata = async (req, res) => {
  try {
    const result = await westData.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

const timebasedata = async (req, res) => {
  try {
    const duration = parseInt(req.query.duration);
    const unit = req.query.unit;

    if(isNaN(duration) || (unit != "mins" && unit != "hrs")){
      return res.status(400).json({error: "Invalid Request. Check duration & unit values"})
    };

    const mul = (unit === "mins") ? (60 * 1000) : (60 * 60 * 1000);
    const to = new Date();
    const from = new Date(to.getTime() - duration * mul);

    const data  = await westData.find({
      timestamp: {$gte: from, $lte: to}
    })

    res.status(200).json({data});

  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { listalldata, timebasedata };
