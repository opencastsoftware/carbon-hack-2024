const { validateConfig, execute } = require('./plugins/risk-scorecard/index');

describe('RiskScorecard', () => {
    describe('validateConfig', () => {
        test('should throw error if upper-value is not a number', () => {
            const config = { 'upper-value': 'not a number', 'lower-value': 10 };
            expect(() => validateConfig(config)).toThrow('upper-value and lower-value must be numbers');
        });

        test('should throw error if lower-value is not a number', () => {
            const config = { 'upper-value': 20, 'lower-value': 'not a number' };
            expect(() => validateConfig(config)).toThrow('upper-value and lower-value must be numbers');
        });

        test('should return config if all validations pass', () => {
            const config = { 'upper-value': 20, 'lower-value': 10 };
            expect(validateConfig(config)).toEqual(config);
        });
    });

    describe('execute', () => {
        test('should return green risk color if sci is less than lower value', async () => {
            const inputs = [{ sci: 5 }];
            const config = { 'upper-value': 20, 'lower-value': 10 };
            const result = await execute(inputs, config);
            expect(result['risk-color']).toBe('green');
        });

        test('should return amber risk color if sci is less than upper value', async () => {
            const inputs = [{ sci: 15 }];
            const config = { 'upper-value': 20, 'lower-value': 10 };
            const result = await execute(inputs, config);
            expect(result['risk-color']).toBe('amber');
        });

        test('should return red risk color if sci is greater than upper value', async () => {
            const inputs = [{ sci: 25 }];
            const config = { 'upper-value': 20, 'lower-value': 10 };
            const result = await execute(inputs, config);
            expect(result['risk-color']).toBe('red');
        });
    });
});