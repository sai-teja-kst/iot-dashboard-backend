const vehicleData = require("../models/vehiclemodel");
const { faker } = require('@faker-js/faker');

const seed = async () => {
    try {
        const statuses = ["todo", "inprogress", "done"];
        const operators = ["John Doe", "SaiTeja", "Alex", "Maria", "Liam"];
        const models = ["nissan", "toyota", "renault", "tesla"];
        const zones = ["A", "B", "C", "D"];

        const mockData = [];

        for (let i = 1; i <= 1000; i++) {
            const vin = i.toString().padStart(18, '0');
            const chasis = i.toString().padStart(10, '0');
            mockData.push({
                checklist: {
                    tires: faker.datatype.boolean(),
                    interior: faker.datatype.boolean(),
                    exterior: faker.datatype.boolean(),
                    undervehicle: faker.datatype.boolean(),
                    underhood: faker.datatype.boolean(),
                },
                model: faker.helpers.arrayElement(models),
                zone: faker.helpers.arrayElement(zones),
                vin: vin,
                chasis: chasis,
                operator: faker.helpers.arrayElement(operators),
                status: faker.helpers.arrayElement(statuses),
                created: faker.date.recent(),
                __v: 0
            });
        }

        await vehicleData.insertMany(mockData);
        console.log("✅ Seeded 1000 vehicle records successfully.");
    } catch (err) {
        console.error("❌ Error during seeding:", err);
    }
};

module.exports = { seed };
