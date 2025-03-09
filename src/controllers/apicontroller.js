const westData = require("../models/westmodel");

const listalldata = async (req, res) => {
  try {
    const result = await westData.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

const latest = async (req, res) => {
  try {
    const result = await westData.find().sort({ timestamp: -1 }).limit(1);
    res.status(200).json(result.length ? result[0] : {});
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

const timebasedata = async (req, res) => {
  try {
    const parameter = req.query.parameter;
    const duration = parseInt(req.query.duration);
    const unit = req.query.unit;

    if(isNaN(duration) || (unit != "mins" && unit != "hrs")){
      return res.status(400).json({error: "Invalid Request. Check duration & unit values"})
    };

    const validParameters = ["co2Gas", "humidity", "pressure", "temperature"];
    if (!validParameters.includes(parameter)) {
      return res.status(400).json({ error: `Invalid parameter. Choose from: ${validParameters.join(", ")}` });
    }

    const mul = (unit === "mins") ? (60 * 1000) : (60 * 60 * 1000);
    const to = new Date();
    const from = new Date(to.getTime() - duration * mul);

    const data  = await westData.find({
      timestamp: {$gte: from, $lte: to}
    })

    const filteredData = data.map(entry => ({
      timestamp: new Date(entry.timestamp).toISOString().slice(11, 16),
      [parameter]: entry[parameter]
    }));

    res.status(200).json({ data: filteredData });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { listalldata, timebasedata , latest};
