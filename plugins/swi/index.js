const SWI = (globalConfig) => {
  const METRICS = ['water-cloud', 'water-power'];
  const metadata = {
    kind: "execute",
  };

  const validateInput = (input) => {
    if (typeof input[METRICS[0]] !== 'number' || typeof input[METRICS[1]] !== 'number') {
        throw new Error('water-cloud and water-power must be numbers.');
    }

    return input;
  };

  const execute = async (inputs, config) => {
    var result = [];

    for(i=0; i<inputs.length; i++){

      var safeInput = validateInput(inputs[i]);

      var waterCloud = safeInput[METRICS[0]];
      var waterPower = safeInput[METRICS[1]];

      var totalWaterConsumption = waterCloud + waterPower;

      result[i] = {
        ...safeInput, 
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
