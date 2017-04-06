// Built by eustia.
(function(root, factory)
{
    if (typeof define === 'function' && define.amd)
    {
        define([], factory);
    } else if (typeof module === 'object' && module.exports)
    {
        module.exports = factory();
    } else { root._ = factory(); }
}(this, function ()
{
    var _ = {};

    if (typeof window === 'object' && window._) _ = window._;

    /* ------------------------------ toStr ------------------------------ */

    var toStr = _.toStr = (function ()
    {
        /* Convert value to a string.
         *
         * |Name  |Type  |Desc            |
         * |------|------|----------------|
         * |val   |*     |Value to convert|
         * |return|string|Resulted string |
         *
         * ```javascript
         * toStr(null); // -> ''
         * toStr(1); // -> '1'
         * toStr(false); // -> 'false'
         * toStr([1, 2, 3]); // -> '1,2,3'
         * ```
         */

        function exports(val)
        {
            return val == null ? '' : val.toString();
        }

        return exports;
    })();

    /* ------------------------------ objToStr ------------------------------ */

    var objToStr = _.objToStr = (function ()
    {
        /* Alias of Object.prototype.toString.
         *
         * |Name  |Type  |Desc                                |
         * |------|------|------------------------------------|
         * |value |*     |Source value                        |
         * |return|string|String representation of given value|
         * 
         * ```javascript
         * objToStr(5); // -> '[object Number]'
         * ```
         */

        var ObjToStr = Object.prototype.toString;

        function exports(val)
        {
            return ObjToStr.call(val);
        }

        return exports;
    })();

    /* ------------------------------ isDate ------------------------------ */

    var isDate = _.isDate = (function ()
    {
        /* Check if value is classified as a Date object.
         *
         * |Name  |Type   |Desc                          |
         * |------|-------|------------------------------|
         * |val   |*      |value to check                |
         * |return|boolean|True if value is a Date object|
         *
         * ```javascript
         * isDate(new Date()); // -> true
         * ```
         */

        /* dependencies
         * objToStr 
         */

        function exports(val)
        {
            return objToStr(val) === '[object Date]';
        }

        return exports;
    })();

    /* ------------------------------ isStr ------------------------------ */

    var isStr = _.isStr = (function ()
    {
        /* Check if value is a string primitive.
         *
         * |Name  |Type   |Desc                               |
         * |------|-------|-----------------------------------|
         * |val   |*      |Value to check                     |
         * |return|boolean|True if value is a string primitive|
         *
         * ```javascript
         * isStr('eris'); // -> true
         * ```
         */

        /* dependencies
         * objToStr 
         */

        function exports(val)
        {
            return objToStr(val) === '[object String]';
        }

        return exports;
    })();

    /* ------------------------------ repeat ------------------------------ */

    var repeat = _.repeat = (function (exports)
    {
        /* Repeat string n-times.
         *
         * |Name  |Type  |Desc            |
         * |------|------|----------------|
         * |str   |string|String to repeat|
         * |n     |number|Repeat times    |
         * |return|string|Repeated string |
         *
         * ```javascript
         * repeat('a', 3); // -> 'aaa'
         * repeat('ab', 2); // -> 'abab'
         * repeat('*', 0); // -> ''
         * ```
         */

        exports = function (str, n)
        {
            var ret = '';

            if (n < 1) return '';

            while (n > 0)
            {
                if (n & 1) ret += str;
                n >>= 1;
                str += str;
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ lpad ------------------------------ */

    var lpad = _.lpad = (function ()
    {
        /* Pad string on the left side if it's shorter than length.
         *
         * |Name   |Type  |Desc                  |
         * |-------|------|----------------------|
         * |str    |string|String to pad         |
         * |len    |number|Padding length        |
         * |[chars]|string|String used as padding|
         * |return |string|Resulted string       |
         *
         * ```javascript
         * lpad('a', 5); // -> '    a'
         * lpad('a', 5, '-'); // -> '----a'
         * lpad('abc', 3, '-'); // -> 'abc'
         * lpad('abc', 5, 'ab'); // -> 'ababc'
         * ```
         */

        /* dependencies
         * repeat 
         */

        function exports(str, len, chars)
        {
            var strLen = str.length;

            chars = chars || ' ';

            if (strLen < len) str = (repeat(chars, len - strLen) + str).slice(-len);

            return str;
        }

        return exports;
    })();

    /* ------------------------------ dateFormat ------------------------------ */

    _.dateFormat = (function ()
    {
        /* Simple but extremely useful date format function.
         *
         * |Name           |Type   |Desc                 |
         * |---------------|-------|---------------------|
         * |[date=new Date]|Date   |Date object to format|
         * |mask           |string |Format mask          |
         * |[utc=false]    |boolean|UTC or not           |
         * |[gmt=false]    |boolean|GMT or not           |
         *
         * |Mask|Description                                                      |
         * |----|-----------------------------------------------------------------|
         * |d   |Day of the month as digits; no leading zero for single-digit days|
         * |dd  |Day of the month as digits; leading zero for single-digit days   |
         * |ddd |Day of the week as a three-letter abbreviation                   |
         * |dddd|Day of the week as its full name                                 |
         * |m   |Month as digits; no leading zero for single-digit months         |
         * |mm  |Month as digits; leading zero for single-digit months            |
         * |mmm |Month as a three-letter abbreviation                             |
         * |mmmm|Month as its full name                                           |
         * |yy  |Year as last two digits; leading zero for years less than 10     |
         * |yyyy|Year represented by four digits                                  |
         * |h   |Hours; no leading zero for single-digit hours (12-hour clock)    |
         * |hh  |Hours; leading zero for single-digit hours (12-hour clock)       |
         * |H   |Hours; no leading zero for single-digit hours (24-hour clock)    |
         * |HH  |Hours; leading zero for single-digit hours (24-hour clock)       |
         * |M   |Minutes; no leading zero for single-digit minutes                |
         * |MM  |Minutes; leading zero for single-digit minutes                   |
         * |s   |Seconds; no leading zero for single-digit seconds                |
         * |ss  |Seconds; leading zero for single-digit seconds                   |
         * |l L |Milliseconds. l gives 3 digits. L gives 2 digits                 |
         * |t   |Lowercase, single-character time marker string: a or p           |
         * |tt  |Lowercase, two-character time marker string: am or pm            |
         * |T   |Uppercase, single-character time marker string: A or P           |
         * |TT  |Uppercase, two-character time marker string: AM or PM            |
         * |Z   |US timezone abbreviation, e.g. EST or MDT                        |
         * |o   |GMT/UTC timezone offset, e.g. -0500 or +0230                     |
         * |S   |The date's ordinal suffix (st, nd, rd, or th)                    |
         * |UTC:|Must be the first four characters of the mask                    |
         *
         * ```javascript
         * dateFormat('isoDate'); // -> 2016-11-19
         * dateFormat('yyyy-mm-dd HH:MM:ss'); // -> 2016-11-19 19:00:04
         * dateFormat(new Date(), 'yyyy-mm-dd'); // -> 2016-11-19
         * ```
         */

        /* dependencies
         * isStr isDate toStr lpad 
         */

        function exports(date, mask, utc, gmt)
        {
            if (arguments.length === 1 &&
                isStr(date) &&
                !regNum.test(date))
            {
                mask = date;
                date = undefined;
            }

            date = date || new Date;

            if (!isDate(date)) date = new Date(date);

            mask = toStr(exports.masks[mask] || mask || exports.masks['default']);

            var maskSlice = mask.slice(0, 4);

            if (maskSlice === 'UTC:' || maskSlice === 'GMT:')
            {
                mask = mask.slice(4);
                utc = true;
                if (maskSlice === 'GMT:') gmt = true;
            }

            var prefix = utc ? 'getUTC' : 'get',
                d = date[prefix + 'Date'](),
                D = date[prefix + 'Day'](),
                m = date[prefix + 'Month'](),
                y = date[prefix + 'FullYear'](),
                H = date[prefix + 'Hours'](),
                M = date[prefix + 'Minutes'](),
                s = date[prefix + 'Seconds'](),
                L = date[prefix + 'Milliseconds'](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d: d,
                    dd: padZero(d),
                    ddd: exports.i18n.dayNames[D],
                    dddd: exports.i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: padZero(m + 1),
                    mmm: exports.i18n.monthNames[m],
                    mmmm: exports.i18n.monthNames[m + 12],
                    yy: toStr(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: padZero(H % 12 || 12),
                    H: H,
                    HH: padZero(H),
                    M: M,
                    MM: padZero(M),
                    s: s,
                    ss: padZero(s),
                    l: padZero(L, 3),
                    L: padZero(Math.round(L / 10)),
                    t: H < 12 ? 'a'  : 'p',
                    tt: H < 12 ? 'am' : 'pm',
                    T: H < 12 ? 'A'  : 'P',
                    TT: H < 12 ? 'AM' : 'PM',
                    Z: gmt ? 'GMT' : utc ? 'UTC' : (toStr(date).match(regTimezone) || ['']).pop().replace(regTimezoneClip, ''),
                    o: (o > 0 ? '-' : '+') + padZero(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

            return mask.replace(regToken, function (match)
            {
                if (match in flags) return flags[match];

                return match.slice(1, match.length - 1);
            });
        }

        function padZero(str, len)
        {
            return lpad(toStr(str), len || 2, '0');
        }

        var regToken = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g,
            regTimezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            regNum = /\d/,
            regTimezoneClip = /[^-+\dA-Z]/g;

        exports.masks = {
            'default': 'ddd mmm dd yyyy HH:MM:ss',
            'shortDate': 'm/d/yy',
            'mediumDate': 'mmm d, yyyy',
            'longDate': 'mmmm d, yyyy',
            'fullDate': 'dddd, mmmm d, yyyy',
            'shortTime': 'h:MM TT',
            'mediumTime': 'h:MM:ss TT',
            'longTime': 'h:MM:ss TT Z',
            'isoDate': 'yyyy-mm-dd',
            'isoTime': 'HH:MM:ss',
            'isoDateTime': 'yyyy-mm-dd\'T\'HH:MM:sso',
            'isoUtcDateTime': 'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
            'expiresHeaderFormat': 'ddd, dd mmm yyyy HH:MM:ss Z'
        };

        exports.i18n = {
            dayNames: [
                'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
                'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
            ],
            monthNames: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
            ]
        };

        return exports;
    })();

    /* ------------------------------ random ------------------------------ */

    _.random = (function ()
    {
        /* Produces a random number between min and max(inclusive).
         *
         * |Name            |Type   |Desc                  |
         * |----------------|-------|----------------------|
         * |min             |number |Minimum possible value|
         * |max             |number |Maximum possible value|
         * |[floating=false]|boolean|Float or not          |
         * |return          |number |Random number         |
         *
         * ```javascript
         * random(1, 5); // -> an integer between 0 and 5
         * random(5); // -> an integer between 0 and 5
         * random(1.2, 5.2, true); /// -> a floating-point number between 1.2 and 5.2
         * ```
         */

        function exports(min, max, floating)
        {
            if (max == null)
            {
                max = min;
                min = 0;
            }

            var rand = Math.random();

            if (floating || min % 1 || max % 1)
            {
                return Math.min(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
            }

            return min + Math.floor(rand * (max - min + 1));
        }

        return exports;
    })();

    return _;
}));