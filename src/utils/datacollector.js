const { westDataController } = require("../controllers/westdatacontroller");
const { EventHubConsumerClient } = require("@azure/event-hubs");
require("dotenv").config();

const connectionString = process.env.IOT_HUB_EVENTS_ENDPOINT;
const consumerGroup = process.env.CONSUMER_GROUP;

const datacollector = async () => {
  console.log("Listening for messages...");
  const client = new EventHubConsumerClient(consumerGroup, connectionString);

  const subscription = client.subscribe({
    processEvents: async (events) => {
      for (const event of events) {
        console.log("Telemetry received:", event.body);
        await westDataController(event.body);
      }
    },
    processError: async (err) => {
      console.error("Error receiving telemetry:", err);
    },
  });

  process.on("SIGINT", async () => {
    console.log("Closing subscription...");
    await subscription.close();
    await client.close();
    process.exit(0);
  });
};

module.exports = datacollector;
