const SWI = (globalConfig) => {
  const METRICS = ['water-cloud', 'water-power'];
  const metadata = {
    kind: "execute",
  };

  const execute = async (inputs, config) => {
    var waterCloud = inputs[0][METRICS[0]];
    var waterPower = inputs[0][METRICS[1]];

    var totalWaterConsumption = waterCloud + waterPower;

      return [
        {
          ...inputs[0], ["swi"]: totalWaterConsumption
        },
      ];
  };

  return {
    metadata,
    execute,
  };
};

exports.SWI = SWI;
