const RiskScorecard = (globalConfig) => {
    console.log(globalConfig);
    const metadata = {
        kind: 'execute',
    };

    var lower_value = 'lower-value';
    var upper_value = 'upper-value';

    
    const validateConfig = (config) => {
        // Example validation: Check if upper-value and lower-value are numbers
        if (typeof config[upper_value] !== 'number' || typeof config[lower_value] !== 'number') {
            throw new Error('upper-value and lower-value must be numbers');
        }
        // check if lower value is greater than upper value
        if ( config[lower_value] >= config[upper_value]) {
            throw new Error('lower-value can not be greater than or equal to upper value');
        }

        return config;
    };
    const execute = async (inputs, config) => {
        console.log("config");
        console.log(config);
        console.log("inputs");
        console.log(inputs);
        var safeConfig = validateConfig(config);
        const upperValue = safeConfig[upper_value];
        const lowerValue = safeConfig[lower_value];

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
        return {['risk-color']: riskColor};
    }

    return {
        metadata,
        execute,
    };
};

exports.RiskScorecard = RiskScorecard; 