# rag-rating - RED AMBER GREEN RATING

`rag-rating` is a generic plugin for outputing color representation

## Parameters

### Plugin config

### Plugin node config

- `swi-lower-band`: This represents the lower threshold or band for the SWI. It defines the boundary below which the SWI value is considered low risk.
- `swi-upper-band`: This represents the upper threshold or band for the SWI. It defines the boundary above which the SWI value is considered high risk.
- `sci-lower-band`: This represents the lower threshold or band for the SCI. It defines the boundary below which the SCI value is considered low risk.
- `sci-upper-band`: This represents the upper threshold or band for the SCI. It defines the boundary above which the SCI value is considered high risk.


### Inputs

- `swi`: swi value
- `sci`: sci value

and:

- `timestamp`: a timestamp for the input
- `duration`: the amount of time, in seconds, that the input covers.


## Returns

- `swi-rating`: SWI Red, Amber or Green rating
- `sci-rating`: SCI Red, Amber or Green rating

## Calculation

Rating is calculated as:

```pseudocode
Green < lower-band
Red > upper-band
lower-band > Amber < upper-band
```

## Implementation

To run the plugin, you must first create an instance of `rag-rating`. Then, you can call `execute()`.

```javascript
const { RagRating } = require('./index.js');

const ragRatingPlugin = RagRating({});

const inputs = [
    { swi: 10, sci: 20 },
    { swi: 15, sci: 25 }
];
const config = {
    'swi-lower-band': 5,
    'swi-upper-band': 15,
    'sci-lower-band': 10,
    'sci-upper-band': 20
};

const result = ragRatingPlugin.execute(inputs, config);

console.log(result);
```

## Example manifest

IF users will typically call the plugin as part of a pipeline defined in a manifest file. In this case, instantiating the plugin is handled by the user because we dont currently have the plugins as part of official or unofficial plugin `npm link rag-rating`. The following is an example manifest that calls `rag-rating`:

```yaml
name: RagRating
description: example impl invoking RagRating plugin
tags:
initialize:
  plugins:
    rag-rating:
      method: RagRating
      path: 'rag-rating'
      global-config:
        keep-exisiting: true
tree:
  pipeline:
    - rag-rating
  config:
    rag-rating:
  inputs:
    - timestamp: 2024-04-01T00:00 
      duration: 1000
      swi: 1
      sci: 10
    - timestamp: 2024-04-01T00:00 
      duration: 2000
      swi: 2
      sci: 20
    - timestamp: 2024-04-01T00:00 
      duration: 3000
      swi: 3
      sci: 30
```

You can run this example by saving it as `./examples/manifests/rag-ratin.yml` and executing the following command from the project root:

```sh
npm link rag-rating
ie --manifest ./examples/manifests/rag-rating/rag-rating.yml --output ./examples/outputs/rag-rating.yml
```

The results will be saved to a new `yaml` file in `./examples/outputs`