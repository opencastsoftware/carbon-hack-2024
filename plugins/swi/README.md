# swi - Software Water intensity

`swi` is a plugin that can output the Software Water Intensity value

## Parameters

### Plugin config

- `functional-unit`: the functional unit in which to express the water impact
- `functional-unit-time`: the time to be used for functional unit conversions, as a string composed of a value and a unit separated with a space, hyphen or underscore, e.g. `2 mins`, `5-days`, `3_years`

### Inputs

- `water-cloud`: water-cloud value
- `water-power`: water-power value

and:

- `timestamp`: a timestamp for the input
- `duration`: the amount of time, in seconds, that the input covers.

## Returns

- `swi`: value

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
const { SWI } = require('./index.js');

const swiPlugin = SWI({});

const config = {
    'functional-unit': 'deployments',
    'functional-unit-time': '1 hour'
};

const inputs = [
    { 'water-cloud': 10, 'water-power': 20, duration: 60, 'deployments': 5 },
    { 'water-cloud': 15, 'water-power': 25, duration: 60, 'deployments': 8 }
];

const result = swiPlugin.execute(inputs, config);

console.log(result);
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
      functional-unit: requests
      functional-unit-time: 1 hours
  inputs:
    - timestamp: 2024-04-01T00:00 
      duration: 100
      water-cloud: 10
      water-power: 10
      requests: 100
    - timestamp: 2024-04-01T00:00 
      duration: 200
      water-cloud: 20
      water-power: 20
      requests: 100
    - timestamp: 2024-04-01T00:00 
      duration: 300
      water-cloud: 30
      water-power: 30
      requests: 100
```

You can run this example by saving it as `./examples/manifests/swi.yml` and executing the following command from the project root:

```sh
npm link swi
ie --manifest ./examples/manifests/swi/swi.yml --output ./examples/outputs/swi.yml
```

The results will be saved to a new `yaml` file in `./examples/outputs`