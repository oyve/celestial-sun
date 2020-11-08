![Node.js CI](https://github.com/oyve/sun/workflows/Node.js%20CI/badge.svg?branch=main)
# sun
A Javascript library to calculate sun events.

## Currently supported:

* Sunrise
* Sunset
* Solar noon

## Use
View the test file for a complete example.

```
const sun = require('./sun');

let sunEvents = sun.calculate(year, month, day, latitude, longitude, timezoneOffset);

let sunrise = sunEvents.sunrise;
let sunset = sunEvents.sunset;
let solarnoon = sunEvents.solarnoon;
```

## Contribute
If you want to contribute please create a Pull Request with code+test

### Disclaimer:
* To avoid Javascript Date gymnastics, date and time I/O are treated numbers-only
* This code is ported to JS from C# Fiddle 'SolarCalc NOAA' https://dotnetfiddle.net/N3j5th by Erik Murphy
