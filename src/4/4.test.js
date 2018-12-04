import { processInputs, partOne, partTwo } from './index';
import testInput from './input.test.txt';
import input from './input.txt';

describe('Test Input', () => {
    const processedTestInput = processInputs(testInput);

    test('Part One Should Return 240', () => {
        expect(partOne(processedTestInput)).toBe(240);
    });

    test('Part Two Should Return 4455', () => {
        expect(partTwo(processedTestInput)).toBe(4455);
    });
});

describe('Challenge Input', () => {
    const processedInput = processInputs(input);

    test('Part One Should Return 240', () => {
        expect(partOne(processedInput)).toBe(12169);
    });

    test('Part Two Should Return 4455', () => {
        expect(partTwo(processedInput)).toBe(16164);
    });
});