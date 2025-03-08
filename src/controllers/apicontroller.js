const westData = require("../models/westmodel");

const listdata = async (req, res) => {
    try {
      const result = await westData.find();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "internal server error" });
    }
};

module.exports = {listdata};