const fs = require('fs');
const csv = require('csv-parser');

const SWI = (globalConfig) => {
    console.log(globalConfig);
    const metadata = {
        kind: 'execute',
    };

    const getRecord = (config, callback) => {
        
        const csvFilePath = 'data/min_water_consumption_per_country_year 1.csv';
        const data = [];

        fs.createReadStream(csvFilePath).pipe(csv()).on('data', (row) => {
            data.push(row);
        })
        .on('end', ()=> {
            const country = config['country'];
            const year = config['year'];

            for (let i = 0; i < data.length; i++) {
                if(data[i].country == country && data[i].year == year){
                    result = {
                        country: data[i].country,
                        year: data[i].year,
                        min_water: data[i].min_water,
                        max_water: data[i].max_water,
                        estimate_water: data[i].estimate_water
                    };
                    break;
                }
            }

            callback(null, result);
        })
        .on('error', (error) => {
            console.error(error);
            callback(error, null);
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
        
        await getRecord(config, (error, result)=> {
            // Water Consumption (liters) = 23.946 kWh * (1.8 liters/kWh + 7.6 liters/kWh) = 225.4 liters
            var waterConsumption = energyConsumption * (WATER_AVARAGE + parseFloat(result.estimate_water));
            console.log(waterConsumption);

            return {['waterConsumption']: waterConsumption};
        });

        //console.log(config);
        //console.log(inputs);
        //return {['energyConsumption']: energyConsumption};
    }

    return {
        metadata,
        execute,
    };
};

exports.SWI = SWI; 