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
                tz: tz
            };
            //act
            const actual = sun.calculate(year, month, day, lat, lng, tz).sunrise;
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
                tz: tz
            };
            //act
            const actual = sun.calculate(year, month, day, lat, lng, -4).sunset;
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
                tz: tz
            };
            //act
            const actual = sun.calculate(year, month, day, lat, lng, -4).solarnoon;
            //assert
            assert.deepStrictEqual(actual, expected);
        });
    });
});