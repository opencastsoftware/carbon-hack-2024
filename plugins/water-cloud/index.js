const WaterCloud = (globalConfig) => {
  const metadata = {
    kind: "execute",
  };

  const validateInput = (input) => {
    if (typeof input.energy !== 'number') {
        throw new Error('energy must be a number');
    }

    return input;
  };

  const execute = async (inputs, config) => {
    const WATER_AVARAGE = 1.8;

    var result = [];
    
    for(i=0; i<inputs.length; i++){

      var safeInput = validateInput(inputs[i]);

      var energy = safeInput.energy;
      var cloudWaterConsumption = energy * WATER_AVARAGE;
      result[i] = { 
                    ...safeInput, 
                    ["water-cloud"]: cloudWaterConsumption 
                  };
    }
    return result;
  };

  return {
    metadata,
    execute,
  };
};

exports.WaterCloud = WaterCloud;
