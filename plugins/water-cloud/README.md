# water-cloud

`water-cloud` is a generic plugin for calculating the water consumption by datacenters



## Parameters

### Plugin config

Not required.

### Inputs

- `energy`: energy used.

and:

- `timestamp`: a timestamp for the input
- `duration`: the amount of time, in seconds, that the input covers.

## Returns

- `water-cloud`: the amount of water used.

## Calculation

```pseudocode
WATER_AVARAGE = 1.8

output = energy * WATER_AVARAGE
```

## Implementation

To run the plugin, you must first create an instance of `water-cloud`. Then, you can call `execute()`.

```javascript
const { WaterCloud } = require('./index.js');

const waterCloudPlugin = WaterCloud({});

const inputs = [
    { energy: 10 },
    { energy: 15 }
];

const result = waterCloudPlugin.execute(inputs, {});

console.log(result);
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