const { westDataController } = require("../controllers/westdatacontroller");
const cron = require("node-cron");

function GenerateData() {
  let payload = {};
  payload.id = Date.now();
  payload.timestamp = new Date().toISOString();
  payload.temperature = (Math.random() * (35 - 15) + 15).toFixed(2);
  payload.humidity = (Math.random() * (80 - 40) + 40).toFixed(2);
  payload.pressure = (Math.random() * (1025 - 980) + 980).toFixed(2);
  payload.co2Gas = (Math.random() * (500 - 300) + 300).toFixed(2);
  //console.log(`Message Generated : ${payload}`);
  return payload;
}

const datapublish = async () => {
  try {
    cron.schedule("0 * * * * *", async () => {
      let data = await GenerateData();

      if (data) {
        await westDataController(data);
        //console.log(data);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }
};

module.exports = { datapublish };
