# if-risk-scorecard

`swi` is an ........(Description goes here)

## Implementation

We plan to create a YAML or possibly an exhaust plugin that produces a rating for processes or services running on known cloud VMs.


## Testing model integration

### Using local links

For using locally developed model in `IF Framework` please follow these steps: 

1. On the root level of a locally developed model run `npm link`, which will create global package. It uses `package.json` file's `name` field as a package name. Additionally name can be checked by running `npm ls -g --depth=0 --link=true`.

```
npm link
```

```
npm link risk-scorecard
```

2. Use the linked model in impl by specifying `name`, `method`, `path` in initialize models section. 

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
...
```
Make sure you have installed impact-framework by running 

```
npm install -g "@grnsft/if"
```

Now, when you run the `manifest` using the IF CLI, it will load the model automatically. Run using:

```sh
ie --manifest ./swi/swi.yml
```
