const WaterCloud = (globalConfig) => {
  const metadata = {
    kind: "execute",
  };

  const execute = async (inputs, config) => {
    const WATER_AVARAGE = 1.8;

    var result = [];
    
    for(i=0; i<inputs.length; i++){
      var energy = inputs[i].energy;
      var cloudWaterConsumption = energy * WATER_AVARAGE;
      result[i] = { ... inputs[i], ["water-cloud"]: cloudWaterConsumption };
    }
    return result;
  };

  return {
    metadata,
    execute,
  };
};

exports.WaterCloud = WaterCloud;
