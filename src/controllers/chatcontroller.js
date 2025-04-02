const ChatData = require("../models/chatmodel");
const westData = require("../models/westmodel");
const {AGENT_PREFIX_PROMPT} = require("../utils/prompt");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generateMongoQuery = async (query) => {
    const prompt = `${AGENT_PREFIX_PROMPT}\n\nUser Question: ${query}`;

    try {
      const result = await model.generateContent(prompt);

      if (!result || !result.response || typeof result.response.text !== "function") {
        throw new Error("Invalid response format from AI model.");
      }

      let responseText = result.response.text().trim();
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        responseText = jsonMatch[1];
      }

      if (!responseText.startsWith("[") || !responseText.endsWith("]")) {
        throw new Error("Generated query is not a valid JSON aggregation pipeline array.");
      }

      const parsedQuery = JSON.parse(responseText);

      if (!Array.isArray(parsedQuery)) {
        throw new Error("Generated query is not an array.");
      }

      return parsedQuery;
    } catch (error) {
      console.error("MongoDB Query Generation Error:", error);
      return [];
    }
  };


const userquery = async (req, res) => {
    const { query } = req.body;

    try {
        const mongoQuery = await generateMongoQuery(query);
        const queryResult = await westData.aggregate(mongoQuery);
        res.json({ data: queryResult });
    } catch (error) {
        console.error("MongoDB Query Error:", error);
        res.status(500).json({ error: error.message });
    }
};

const newchat = async (req, res) => {
  try {
    const { role, content } = req.body;
    const chatEntry = new ChatData({ role, content });

    await chatEntry.save();
    console.log("New chat saved");
    res.json({ message: "Chat saved successfully!" });
  } catch (error) {
    console.error("Error saving chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const chathistory = async (req, res) => {
  try {
    const chatHistory = await ChatData.find().sort({ timestamp: -1 }).limit(10);
    console.log("Chat history retrieved");
    res.json(chatHistory);
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { chathistory, newchat, userquery };
