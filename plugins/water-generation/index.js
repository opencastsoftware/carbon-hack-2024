const { fetchPowerConsumption } = require('./electricityMap');

const WaterGeneration = (globalConfig) => {
  const metadata = {
    kind: "execute",
  };

  const validateInput = (input) => {
    if (typeof input.energy !== 'number') {
      throw new Error('energy must be a number');
    }

    var regex = new RegExp('^\\-?\\d{1,3}\\.\\d+,-?\\d{1,3}\\.\\d+$');

    if (!regex.test(input.geolocation)){
      throw new Error('not a comma-separated string consisting of `latitude` and `longitude`');
    }

    return input;
  };

  const execute = async (inputs, config) => {
    var result = [];

    for(i=0; i<inputs.length; i++){

      var safeInput = validateInput(inputs[i]);

      var energy = safeInput.energy;
      const [latitude, longitude] = safeInput.geolocation.split(',');
      const consumptionResult = await fetchPowerConsumption(latitude, longitude);
      var waterConsumption = energy * consumptionResult.totalConsumption;

      result[i] = {
        ...safeInput, 
        ["water-power"]: waterConsumption,
        ["country"]: consumptionResult.country
      }
    }

    return result;
  };

  return {
    metadata,
    execute,
  };
};

exports.WaterGeneration = WaterGeneration;
