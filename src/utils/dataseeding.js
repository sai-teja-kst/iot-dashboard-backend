const dataseeding = async () => {
  console.log("dataseeding");

  let data = await GeneratePharmaData();
  //console.log(data);

  let res = await GenerateVehicleData();
  console.log(res);
};

function GeneratePharmaData() {
  const status = ["active", "not active"];
  const zone = ["A", "B", "C", "D"];
  const alertLevels = ["low", "medium", "high", "critical"];
  const deviceTypes = ["temperature-sensor", "humidity-sensor", "multi-sensor"];

  const payload = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    timestamp: new Date().toISOString(),
    zone: zone[Math.floor(Math.random() * zone.length)],
    temperature: parseFloat((Math.random() * (35 - 15) + 15).toFixed(2)),
    humidity: parseFloat((Math.random() * (80 - 40) + 40).toFixed(2)),
    pressure: parseFloat((Math.random() * (1025 - 980) + 980).toFixed(2)),
    co2Gas: parseFloat((Math.random() * (500 - 300) + 300).toFixed(2)),
    device: {
      name: `Device_${Math.floor(Math.random() * 1000)}`,
      status: status[Math.floor(Math.random() * status.length)],
      type: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
    },
    alertLevel: alertLevels[Math.floor(Math.random() * alertLevels.length)],
    batteryLevel: parseFloat((Math.random() * (100 - 10) + 10).toFixed(2)),
    signalStrength: Math.floor(Math.random() * 100),
  };

  return payload;
}

function GenerateVehicleData() {
  let plants = ["Oppama", "Kyushu", "Tochigi"];
  let vin_model = ["EV", "HYB", "LPG", "P", "D"];

  let payload = {};
  payload.vin_no = `${vin_model[(Math.random() * 4).toFixed(0)]}-${(
    Math.random() * 10000
  ).toFixed(0)}`;
  payload.chasis = `${Date.now()}`;
  payload.operator = {};
  payload.plant = plants[(Math.random() * 3).toFixed(0)];
  return payload;
}

module.exports = { dataseeding };
