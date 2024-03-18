const RiskScorecard = (globalConfig) => {
    console.log(globalConfig);
    const metadata = {
        kind: 'execute',
    };

    const execute = async (inputs, config) => {
        console.log("config");
        console.log(config);
        console.log("inputs");
        console.log(inputs);
        const upperValue = config['upper-value'];
        const lowerValue = config['lower-value'];

        console.log("upper value: " + upperValue);
        console.log("lower value: " + lowerValue);

        var sci = inputs[0].sci

        console.log(sci);
        
        var riskColor = '';
        if(sci < lowerValue){
            riskColor = 'green';
        }
        else if(sci < upperValue) {
            riskColor = "amber";
        }
        else
        {
            riskColor = 'red';
        }

        console.log("risk color: " + riskColor);
        return riskColor;
    }

    return {
        metadata,
        execute,
    };
};

exports.RiskScorecard = RiskScorecard; 