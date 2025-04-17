const vehicleData = require("../models/vehiclemodel");
const { faker } = require('@faker-js/faker');

const seed = async () => {
    try {
        const operators = ["John Doe", "SaiTeja", "Alex", "Maria", "Liam"];
        const models = ["nissan", "toyota", "renault", "tesla"];
        const zones = ["A", "B", "C", "D"];

        const mockData = [];

        for (let i = 0; i <= 100000; i++) {
            const model = faker.helpers.arrayElement(models);
            const zone = faker.helpers.arrayElement(zones);
            const vin = `${zone}${model[0].toLocaleUpperCase()}${model[1].toLocaleUpperCase()}2025` + i.toString().padStart(11, 0);
            const chasis = i.toString().padStart(10, '0');

            const checklist = {
                tires: faker.datatype.boolean(),
                interior: faker.datatype.boolean(),
                exterior: faker.datatype.boolean(),
                undervehicle: faker.datatype.boolean(),
                underhood: faker.datatype.boolean(),
            };

            // Determine status based on checklist
            const checklistValues = Object.values(checklist);
            let status;
            if (checklistValues.every(v => v === true)) {
                status = "done";
            } else if (checklistValues.every(v => v === false)) {
                status = "todo";
            } else {
                status = "inprogress";
            }

            mockData.push({
                checklist,
                model,
                zone,
                vin,
                chasis,
                operator: faker.helpers.arrayElement(operators),
                status,
                created: faker.date.recent(),
                __v: 0
            });
        }

        await vehicleData.insertMany(mockData);
        console.log("✅ Seeded 100000 vehicle records successfully.");
    } catch (err) {
        console.error("❌ Error during seeding:", err);
    }
};

module.exports = { seed };
