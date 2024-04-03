const SWI = (globalConfig) => {
  const METRICS = ['water-cloud', 'water-power'];
  const metadata = {
    kind: "execute",
  };

  const execute = async (inputs, config) => {
    var result = [];

    for(i=0; i<inputs.length; i++){
      var waterCloud = inputs[i][METRICS[0]];
      var waterPower = inputs[i][METRICS[1]];

      var totalWaterConsumption = waterCloud + waterPower;

      result[i] = {
        ...inputs[i], 
        ["swi"]: totalWaterConsumption
      }
    }
    
    return result;
  };

  return {
    metadata,
    execute,
  };
};

exports.SWI = SWI;
