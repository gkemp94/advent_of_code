import { partOne, partTwo } from './index';
import input from './input.txt';

describe("Part One", () => {
    test("'+1, +1, +1' should return 3", () => {
        expect(partOne("+1\n+1\n+1")).toBe(3);
    })

    test("'+1, +1, -2' should return 0", () => {
        expect(partOne("+1\n+1\n-2")).toBe(0);
    })

    test("'-1, -2, -3' should return -6", () => {
        expect(partOne("-1\n-2\n-3")).toBe(-6);
    })

    test('Challenge Input Should be 505', () => {
        expect(partOne(input)).toBe(505);
    })
})

describe("Part Two", () => {
    test("'+1, -1' should return 0", () => {
        expect(partTwo("+1\n-1")).toBe(0);
    });
    test("'+3, +3, +4, -2, -4' should return 10", () => {
        expect(partTwo("+3\n+3\n+4\n-2\n-4")).toBe(10);
    });
    test("'-6, +3, +8, +5, -6' should return 5", () => {
        expect(partTwo("-6,\n3+\n+8\n+5\n-6")).toBe(5);
    });
    test("'+7, +7, -2, -7, -4' should return 14", () => {
        expect(partTwo("+7\n+7\n-2\n-7\n-4")).toBe(14);
    });
    test("Challenge Input should return 72330", () => {
        expect(partTwo(input)).toBe(72330);
    });
})