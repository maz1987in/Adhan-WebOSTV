/*
 * Prayer Times Calculator
 * Based on astronomical calculations
 * Supports multiple calculation methods
 */

class PrayerTimes {
    constructor() {
        // Calculation Methods
        this.methods = {
            MWL: {
                name: 'Muslim World League',
                params: { fajr: 18, isha: 17 }
            },
            ISNA: {
                name: 'Islamic Society of North America',
                params: { fajr: 15, isha: 15 }
            },
            Egypt: {
                name: 'Egyptian General Authority of Survey',
                params: { fajr: 19.5, isha: 17.5 }
            },
            Makkah: {
                name: 'Umm Al-Qura University, Makkah',
                params: { fajr: 18.5, isha: '90 min' }
            },
            Karachi: {
                name: 'University of Islamic Sciences, Karachi',
                params: { fajr: 18, isha: 18 }
            },
            Tehran: {
                name: 'Institute of Geophysics, University of Tehran',
                params: { fajr: 17.7, isha: 14, maghrib: 4.5, midnight: 'Jafari' }
            },
            Jafari: {
                name: 'Shia Ithna-Ashari, Leva Institute, Qum',
                params: { fajr: 16, isha: 14, maghrib: 4, midnight: 'Jafari' }
            }
        };

        // Default settings
        this.calcMethod = 'MWL';
        this.asrJuristic = 'Standard'; // Standard (Shafi) or Hanafi
        this.adjustHighLats = 'MidNight'; // MidNight, OneSeventh, AngleBased
        this.timeFormat = '24h'; // 12h or 24h

        // Coordinates
        this.lat = null;
        this.lng = null;
        this.timezone = null;
    }

    // Set calculation method
    setMethod(method) {
        if (this.methods[method]) {
            this.calcMethod = method;
        }
    }

    // Set location
    setLocation(latitude, longitude, timezone) {
        this.lat = latitude;
        this.lng = longitude;
        this.timezone = timezone;
    }

    // Calculate prayer times for a given date
    getPrayerTimes(date) {
        if (!this.lat || !this.lng || this.timezone === null) {
            return null;
        }

        const jDate = this.julianDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        const times = this.computeTimes(jDate);
        
        return this.adjustTimes(times);
    }

    // Convert Gregorian date to Julian date
    julianDate(year, month, day) {
        if (month <= 2) {
            year -= 1;
            month += 12;
        }
        const A = Math.floor(year / 100);
        const B = 2 - A + Math.floor(A / 4);
        return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
    }

    // Compute prayer times
    computeTimes(jDate) {
        const times = {
            Imsak: 5,
            Fajr: 5,
            Sunrise: 6,
            Dhuhr: 12,
            Asr: 13,
            Sunset: 18,
            Maghrib: 18,
            Isha: 18
        };

        // Compute times
        times.Imsak = this.sunAngleTime(this.methods[this.calcMethod].params.fajr + 2, jDate, 'ccw');
        times.Fajr = this.sunAngleTime(this.methods[this.calcMethod].params.fajr, jDate, 'ccw');
        times.Sunrise = this.sunAngleTime(this.riseSetAngle(), jDate, 'ccw');
        times.Dhuhr = this.midDay(jDate);
        times.Asr = this.asrTime(this.asrJuristic === 'Hanafi' ? 2 : 1, jDate);
        times.Sunset = this.sunAngleTime(this.riseSetAngle(), jDate);
        times.Maghrib = this.sunAngleTime(this.methods[this.calcMethod].params.maghrib || 0, jDate);
        times.Isha = this.sunAngleTime(this.methods[this.calcMethod].params.isha, jDate);

        return times;
    }

    // Adjust times to timezone
    adjustTimes(times) {
        const adjusted = {};
        
        for (let key in times) {
            adjusted[key] = times[key] + this.timezone - this.lng / 15;
        }

        return adjusted;
    }

    // Calculate mid-day time
    midDay(jDate) {
        const eqt = this.equationOfTime(jDate);
        return 12 - eqt;
    }

    // Calculate time for sun angle
    sunAngleTime(angle, jDate, direction = 'cw') {
        const decl = this.sunDeclination(jDate);
        const noon = this.midDay(jDate);
        const t = 1/15 * this.arccos((-this.sin(angle) - this.sin(decl) * this.sin(this.lat)) / 
            (this.cos(decl) * this.cos(this.lat)));
        
        return noon + (direction === 'ccw' ? -t : t);
    }

    // Calculate Asr time
    asrTime(factor, jDate) {
        const decl = this.sunDeclination(jDate);
        const angle = -this.arccot(factor + this.tan(Math.abs(this.lat - decl)));
        return this.sunAngleTime(angle, jDate);
    }

    // Sun declination
    sunDeclination(jDate) {
        const n = jDate - 2451545.0;
        const epsilon = 23.44 - 0.0000004 * n;
        const L = 280.466 + 0.9856474 * n;
        const g = 357.528 + 0.9856003 * n;
        const lambda = L + 1.915 * this.sin(g) + 0.020 * this.sin(2 * g);
        return this.arcsin(this.sin(epsilon) * this.sin(lambda));
    }

    // Equation of time
    equationOfTime(jDate) {
        const n = jDate - 2451545.0;
        const g = 357.528 + 0.9856003 * n;
        const L = 280.466 + 0.9856474 * n;
        const lambda = L + 1.915 * this.sin(g) + 0.020 * this.sin(2 * g);
        const epsilon = 23.44 - 0.0000004 * n;
        const ra = this.arctan2(this.cos(epsilon) * this.sin(lambda), this.cos(lambda));
        const eqt = L - ra;
        return this.fixHour(eqt / 15);
    }

    // Angle for rise/set
    riseSetAngle() {
        return 0.833; // Approximate angle for sunrise/sunset
    }

    // Format time for display
    formatTime(time) {
        if (time < 0 || time >= 24) {
            time = this.fixHour(time);
        }

        const hours = Math.floor(time);
        const minutes = Math.floor((time - hours) * 60);
        
        if (this.timeFormat === '12h') {
            const suffix = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            return `${this.twoDigits(displayHours)}:${this.twoDigits(minutes)} ${suffix}`;
        } else {
            return `${this.twoDigits(hours)}:${this.twoDigits(minutes)}`;
        }
    }

    // Get formatted prayer times
    getFormattedTimes(date) {
        const times = this.getPrayerTimes(date);
        if (!times) return null;

        const formatted = {};
        for (let key in times) {
            formatted[key.toLowerCase()] = this.formatTime(times[key]);
        }
        return formatted;
    }

    // Helper: fix hour to be within 0-24
    fixHour(a) {
        a = a - 24 * Math.floor(a / 24);
        return a < 0 ? a + 24 : a;
    }

    // Helper: two digits format
    twoDigits(n) {
        return n < 10 ? '0' + n : n;
    }

    // Trigonometric functions in degrees
    sin(d) { return Math.sin(this.dtr(d)); }
    cos(d) { return Math.cos(this.dtr(d)); }
    tan(d) { return Math.tan(this.dtr(d)); }
    arcsin(x) { return this.rtd(Math.asin(x)); }
    arccos(x) { return this.rtd(Math.acos(x)); }
    arctan(x) { return this.rtd(Math.atan(x)); }
    arccot(x) { return this.rtd(Math.atan(1/x)); }
    arctan2(y, x) { return this.rtd(Math.atan2(y, x)); }

    // Degree to radian
    dtr(d) { return d * Math.PI / 180; }
    
    // Radian to degree
    rtd(r) { return r * 180 / Math.PI; }
}

// Create global instance
const prayerTimes = new PrayerTimes();

