const fs = require('fs');
const csv = require('csv-parser');

const RagRating = (globalConfig) => {
    const CONF = ['swi-lower-band', 'swi-upper-band', 'sci-lower-band', 'sci-upper-band'];
    const metadata = {
        kind: 'execute',
    };
    
    const validateInput = (input) => {
        if (typeof input.swi !== 'number' || typeof input.swi !== 'number') {
            throw new Error('SWI and SCI must be numbers.');
        }

        return input;
    };

    const validateConfig = (config) => {
        if (typeof config[CONF[0]] !== 'number' || typeof config[CONF[1]] !== 'number') {
            throw new Error('swi-lower-band and swi-upper-band must be numbers.');
        }
        if (typeof config[CONF[2]] !== 'number' || typeof config[CONF[3]] !== 'number') {
            throw new Error('sci-lower-band and sci-upper-band must be numbers.');
        }

        return config;
    };

    /*const getBandsForSwi = (country) => {
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
    };*/
    
    const execute = async (inputs, config) => {

        var result = [];

        for(i=0; i<inputs.length; i++){

            var safeInput = validateInput(inputs[i]);

            var safeConfig = validateConfig(config);

            // RAG Rating for Water
            var waterConsumption = safeInput.swi;
            var riskColorForWater = '';
            if(waterConsumption < safeConfig[CONF[0]] !== 'number'){
                riskColorForWater = 'green';
            }
            else if(waterConsumption < safeConfig[CONF[1]] !== 'number') {
                riskColorForWater = "amber";
            }
            else
            {
                riskColorForWater = 'red';
            }

            // RAG Rating for Energy
            var carbonConsumption = safeInput.sci;
            var riskColorForCarbon = '';
            if(carbonConsumption < safeConfig[CONF[2]] !== 'number'){
                riskColorForCarbon = 'green';
            }
            else if(carbonConsumption < safeConfig[CONF[3]] !== 'number') {
                riskColorForCarbon = "amber";
            }
            else
            {
                riskColorForCarbon = 'red';
            }

            result[i] = {
                ...safeInput,
                ["swi-rating"]: riskColorForWater,
                ["sci-rating"]: riskColorForCarbon
                };
        }

        return result;
    }

    return {
        metadata,
        execute,
    };
};

exports.RagRating = RagRating; 