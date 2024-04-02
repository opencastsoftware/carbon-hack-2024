const WaterCloud = (globalConfig) => {
  console.log(globalConfig);
  const metadata = {
    kind: "execute",
  };

  const execute = async (inputs, config) => {
    const WATER_AVARAGE = 1.8;

    var energy = inputs[0].energy;

    var cloudWaterConsumption = energy * WATER_AVARAGE;

    return [
      {
        ["waterCloud"]: cloudWaterConsumption
      }
    ];
  };

  return {
    metadata,
    execute,
  };
};

exports.WaterCloud = WaterCloud;
