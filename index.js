const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiroutes = require("./src/routes/apiroute");
const chatroutes = require("./src/routes/chatroute");
const connectDB = require("./src/utils/mongodb");
const datacollector = require("./src/utils/datacollector");
const http = require("http");
const { initializeSocket } = require("./src/utils/socket");
const { datapublish } = require("./src/utils/datapublish");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initializeSocket(server);

connectDB();
//datacollector();
datapublish();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/west", apiroutes);
app.use("/api/v1/ai", chatroutes);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));