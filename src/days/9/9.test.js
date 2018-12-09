import { partOne, partTwo } from './index';
import input from './input.txt';

describe('Part One', () => {
    test('Part One Should Return 9 players; last marble is worth 25 points', () => {
        expect(partOne("9 players; last marble is worth 25 points")).toBe(32);
    });
 
    test('Part One Should Return 8317 on 10 players; last marble is worth 1618 points', () => {
        expect(partOne("10 players; last marble is worth 1618 points")).toBe(8317);
    });

    test('Part One Should Return 146373 on 13 players; last marble is worth 7999 points', () => {
        expect(partOne("13 players; last marble is worth 7999 points")).toBe(146373);
    });

    test('Part One Should Return 2764 on 17 players; last marble is worth 1104 points', () => {
        expect(partOne("17 players; last marble is worth 1104 points")).toBe(2764);
    });

    test('Part One Should Return 54718 on 21 players; last marble is worth 6111 points', () => {
        expect(partOne("21 players; last marble is worth 6111 points")).toBe(54718);
    });

    test('Part One Should Return 37305 on 30 players; last marble is worth 5807 points', () => {
        expect(partOne("30 players; last marble is worth 5807 points")).toBe(37305);
    });

    test('Part One Should Return Correct Challenge Output ', () => {
        expect(partOne(input)).toBe(437654);
    });
});

describe('Part Two', () => {
    test('Part Two Should Return the Correct Answer on the Challenge Input', () => {
        expect(partTwo(input)).toBe(3689913905)
    });
});

