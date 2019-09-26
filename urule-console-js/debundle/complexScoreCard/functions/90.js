var func90 = function (t, e, n) {
    "use strict";
    (function (t, r) {
        function i() {
            throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")
        }

        var o = n(1), a = n(14), s = o.Buffer, c = o.kMaxLength, f = t.crypto || t.msCrypto, u = Math.pow(2, 32) - 1;

        function l(t, e) {
            if ("number" != typeof t || t != t) throw new TypeError("offset must be a number");
            if (t > u || t < 0) throw new TypeError("offset must be a uint32");
            if (t > c || t > e) throw new RangeError("offset out of range")
        }

        function h(t, e, n) {
            if ("number" != typeof t || t != t) throw new TypeError("size must be a number");
            if (t > u || t < 0) throw new TypeError("size must be a uint32");
            if (t + e > n || t > c) throw new RangeError("buffer too small")
        }

        function d(t, e, n, i) {
            if (r.browser) {
                var o = t.buffer, s = new Uint8Array(o, e, n);
                return f.getRandomValues(s), i ? void r.nextTick(function () {
                    i(null, t)
                }) : t
            }
            if (!i) return a(n).copy(t, e), t;
            a(n, function (n, r) {
                if (n) return i(n);
                r.copy(t, e), i(null, t)
            })
        }

        f && f.getRandomValues || !r.browser ? (e.randomFill = function (e, n, r, i) {
            if (!(s.isBuffer(e) || e instanceof t.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
            if ("function" == typeof n) i = n, n = 0, r = e.length; else if ("function" == typeof r) i = r, r = e.length - n; else if ("function" != typeof i) throw new TypeError('"cb" argument must be a function');
            return l(n, e.length), h(r, n, e.length), d(e, n, r, i)
        }, e.randomFillSync = function (e, n, r) {
            if (void 0 === n && (n = 0), !(s.isBuffer(e) || e instanceof t.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
            return l(n, e.length), void 0 === r && (r = e.length - n), h(r, n, e.length), d(e, n, r)
        }) : (e.randomFill = i, e.randomFillSync = i)
    }).call(this, n(8), n(11))
}