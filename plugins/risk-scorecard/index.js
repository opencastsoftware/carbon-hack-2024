const fs = require('fs');
const csv = require('csv-parser');

const RiskScorecard = (globalConfig) => {
    console.log(globalConfig);
    const metadata = {
        kind: 'execute',
    };

    var lower_value = 'lower-value';
    var upper_value = 'upper-value';

    
    const validateConfig = (config) => {
        // Example validation: Check if upper-value and lower-value are numbers
        if (typeof config[upper_value] !== 'number' || typeof config[lower_value] !== 'number') {
            throw new Error('upper-value and lower-value must be numbers');
        }
        // check if lower value is greater than upper value
        if ( config[lower_value] >= config[upper_value]) {
            throw new Error('lower-value can not be greater than or equal to upper value');
        }

        return config;
    };

    const getBands = (country, hours) => {
        return new Promise((resolve, reject) => {
            const csvFilePath = 'data/rag_bands_ranges 1.csv';
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
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].country == country && data[i].number_of_hours == hours) {
                            const result = {
                                country: data[i].country,
                                number_of_hours: data[i].number_of_hours,
                                low_upper_band: data[i].low_upper_band,
                                medium_upper_band: data[i].medium_upper_band
                            };
                            resolve(result);
                            return; // Exit loop once the result is found
                        }
                    }
                    reject(new Error('Band record not found')); // Reject promise if record is not found
                });
        });
    };
    
    const execute = async (inputs, config) => {
        try {
            const bands = await getBands(inputs[0].country, inputs[0].numberOfHours);
            waterConsumption = inputs.waterConsumption;
            console.log(bands)
            var riskColor = '';
            if(waterConsumption < parseFloat(bands.low_upper_band)){
                riskColor = 'green';
            }
            else if(waterConsumption < parseFloat(bands.medium_upper_band)) {
                riskColor = "amber";
            }
            else
            {
                riskColor = 'red';
            }

            return {['risk-color']: riskColor};
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

exports.RiskScorecard = RiskScorecard; 