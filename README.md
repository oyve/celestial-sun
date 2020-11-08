![Node.js CI](https://github.com/oyve/celestial-sun/workflows/Node.js%20CI/badge.svg?branch=main)
# celestial-sun
A Javascript library to calculate sun events.

## Currently supported:

* Sunrise
* Sunset
* Solar noon

## Use
View the test file for a complete example.

```
const sun = require('./sun');

let sunEvents = sun.calculate(latitude, longitude, year, month, day, timezoneOffset);

let sunrise = sunEvents.sunrise;
let sunset = sunEvents.sunset;
let solarnoon = sunEvents.solarnoon;
```

## Contribute
If you want to contribute please create a Pull Request with code+test

### Disclaimer:
* To avoid Javascript Date gymnastics, date and time I/O are treated numbers-only
* This code is ported to JS from C# Fiddle 'SolarCalc NOAA' https://dotnetfiddle.net/N3j5th by Erik Murphy
