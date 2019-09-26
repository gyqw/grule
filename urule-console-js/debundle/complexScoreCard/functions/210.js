var func210 = function (t, e, n) {
    (function (r) {
        var i;
        !function (o) {
            "use strict";
            var a, s, c, f;
            o ? function () {
                var t = o.crypto || o.msCrypto;
                if (!a && t && t.getRandomValues) try {
                    var e = new Uint8Array(16);
                    f = a = function () {
                        return t.getRandomValues(e), e
                    }, a()
                } catch (t) {
                }
                if (!a) {
                    var n = new Array(16);
                    s = a = function () {
                        for (var t, e = 0; e < 16; e++) 0 == (3 & e) && (t = 4294967296 * Math.random()), n[e] = t >>> ((3 & e) << 3) & 255;
                        return n
                    }, "undefined" != typeof console && console.warn
                }
            }() : function () {
                try {
                    var t = n(177).randomBytes;
                    c = a = t && function () {
                        return t(16)
                    }, a()
                } catch (t) {
                }
            }();
            for (var u = "function" == typeof r ? r : Array, l = [], h = {}, d = 0; d < 256; d++) l[d] = (d + 256).toString(16).substr(1), h[l[d]] = d;

            function p(t, e) {
                var n = e || 0, r = l;
                return r[t[n++]] + r[t[n++]] + r[t[n++]] + r[t[n++]] + "-" + r[t[n++]] + r[t[n++]] + "-" + r[t[n++]] + r[t[n++]] + "-" + r[t[n++]] + r[t[n++]] + "-" + r[t[n++]] + r[t[n++]] + r[t[n++]] + r[t[n++]] + r[t[n++]] + r[t[n++]]
            }

            var b = a(), g = [1 | b[0], b[1], b[2], b[3], b[4], b[5]], y = 16383 & (b[6] << 8 | b[7]), m = 0, v = 0;

            function A(t, e, n) {
                var r = e && n || 0;
                "string" == typeof t && (e = "binary" === t ? new u(16) : null, t = null);
                var i = (t = t || {}).random || (t.rng || a)();
                if (i[6] = 15 & i[6] | 64, i[8] = 63 & i[8] | 128, e) for (var o = 0; o < 16; o++) e[r + o] = i[o];
                return e || p(i)
            }

            var w = A;
            w.v1 = function (t, e, n) {
                var r = e && n || 0, i = e || [], o = null != (t = t || {}).clockseq ? t.clockseq : y,
                    a = null != t.msecs ? t.msecs : (new Date).getTime(), s = null != t.nsecs ? t.nsecs : v + 1,
                    c = a - m + (s - v) / 1e4;
                if (c < 0 && null == t.clockseq && (o = o + 1 & 16383), (c < 0 || a > m) && null == t.nsecs && (s = 0), s >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                m = a, v = s, y = o;
                var f = (1e4 * (268435455 & (a += 122192928e5)) + s) % 4294967296;
                i[r++] = f >>> 24 & 255, i[r++] = f >>> 16 & 255, i[r++] = f >>> 8 & 255, i[r++] = 255 & f;
                var u = a / 4294967296 * 1e4 & 268435455;
                i[r++] = u >>> 8 & 255, i[r++] = 255 & u, i[r++] = u >>> 24 & 15 | 16, i[r++] = u >>> 16 & 255, i[r++] = o >>> 8 | 128, i[r++] = 255 & o;
                for (var l = t.node || g, h = 0; h < 6; h++) i[r + h] = l[h];
                return e || p(i)
            }, w.v4 = A, w.parse = function (t, e, n) {
                var r = e && n || 0, i = 0;
                for (e = e || [], t.toLowerCase().replace(/[0-9a-f]{2}/g, function (t) {
                    i < 16 && (e[r + i++] = h[t])
                }); i < 16;) e[r + i++] = 0;
                return e
            }, w.unparse = p, w.BufferClass = u, w._rng = a, w._mathRNG = s, w._nodeRNG = c, w._whatwgRNG = f, void 0 !== t && t.exports ? t.exports = w : void 0 === (i = function () {
                return w
            }.call(e, n, e, t)) || (t.exports = i)
        }("undefined" != typeof window ? window : null)
    }).call(this, n(2).Buffer)
}