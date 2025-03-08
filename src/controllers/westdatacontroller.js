const WestData = require("../models/westmodel");
const { getIO } = require("../utils/socket");

// Function to save data & broadcast
const westDataController = async (data) => {
    try {
        const msg = new WestData({
            id: data.id,
            timestamp: data.timestamp,
            temperature: data.temperature,
            humidity: data.humidity,
            pressure: data.pressure,
            co2Gas: data.co2Gas,
        });

        await msg.save();
        console.log("Data posted to MongoDB");

        // Emit the data to all connected clients
        getIO().emit("data", msg);
        console.log("Data sent to React via Socket.IO");

    } catch (err) {
        console.log("Error:", err);
    }
};

module.exports = { westDataController };
