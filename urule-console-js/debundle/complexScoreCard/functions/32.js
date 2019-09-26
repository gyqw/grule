var func32 = function (t, e, n) {
    "use strict";
    (function (e) {
        !e.version || 0 === e.version.indexOf("v0.") || 0 === e.version.indexOf("v1.") && 0 !== e.version.indexOf("v1.8.") ? t.exports = {
            nextTick: function (t, n, r, i) {
                if ("function" != typeof t) throw new TypeError('"callback" argument must be a function');
                var o, a, s = arguments.length;
                switch (s) {
                    case 0:
                    case 1:
                        return e.nextTick(t);
                    case 2:
                        return e.nextTick(function () {
                            t.call(null, n)
                        });
                    case 3:
                        return e.nextTick(function () {
                            t.call(null, n, r)
                        });
                    case 4:
                        return e.nextTick(function () {
                            t.call(null, n, r, i)
                        });
                    default:
                        for (o = new Array(s - 1), a = 0; a < o.length;) o[a++] = arguments[a];
                        return e.nextTick(function () {
                            t.apply(null, o)
                        })
                }
            }
        } : t.exports = e
    }).call(this, n(11))
}