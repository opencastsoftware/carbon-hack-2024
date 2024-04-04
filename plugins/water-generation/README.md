# water-generation

`water-generation` is a generic plugin for calculating the water consumption for power generation


## Parameters

### Plugin config

Two parameters are required in global config: `input-parameters` and `output-parameter`.

`input-parameters`: an array of strings. Each string should match an existing key in the `inputs` array
`output-parameter`: a string defining the name to use to add the product of the input parameters to the output array.

### Inputs

`energy`: total energy in kwh
`timestamp`: a timestamp for the input
`duration`: the amount of time, in seconds, that the input covers.


## Returns

- `output-parameter`: the product of all `input-parameters` with the parameter name defined by `output-parameter` in global config.

- water-power: It returns the water use per location.


## Calculation

```pseudocode
output = energy * consumptionResult.totalConsumption;
```

## Implementation

To run the plugin, you must first create an instance of `water-generation`. Then, you can call `execute()`.

```javascript
const { fetchPowerConsumption } = require('./electricityMap');

const WaterGeneration = (globalConfig) => {
  const metadata = {
    kind: "execute",
  };

  const execute = async (inputs, config) => {
    var result = [];

    for(i=0; i<inputs.length; i++){
      var energy = inputs[i].energy;
      const [latitude, longitude] = inputs[i].geolocation.split(',');
      const consumptionResult = await fetchPowerConsumption(latitude, longitude);
      var waterConsumption = energy * consumptionResult.totalConsumption;

      result[i] = {
        ...inputs[i], 
        ["water-power"]: waterConsumption,
        ["country"]: consumptionResult.country
      }
    }

    return result;
  };

  return {
    metadata,
    execute,
  };
};

exports.WaterGeneration = WaterGeneration;

```

## Example manifest

IF users will typically call the plugin as part of a pipeline defined in a manifest file. In this case, instantiating the plugin is handled by the user because we dont currently have the plugins as part of official or unofficial plugin `npm link water-generation`. The following is an example manifest that calls `water-generation`:

```yaml
name: water-generation manifest
description: example impl invoking water-generation plugin
tags:
initialize:
  plugins:
    water-generation:
      method: WaterGeneration
      path: 'water-generation'
      global-config:
        keep-exisiting: true
tree:
  pipeline:
    - water-generation
  config:
    water-generation:
  inputs:
    - timestamp: 2024-04-01T00:00 
      duration: 100
      energy: 10
      geolocation: 36.778259,-119.417931
    - timestamp: 2024-04-01T00:00 
      duration: 200
      energy: 20
      geolocation: 36.778259,-119.417931
    - timestamp: 2024-04-01T00:00 
      duration: 300
      energy: 30
      geolocation: 36.778259,-119.417931
```

You can run this example by saving it as `./examples/manifests/water-generation.yml` and executing the following command from the project root:

```sh
npm link water-generation
ie --manifest ./examples/manifests/water-generation/water-generation.yml --output ./examples/outputs/water-generation.yml
```

The results will be saved to a new `yaml` file in `./examples/outputs`