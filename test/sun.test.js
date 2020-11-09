const sun = require('../sun');
const assert = require('assert');

const 
    year = 2020,
    month = 11,
    day = 5,
    lat = 15.870039,
    lng = -61.586608,
    tz = -4;

// const year = 2020; month = 11;  day = 5;
// const lat = 15.870039; lng = -61.586608;

describe("Sun - Integration Tests", function () {
    describe("Sunrise", function () {
        it("it should equal", function () {
            //arrange
            const expected = {
                year: year,
                month: month,
                day: day,
                hours: 6,
                minutes: 4,
                seconds: 56,
                tz: tz,
                LocalISOString: '2020-12-05T10:04:56.000Z'
            };
            //act
            const actual = sun.calculate(lat, lng, year, month, day, tz).sunrise;
            //assert
            assert.deepStrictEqual(actual, expected);
        });
    });

    describe("Sunset", function () {
        it("it should equal", function () {
            //arrange
            const expected = {
                year: year,
                month: month,
                day: day,
                hours: 17,
                minutes: 34,
                seconds: 53,
                tz: tz,
                LocalISOString: '2020-12-05T21:34:53.000Z'
            };
            //act
            const actual = sun.calculate(lat, lng, year, month, day, -4).sunset;
            //assert
            assert.deepStrictEqual(actual, expected);
        });
    });

    describe("Solar Noon", function () {
        it("it should equal", function () {
            //arrange
            const expected = {
                year: year,
                month: month,
                day: day,
                hours: 11,
                minutes: 49,
                seconds: 54,
                tz: tz,
                LocalISOString: '2020-12-05T15:49:54.000Z'
            };
            
            //act
            const actual = sun.calculate(lat, lng, year, month, day, -4).solarnoon;
            //assert
            assert.deepStrictEqual(actual, expected);
        });

        it("ISO string should equal", function () {
            //arrange
            const expected = new Date(year, month, day, 11, 49, 54).toISOString();
            //act
            const actual = sun.calculate(lat, lng, year, month, day, -4).solarnoon.LocalISOString;
            //assert
            assert.strictEqual(actual, expected);
        });
    });
});