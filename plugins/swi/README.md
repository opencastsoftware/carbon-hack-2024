# swi - Software Water intensity

`swi` is a generic plugin for outputing color representation ....



## Parameters

### Plugin config

Two parameters are required in global config: `input-parameters` and `output-parameter`.

`input-parameters`: an array of strings. Each string should match an existing key in the `inputs` array
`output-parameter`: a string defining the name to use to add the product of the input parameters to the output array.

### Inputs

All of `input-parameters` must be available in the input array.

## Returns

- `output-parameter`: the product of all `input-parameters` with the parameter name defined by `output-parameter` in global config.

SWI = ((E*(I1+I2)) +M) per R
where 

`E` is the energy consumed by software, in kWh
`I1` is the water used for producing electricity, per kWh of energy in Liter/kWh (water-generation)
`I2` is the water used for cooling data centres, per kWh of energy in Liter/kWh (water-cloud)
`M `is the water used during the creation and destruction of hardware that the software is running on (water-embodied). 
`R` is the functional unit; this is how software scales

## Calculation

```pseudocode

output = waterCloud + waterPower
```

## Implementation

To run the plugin, you must first create an instance of `swi`. Then, you can call `execute()`.

```javascript
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
  
```

## Example manifest

IF users will typically call the plugin as part of a pipeline defined in a manifest file. In this case, instantiating the plugin is handled by the user because we dont currently have the plugins as part of official or unofficial plugin `npm link swi`. The following is an example manifest that calls `swi`:

```yaml
name: swi manifest
description: example impl invoking swi plugin
tags:
initialize:
  plugins:
    swi:
      method: SWI
      path: 'swi'
      global-config:
        keep-exisiting: true
tree:
  pipeline:
    - swi
  config:
    swi:
  inputs:
    - timestamp: 2024-04-01T00:00 
      duration: 100
      water-cloud: 10
      water-power: 10
    - timestamp: 2024-04-01T00:00 
      duration: 200
      water-cloud: 20
      water-power: 20
    - timestamp: 2024-04-01T00:00 
      duration: 300
      water-cloud: 30
      water-power: 30
```

You can run this example by saving it as `./examples/manifests/swi.yml` and executing the following command from the project root:

```sh
npm link swi
ie --manifest ./examples/manifests/swi/swi.yml --output ./examples/outputs/swi.yml
```

The results will be saved to a new `yaml` file in `./examples/outputs`