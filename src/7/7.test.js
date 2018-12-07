import { partOne, partTwo, processInput } from './index';
import input from './input.txt';
import inputTest from './input.test.txt';

describe('Part One', () => {
    test('Part One Should Return CABDFE on Test Input', () => {
        expect(partOne(processInput(inputTest))).toBe("CABDFE");
    });

    test('Part One Should Return Correct Answer on Challenge Input', () => {
        expect(partOne(processInput(input))).toBe("GJKLDFNPTMQXIYHUVREOZSAWCB");
    });
});

describe('Part Two', () => {
    test('Part Two Should Return 15 on test input', () => {
        expect(partTwo(processInput(inputTest), 2, 0)).toBe(15);
    });

    test('Part Two Should Return the Correct Answer on the Challenge Input', () => {
        expect(partTwo(processInput(input), 5, 60)).toBe(967)
    });
});