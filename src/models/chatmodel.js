const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    role: String,
    content: String,
    timestamp: { type: Date, default: Date.now },
});

const ChatModel = mongoose.model("ChatData", ChatSchema);

module.exports = ChatModel;
