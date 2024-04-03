const { SWI } = require('../../plugins/swi/index');

describe('SWI', () => {
    const mockConfig = { "functional-unit": 'someValue' };
    const swi = SWI({}); 

    describe('execute', () => {

        test('should throw error if water-cloud and water-power are not numbers', async () => {
            const inputs = [{ 'water-cloud': 'notANumber', 'water-power': 20 }];
            await expect(async () => {
                await swi.execute(inputs, mockConfig);
            }).rejects.toThrow('water-cloud and water-power must be numbers');
        });

        test('should calculate SWI for valid inputs', async () => {
            const inputs = [{ 'water-cloud': 10, 'water-power': 20, 'someValue': 5 }];
            const expectedResult = [{ 'water-cloud': 10, 'water-power': 20, 'someValue': 5, 'swi': 6 }];
            const result = await swi.execute(inputs, mockConfig);
            expect(result).toEqual(expectedResult);
        });

        test('should throw error if config is missing', async () => {
            const inputs = [{ 'water-cloud': 10, 'water-power': 20 }];
            await expect(async () => {
                await swi.execute(inputs, {});
            }).rejects.toThrow('Invalid config.');
        });
        
        test('should throw error if functional unit is not a number', async () => {
            const inputs = [{ 'water-cloud': 10, 'water-power': 20 }];
            const config = { "functional-unit": 'notANumber' };
            await expect(async () => {
                await swi.execute(inputs, config);
            }).rejects.toThrow('functional-unit is missing or must be a number.');
        });
        
        test('should calculate SWI for multiple valid inputs', async () => {
            const inputs = [
                { 'water-cloud': 10, 'water-power': 20, 'functional-unit': 5 },
                { 'water-cloud': 15, 'water-power': 25, 'functional-unit': 10 },
                { 'water-cloud': 20, 'water-power': 30, 'functional-unit': 15 }
            ];
            const config = { "functional-unit": 5 };
            const expectedResult = [
                { 'water-cloud': 10, 'water-power': 20, 'functional-unit': 5, 'swi': 6 },
                { 'water-cloud': 15, 'water-power': 25, 'functional-unit': 10, 'swi': 4 },
                { 'water-cloud': 20, 'water-power': 30, 'functional-unit': 15, 'swi': 3 }
            ];
            const result = await swi.execute(inputs, config);
            expect(result).toEqual(expectedResult);
        });
        
        test('should handle zero division for functional unit', async () => {
            const inputs = [{ 'water-cloud': 10, 'water-power': 20, 'functional-unit': 0 }];
            const config = { "functional-unit": 0 };
            const expectedResult = [{ 'water-cloud': 10, 'water-power': 20, 'functional-unit': 0, 'swi': Infinity }];
            const result = await swi.execute(inputs, config);
            expect(result).toEqual(expectedResult);
        });        
    });
});