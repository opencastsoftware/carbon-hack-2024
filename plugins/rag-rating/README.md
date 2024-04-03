# rag-rating - RED AMBER GREEN RATING

`rag-rating` is a generic plugin for outputing color representation ....



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

output = ........
```

## Implementation

To run the plugin, you must first create an instance of `rag-rating`. Then, you can call `execute()`.

```javascript
const RagRating = (globalConfig) => {
    const metadata = {
        kind: 'execute',
    }; 
  
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
      country: USA
      swi: 1
      sci: 10
    - timestamp: 2024-04-01T00:00 
      duration: 2000
      country: Brazil
      swi: 2
      sci: 20
    - timestamp: 2024-04-01T00:00 
      duration: 3000
      country: Denmark
      swi: 3
      sci: 30
```

You can run this example by saving it as `./examples/manifests/rag-ratin.yml` and executing the following command from the project root:

```sh
npm link rag-rating
ie --manifest ./examples/manifests/rag-rating/rag-rating.yml --output ./examples/outputs/rag-rating.yml
```

The results will be saved to a new `yaml` file in `./examples/outputs`