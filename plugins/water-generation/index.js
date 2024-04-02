const { fetchPowerConsumption } = require('./electricityMap');

const WaterGeneration = (globalConfig) => {
  const metadata = {
    kind: "execute",
  };

  const execute = async (inputs, config) => {
    const WATER_AVARAGE = 1.8;

    var energy = inputs[0].energy;
    var location = inputs[0].location;

    const totalConsumption = await fetchPowerConsumption(location);
    console.log(totalConsumption);

    var waterConsumption = energy * totalConsumption;

    return [
      {
        ...inputs[0], ["water-power"]: waterConsumption
      }
    ];
  };

  return {
    metadata,
    execute,
  };
};

exports.WaterGeneration = WaterGeneration;
