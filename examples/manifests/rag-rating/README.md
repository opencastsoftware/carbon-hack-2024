# if-risk-scorecard

`RagRating` is an ........(Description goes here)

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
npm link RagRating
```

2. Use the linked model in impl by specifying `name`, `method`, `path` in initialize models section. 

```yaml
name: RagRating Manifest
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
...
```
Make sure you have installed impact-framework by running 

```
npm install -g "@grnsft/if"
```

Now, when you run the `manifest` using the IF CLI, it will load the model automatically. Run using:

```sh
ie --manifest ./rag-rating/rag-rating.yml
```
