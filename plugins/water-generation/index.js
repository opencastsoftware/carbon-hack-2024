const { fetchPowerConsumption } = require('./electricityMap');

const WaterGeneration = (globalConfig) => {
  const metadata = {
    kind: "execute",
  };

  const execute = async (inputs, config) => {
    var result = [];

    for(i=0; i<inputs.length; i++){
      var energy = inputs[i].energy;
      const [latitude, longitude] = inputs[i].geolocation.split(',');
      const consumptionResult = await fetchPowerConsumption(latitude, longitude);
      var waterConsumption = energy * consumptionResult.totalConsumption;

      result[i] = {
        ...inputs[i], 
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
