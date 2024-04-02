const { fetchPowerConsumption } = require('./electricityMap');

const WaterGeneration = (globalConfig) => {
  const metadata = {
    kind: "execute",
  };

  const execute = async (inputs, config) => {
    const WATER_AVARAGE = 1.8;

    var energy = inputs[0].energy;
    const [latitude, longitude] = inputs[0].geolocation.split(',');

    const result = await fetchPowerConsumption(latitude, longitude);
    var waterConsumption = energy * result.totalConsumption;

    return [
      {
        ...inputs[0], 
        ["water-power"]: waterConsumption,
        ["country"]: result.country
      }
    ];
  };

  return {
    metadata,
    execute,
  };
};

exports.WaterGeneration = WaterGeneration;
