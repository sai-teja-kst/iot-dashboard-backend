const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiroutes = require("./src/routes/apiroute");
const chatroutes = require("./src/routes/chatroute");
const vehicleroutes = require("./src/routes/vehicleroute");
const connectDB = require("./src/utils/mongodb");
const http = require("http");
const { initializeSocket } = require("./src/utils/socket");
require("dotenv").config();

//const { datapublish } = require("./src/utils/datapublish");
//const datacollector = require("./src/utils/datacollector");
//const { seed } = require("./src/utils/seed");

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initializeSocket(server);

connectDB();
//dataseeding();
//datacollector();
datapublish();
//seed();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/west", apiroutes);
app.use("/api/v1/ai", chatroutes);
app.use("/api/v1/vehicle", vehicleroutes);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));