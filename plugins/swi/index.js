const fs = require('fs');
const csv = require('csv-parser');

const SWI = (globalConfig) => {
    console.log(globalConfig);
    const metadata = {
        kind: 'execute',
    };

    const getRecord = (config) => {
        return new Promise((resolve, reject) => {
            const csvFilePath = 'data/min_water_consumption_per_country_year 1.csv';
            const data = [];

            const readStream = fs.createReadStream(csvFilePath);

            readStream
                .on('error', (error) => {
                    reject(error);
                })
                .pipe(csv())
                .on('data', (row) => {
                    data.push(row);
                })
                .on('end', () => {
                    const country = config['country'];
                    const year = config['year'];

                    for (let i = 0; i < data.length; i++) {
                        if (data[i].country == country && data[i].year == year) {
                            const result = {
                                country: data[i].country,
                                year: data[i].year,
                                min_water: data[i].min_water,
                                max_water: data[i].max_water,
                                estimate_water: data[i].estimate_water
                            };
                            resolve(result);
                            return; // Exit loop once the result is found
                        }
                    }
                    reject(new Error('Record not found')); // Reject promise if record is not found
                });
        });
    };

    const execute = async (inputs, config) => {

        const WATER_AVARAGE = 1.8; //+ 0.29058825752939393

        var serverUtilization = inputs[0].serverUtilization;
        var numberOfHours = inputs[0].numberOfHours;
        var numberOfCores = inputs[0].numberOfCores;
        var tdp = inputs[0].tdp;
        var tdpCoefficient = inputs[0].tdpCoefficient;

        var energyConsumption = serverUtilization * numberOfHours * numberOfCores * tdp * tdpCoefficient;
        
        try {
            const result = await getRecord(config);
            const waterConsumption = energyConsumption * (WATER_AVARAGE + parseFloat(result.estimate_water));
            console.log(waterConsumption);
            return { ['waterConsumption']: waterConsumption };
        } catch (error) {
            console.error(error);
            return { error: error.message };
        }
    }

    return {
        metadata,
        execute,
    };
};

exports.SWI = SWI; 