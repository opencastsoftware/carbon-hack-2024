const fs = require('fs');
const csv = require('csv-parser');

const RagRating = (globalConfig) => {
    const metadata = {
        kind: 'execute',
    };
    
    const validateInput = (input) => {
        if (typeof input.swi !== 'number' || typeof input.swi !== 'number') {
            throw new Error('SWI and SCI must be numbers.');
        }
        if (input.country === null || typeof input.country === 'undefined') {
            throw new Error('Country is not provided.');
        }

        return input;
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

            var result = [];

            for(i=0; i<inputs.length; i++){

                var safeInput = validateInput(inputs[i]);

                var country = safeInput.country;
                // RAG Rating for Water
                const swiBand = await getBandsForSwi(country);
                var waterConsumption = safeInput.swi;
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
                const sciBands = await getBandsForSci(country);
                var carbonConsumption = safeInput.sci;
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

                result[i] = {
                    ...safeInput,
                    ["swi-rating"]: riskColorForWater,
                    ["sci-rating"]: riskColorForCarbon
                  };
            }

            return result;
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