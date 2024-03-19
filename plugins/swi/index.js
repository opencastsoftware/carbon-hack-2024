const SWI = (globalConfig) => {
    console.log(globalConfig);
    const metadata = {
        kind: 'execute',
    };

    const execute = async (inputs, config) => {
        console.log(config);
        console.log(inputs);
    }

    return {
        metadata,
        execute,
    };
};

exports.SWI = SWI; 