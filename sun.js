const MinutesInDay = 24 * 60;
const SecondsInDay = MinutesInDay * 60;
const J2000 = 2451545;

/**
 * 
 * @param {number} latitude Latitude in decimal degrees, i.e. 15.870039
 * @param {number} longitude Latitude in decimal degrees, i.e. -61.586608
 * @param {number} year Year
 * @param {number} month Month [1-12]
 * @param {number} day Day
 * @param {number} utcOffset Timezone difference from UTC time, i.e. -4 or +4 hours
 * @returns {Array.<Object>} Sun events as json
 */
function calculate(latitude, longitude, year, month, day, utcOffset) {
    let lat = latitude;
    let lng = longitude;
    let jDate = gregorianToJulian(year, month, day, 12, 0, 0, utcOffset); // D
    let t = julianCentury(jDate); // G
    let ml = geomMeanLongitudeSun(t); // I - deg
    let ma = geomMeanAnomalySun(t); // J - deg
    let eo = eccentricityEarthOrbit(t); // K
    let eoc = equationOfCenterSun(ma, t); // L
    let tl = trueLongitudeSun(ml, eoc); // M - deg
    let al = apparentLongitudeSun(tl, t); // P - deg
    let oe = meanObliquityOfEcliptic(t); // Q - deg
    let oc = obliquityCorrection(oe, t); // R - deg
    let d = declinationSun(oc, al); // T - deg
    let eot = equationOfTime(oc, ml, eo, ma); // V - minutes
    let ha = hourAngleSunrise(lat, d); // W - Deg
    let sn = solarNoon(lng, eot, utcOffset); // X - LST
    let sr = sunrise(sn, ha); // Y - LST
    let ss = sunset(sn, ha); // Z - LST
    let sunriseOffset = toDate(year, month, day, sr, utcOffset);
    let sunsetOffset = toDate(year, month, day, ss, utcOffset);
    let solarNoonOffset = toDate(year, month, day, sn, utcOffset);

    return {
        sunrise: sunriseOffset,
        sunset: sunsetOffset,
        solarnoon: solarNoonOffset
    };
}

function gregorianToJulian(year, month, day, hour, minute, second, utcOffset) {
    if (month <= 2) {
        year -= 1;
        month += 12;
    }

    let A = Math.floor(year / 100);
    let B = 2 - A + Math.floor(A / 4);
    let jDay = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
    let jTime = ((hour * (60 * 60)) + (minute * 60) + second) / SecondsInDay;

    return jDay + jTime - utcOffset / 24;
}

function toDate(year, month, day, time, tz) {
    let hours = Math.floor(time * 24);
    let minutes = Math.floor((time * 24 * 60) % 60);
    let seconds = Math.floor((time * 24 * 60 * 60) % 60);

    return {
        year: year,
        month: month,
        day: day,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        tz: tz
    }
}

function julianCentury(jDate) {
    const daysInCentury = 36525;
    return (jDate - J2000) / daysInCentury;
}

function geomMeanAnomalySun(t) {
    return 357.52911 + t * (35999.05029 - 0.0001537 * t);
}

function geomMeanLongitudeSun(t) {
    return mod(280.46646 + t * (36000.76983 + t * 0.0003032), 0, 360);
}

function eccentricityEarthOrbit(t) {
    return 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
}

function equationOfCenterSun(ma, t) {
    return Math.sin(degToRad(ma)) * (1.914602 - t * (0.004817 + 0.000014 * t))
        + Math.sin(degToRad(2 * ma)) * (0.019993 - 0.000101 * t)
        + Math.sin(degToRad(3 * ma)) * 0.000289;
}

function trueLongitudeSun(ml, eoc) {
    return ml + eoc;
}

function apparentLongitudeSun(tl, t) {
    return tl - 0.00569 - 0.00478 * Math.sin(degToRad(125.04 - 1934.136 * t));
}

function meanObliquityOfEcliptic(t) {
    return 23 + (26 + ((21.448 - t * (46.815 + t * (0.00059 - t * 0.001813)))) / 60) / 60;
}

function obliquityCorrection(oe, t) {
    return oe + 0.00256 * Math.cos(degToRad(125.04 - 1934.136 * t));
}

function equationOfTime(oc, ml, eo, ma) {
    let y = Math.tan(degToRad(oc / 2)) * Math.tan(degToRad(oc / 2)); // U
    let eTime = y * Math.sin(2 * degToRad(ml))
        - 2 * eo * Math.sin(degToRad(ma))
        + 4 * eo * y * Math.sin(degToRad(ma)) * Math.cos(2 * degToRad(ml))
        - 0.5 * y * y * Math.sin(4 * degToRad(ml))
        - 1.25 * eo * eo * Math.sin(2 * degToRad(ma));

    return 4 * radToDeg(eTime);
}

function declinationSun(oc, al) {
    return radToDeg(Math.asin(Math.sin(degToRad(oc)) * Math.sin(degToRad(al))));
}

function hourAngleSunrise(lat, d) {
    return radToDeg(Math.acos(Math.cos(degToRad(90.833)) / (Math.cos(degToRad(lat)) * Math.cos(degToRad(d))) - Math.tan(degToRad(lat)) * Math.tan(degToRad(d))));
}

function solarNoon(lng, eot, tzOff) {
    return (720 - 4 * lng - eot + tzOff * 60) / MinutesInDay;
}

function sunrise(sn, ha) {
    return sn - ha * 4 / MinutesInDay;
}

function sunset(sn, ha) {
    return sn + ha * 4 / MinutesInDay;
}

function mod(x, lo, hi) {
    while (x > hi) x -= hi;
    while (x < lo) x += hi;
    return x;
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function radToDeg(radians) {
    return radians * 180 / Math.PI;
}

module.exports = {
    calculate: calculate
}