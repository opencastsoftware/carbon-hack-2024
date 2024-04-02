const SWI = (globalConfig) => {
  console.log(globalConfig);
  const metadata = {
    kind: "execute",
  };

  const execute = async (inputs, config) => {

    console.log(inputs);

    var waterCloud = inputs[0].waterCloud;
    var waterPower = inputs[0].waterPower;

    var totalWaterConsumption = waterCloud + waterPower;

      return [
        {
          ["swi"]: totalWaterConsumption
        },
      ];
  };

  return {
    metadata,
    execute,
  };
};

exports.SWI = SWI;
