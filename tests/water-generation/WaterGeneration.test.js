const { WaterGeneration } = require('../../plugins/water-generation/index');
const { fetchPowerConsumption } = require('../../plugins/water-generation/electricityMap');
jest.mock('../../plugins/water-generation/electricityMap');

describe('WaterGeneration', () => {
    const waterGeneration = WaterGeneration({});

    describe('execute', () => {

        test('should throw error if input energy is invalid', async () => {
            const inputs = [{ energy: 'test', geolocation: '36.778259,-119.417931' }];
            const config = [];
            await expect(waterGeneration.execute(inputs, config)).rejects.toThrow('energy must be a number');
        });

        test.each([
            ['36.778259'],
            ['36.778259,36.778259,-119.417931'],
            [''],
        ])('should throw error if input gelocation is invalid', async (coordinates) => {
            const inputs = [{ energy: 10, geolocation: coordinates }];
            const config = [];
            await expect(waterGeneration.execute(inputs, config)).rejects.toThrow('not a comma-separated string consisting of `latitude` and `longitude`');
        });

        test('should return valid output if input is valid', async () => {
            fetchPowerConsumption.mockResolvedValue({ totalConsumption: 30, country: 'Englad' });
            const inputs = [{ energy: 10, geolocation: '36.778259,-119.417931' }];
            const config = [];
            const result = await waterGeneration.execute(inputs, config);
            expect(result[0]).toStrictEqual({ 'country': 'Englad', 'energy': 10, 'geolocation': '36.778259,-119.417931', 'water-power': 300 });
        });
    });
});