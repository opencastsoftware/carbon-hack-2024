const fs = require('fs');
const csv = require('csv-parser');

const RagRating = (globalConfig) => {
    const metadata = {
        kind: 'execute',
    };

    var lower_value = 'lower-value';
    var upper_value = 'upper-value';

    
    const validateInput = (config) => {
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

    const getBandsForSwi = (country) => {
        return new Promise((resolve, reject) => {
            const csvFilePath = 'data/rag_bands_ranges_for_water.csv';
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
                        if (data[i].country == country) {
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
                    reject(new Error('SWI band record not found')); // Reject promise if record is not found
                });
        });
    };

    const getBandsForSci = (country) => {
        return new Promise((resolve, reject) => {
            const csvFilePath = 'data/rag_bands_ranges_for_carbon.csv';
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
                        if (data[i].country == country) {
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
                    reject(new Error('Sci band record not found')); // Reject promise if record is not found
                });
        });
    };
    
    const execute = async (inputs, config) => {
        try {

            // RAG Rating for Water
            const swiBand = await getBandsForSwi(inputs[0].country);
            var waterConsumption = inputs.swi;
            var riskColorForWater = '';
            if(waterConsumption < parseFloat(swiBand.low_upper_band)){
                riskColorForWater = 'green';
            }
            else if(waterConsumption < parseFloat(swiBand.medium_upper_band)) {
                riskColorForWater = "amber";
            }
            else
            {
                riskColorForWater = 'red';
            }

            // RAG Rating for Energy
            const sciBands = await getBandsForSci(inputs[0].country);
            var carbonConsumption = inputs.sci;
            var riskColorForCarbon = '';
            if(carbonConsumption < parseFloat(sciBands.low_upper_band)){
                riskColorForCarbon = 'green';
            }
            else if(carbonConsumption < parseFloat(sciBands.medium_upper_band)) {
                riskColorForCarbon = "amber";
            }
            else
            {
                riskColorForCarbon = 'red';
            }

            return [
                {
                  ...inputs[0],
                  ["swi-rating"]: riskColorForWater,
                  ["sci-rating"]: riskColorForCarbon
                }];
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

exports.RagRating = RagRating; 