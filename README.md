# if-risk-scorecard

`risk-scorecard` is an ........(Description goes here)

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
name: risk-scorecard
description: simple demo invoking risk-scorecard plugin
tags:
initialize:
  plugins:
    risk-scorecard:
      method: RiskScorecard
      path: 'risk-scorecard'
      global-config:
        keep-exisiting: true
tree:
  children:
    child:
      pipeline:
        - risk-scorecard
      config:
      inputs:
        - timestamp: 2023-07-06T00:00
          cloud/vendor: aws
          cloud/instance-type: m5n.large
          duration: 100
          cpu/utilization: 10
...
```
Make sure you have installed impact-framework by running 

```
npm install -g "@grnsft/if"
```

Now, when you run the `manifest` using the IF CLI, it will load the model automatically. Run using:

```sh
ie --manifest ./risk-scorecard/risk-swi.yml
```
