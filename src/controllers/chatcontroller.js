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
    const textOutput = await result.response.text();
    let responseText = textOutput.trim();

    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      responseText = jsonMatch[1].trim();
    }

    if (!responseText.startsWith("[") || !responseText.endsWith("]")) {
      throw new Error("Generated content is not a valid JSON array.");
    }

    let parsedQuery;

    try {
      parsedQuery = JSON.parse(responseText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError.message);
      throw new Error("AI returned malformed JSON. Check formatting.");
    }

    if (!Array.isArray(parsedQuery) || parsedQuery.length === 0) {
      throw new Error("Generated query is not a valid non-empty array.");
    }

    return parsedQuery;
  } catch (error) {
    console.error("MongoDB Query Generation Error:", error.message);
    return [];
  }
};

  const userquery = async (req, res) => {
    const { query } = req.body;

    try {
      const mongoQuery = await generateMongoQuery(query);

      if (!mongoQuery || mongoQuery.length === 0) {
        return res.status(400).json({ error: "Failed to generate a valid MongoDB query." });
      }

      const queryResult = await westData.aggregate(mongoQuery);
      res.json({ data: queryResult });
    } catch (error) {
      console.error("MongoDB Query Error:", error.message);
      res.status(500).json({ error: "Internal Server Error. Please try again later." });
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
