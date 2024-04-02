const WaterCloud = (globalConfig) => {
  const metadata = {
    kind: "execute",
  };

  const execute = async (inputs, config) => {
    const WATER_AVARAGE = 1.8;

    var energy = inputs[0].energy;

    var cloudWaterConsumption = energy * WATER_AVARAGE;

    return [
      {
        ...inputs[0], 
        ["water-cloud"]: cloudWaterConsumption
      }
    ];
  };

  return {
    metadata,
    execute,
  };
};

exports.WaterCloud = WaterCloud;
