import { partOne, partTwo } from './index';
import input from './input.txt';

describe('Part One', () => {
    test('aA Should Return 0', () => {
        expect(partOne("aA")).toBe(0);
    });

    test('abBA Should Return 0', () => {
        expect(partOne("abBA")).toBe(0);
    });

    test('abAB Should Return 4', () => {
        expect(partOne("abAB")).toBe(4);
    });

    test('aabAAB Should Return 6', () => {
        expect(partOne("aabAAB")).toBe(6);
    });

    test('dabAcCaCBAcCcaDA Should Return 10', () => {
        expect(partOne("dabAcCaCBAcCcaDA")).toBe(10);
    });

    test('Challenge Input Should Return 0', () => {
        expect(partOne(input)).toBe(11636);
    });
});

describe('Part Two', () => {
    test('dabAcCaCBAcCcaDA Should Return 4', () => {
        expect(partTwo("dabAcCaCBAcCcaDA")).toBe(4);
    });

    test('Challenge Input Should Return ', () => {
        expect(partTwo(input)).toBe(5302);
    });
});