const WaterGeneration = (globalConfig) => {
  const metadata = {
    kind: "execute",
  };

  const getWaterConsumption = (location) => {
    if(location == 'GB'){
      return 10;
    }
    return 0;
  };

  const execute = async (inputs, config) => {
    const WATER_AVARAGE = 1.8;

    var energy = inputs[0].energy;
    var location = inputs[0].location;

    var warerConsumption = getWaterConsumption(location);

    var waterConsumption = energy * warerConsumption;

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
