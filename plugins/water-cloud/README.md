# water-cloud

`water-cloud` is a generic plugin for calculating the water consumption by datacenters



## Parameters

### Plugin config

Two parameters are required in global config: `input-parameters` and `output-parameter`.

`input-parameters`: an array of strings. Each string should match an existing key in the `inputs` array
`output-parameter`: a string defining the name to use to add the product of the input parameters to the output array.

### Inputs

All of `input-parameters` must be available in the input array.

## Returns

- `output-parameter`: the product of all `input-parameters` with the parameter name defined by `output-parameter` in global config.

## Calculation

```pseudocode
WATER_AVARAGE = 1.8

output = energy * WATER_AVARAGE
```

## Implementation

To run the plugin, you must first create an instance of `water-cloud`. Then, you can call `execute()`.

```javascript
const WaterCloud = (globalConfig) => {
  const metadata = {
    kind: "execute",
  };

  const validateInput = (input) => {
    if (typeof input.energy !== 'number') {
        throw new Error('energy must be numbers.');
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


```

## Example manifest

IF users will typically call the plugin as part of a pipeline defined in a manifest file. In this case, instantiating the plugin is handled by the user because we dont currently have the plugins as part of official or unofficial plugin `npm link water-cloud`. The following is an example manifest that calls `water-cloud`:

```yaml
name: water-cloud manifest
description: example impl invoking water cloud plugin
tags:
initialize:
  plugins:
    water-cloud:
      method: WaterCloud
      path: 'water-cloud'
      global-config:
        keep-exisiting: true
tree:
  pipeline:
    - water-cloud
  config:
    water-cloud:
  inputs:
    - timestamp: 2024-04-01T00:00 
      duration: 100
      energy: 10
    - timestamp: 2024-04-01T00:00 
      duration: 200
      energy: 20
    - timestamp: 2024-04-01T00:00 
      duration: 300
      energy: 30
```

You can run this example by saving it as `./examples/manifests/water-cloud.yml` and executing the following command from the project root:

```sh
npm link water-cloud
ie --manifest ./examples/manifests/water-cloud/water-cloud.yml --output ./examples/outputs/water-cloud.yml
```

The results will be saved to a new `yaml` file in `./examples/outputs`