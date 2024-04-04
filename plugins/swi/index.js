//import { TIME_UNITS_IN_SECONDS } from './config.js';
const { TIME_UNITS_IN_SECONDS } = require('./config.js');

const SWI = (globalConfig) => {
  const METRICS = ['water-cloud', 'water-power'];
  const CONF = ['functional-unit'];
  const metadata = {
    kind: "execute",
  };

  const validateInput = (input, config) => {
    if (typeof input[METRICS[0]] !== 'number' || typeof input[METRICS[1]] !== 'number') {
      throw new Error('water-cloud and water-power must be numbers.');
    }
    if (typeof input[config[CONF[0]]] !== 'number' || typeof input[config[CONF[0]]] !== 'number') {
      throw new Error(config[CONF[0]] + ' is missing or must be a number.');
    }

    return input;
  };

  const validateConfig = (config) => {
    if (config[CONF[0]] === null || typeof config[CONF[0]] === 'undefined') {
      throw new Error('Invalid config.');
    }

    return config;
  };

  // Mapping functional-unit-time to seconds
  const convertSwiToTimeUnit =  (unit) => {
    const conversionFactor = TIME_UNITS_IN_SECONDS[unit];
    if(typeof conversionFactor === 'undefined'){
      throw new Error('functional-unit-time is not in recognized unit of time');
    }
    return conversionFactor;
  }; 

  const execute = async (inputs, config) => {
    var result = [];

    var safeConfig = validateConfig(config);

    for(i=0; i<inputs.length; i++){

      var safeInput = validateInput(inputs[i], safeConfig);

      var waterCloud = safeInput[METRICS[0]];
      var waterPower = safeInput[METRICS[1]];

      var swiValue = waterCloud + waterPower;
      var swiPerSecond = swiValue/safeInput.duration;

      if(typeof config['functional-unit-time'] === 'undefined'){
        result[i] = {
          ...safeInput, 
          ["swi"]: swiPerSecond/inputs[i][config['functional-unit']]
        }
      }
      else {
        const splits = config['functional-unit-time'].split(/[-_ ]/);

        swiPerSecond = swiValue * convertSwiToTimeUnit(splits[1]); 

        result[i] = {
          ...safeInput, 
          ["swi"]: swiPerSecond/inputs[i][config['functional-unit']]
        }
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
