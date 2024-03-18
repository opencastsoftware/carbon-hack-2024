const RiskScorecard = (globalConfig) => {
    console.log(globalConfig);
    const metadata = {
        kind: 'execute',
    };

    const execute = async (inputs, config) => {
        console.log(inputs);
        console.log(config);
    }

    return {
        metadata,
        execute,
    };
};

exports.RiskScorecard = RiskScorecard; 