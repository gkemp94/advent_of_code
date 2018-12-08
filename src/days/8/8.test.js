import { partOne, partTwo, processInput } from './index';
import input from './input.txt';
import inputTest from './input.test.txt';

describe('Part One', () => {
    test('Part One Should Return 138 on Test Input', () => {
        expect(partOne(processInput(inputTest))).toBe(138);
    });

    test('Part One Should Return Correct Answer on Challenge Input', () => {
        expect(partOne(processInput(input))).toBe(42951);
    });
});

describe('Part Two', () => {
    test('Part Two Should Return 66 on test input', () => {
        expect(partTwo(processInput(inputTest))).toBe(66);
    });

    test('Part Two Should Return the Correct Answer on the Challenge Input', () => {
        expect(partTwo(processInput(input))).toBe(18568)
    });
});
