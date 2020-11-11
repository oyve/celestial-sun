![Node.js CI](https://github.com/oyve/celestial-sun/workflows/Node.js%20CI/badge.svg?branch=main)
# celestial-sun
A Javascript library to calculate sun events.

- Avoid JS Date *gymnastics*.
- Date and time I/O are treated numbers-only.
- Use your favorite Date library on the side.

## Currently supported:

* Sunrise
* Sunset
* Solar noon

## Install / Use
View the test file for a complete example.
```
https://www.npmjs.com/package/celestial-sun
```

```
const sun = require('./celestial-sun');

let sunEvents = sun.calculate(latitude, longitude, year, month, day, utcOffset);

let sunrise = sunEvents.sunrise;
let sunset = sunEvents.sunset;
let solarnoon = sunEvents.solarnoon;

//example use with local JS Date

console.log(new Date(sunrise.year, sunrise.month, sunrise.day, sunrise.hour, sunrise.minutes, sunrise.seconds));

//Note: Using JS Date object, date appear correct only for systems in the given latitude/longtitude.
```

## Contribute
If you'd like to contribute please create a Pull Request including test code.

### Disclaimer:
* This code is ported to JS from C# Fiddle 'SolarCalc NOAA' https://dotnetfiddle.net/N3j5th by Erik Murphy
