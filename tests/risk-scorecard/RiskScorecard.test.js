const { RiskScorecard } = require('../../plugins/risk-scorecard/index');

describe('RiskScorecard', () => {
    const riskScorecard = RiskScorecard({});

    describe('execute', () => {

        test('should throw error if config is invalid', async () => {
            const inputs = [{ sci: 15 }];
            const config = { 'upper-value': 'not a number', 'lower-value': 10 };
            await expect(riskScorecard.execute(inputs, config)).rejects.toThrow('upper-value and lower-value must be numbers');
        });

        test('should throw error if config is invalid', async () => {
            const inputs = [{ sci: 15 }];
            const config = { 'upper-value': 5, 'lower-value': 10 };
            await expect(riskScorecard.execute(inputs, config)).rejects.toThrow('lower-value can not be greater than or equal to upper value');
        });

        test('should return green risk color if sci is less than lower value', async () => {
            const inputs = [{ sci: 5 }];
            const config = { 'upper-value': 20, 'lower-value': 10 };
            const result = await riskScorecard.execute(inputs, config);
            expect(result['risk-color']).toBe('green');
        });

        test('should return amber risk color if sci is greater than lower value and less than upper value', async () => {
            const inputs = [{ sci: 15 }];
            const config = { 'upper-value': 20, 'lower-value': 10 };
            const result = await riskScorecard.execute(inputs, config);
            expect(result['risk-color']).toBe('amber');
        });

        test('should return red risk color if sci is greater than upper value', async () => {
            const inputs = [{ sci: 25 }];
            const config = { 'upper-value': 20, 'lower-value': 10 };
            const result = await riskScorecard.execute(inputs, config);
            expect(result['risk-color']).toBe('red');
        });
    });
});