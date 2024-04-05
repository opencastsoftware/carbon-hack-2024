# Water Pipeline - Plugins

We created a plugin for a risk scorecard to assess environmental impact of a functional unit based on the Software Carbon Intensity (g CO2eq per R), Software Water Intensity (Liter per R) and energy (kWh). This gives users a way to classify a functional unit (eg. http request) in terms of its impact to the environment through three environmental concerns i.e. GHG emissions, water scarcity and energy inefficiency. Specific threshold levels needs to be configured for each RAG colour based on plugin/data available. 


## Implementations

- [water-cloud](./plugins/water-cloud/README.md)
- [water-generation](./plugins/water-generation/README.md)
- [swi](./plugins/swi/README.md)
- [rag-rating](./plugins/rag-rating/README.md)