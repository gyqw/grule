var func9 = function (t, e, n) {
    "use strict";
    var r = n(6), i = n(124);

    function o(t) {
        return (t >>> 24 | t >>> 8 & 65280 | t << 8 & 16711680 | (255 & t) << 24) >>> 0
    }

    function a(t) {
        return 1 === t.length ? "0" + t : t
    }

    function s(t) {
        return 7 === t.length ? "0" + t : 6 === t.length ? "00" + t : 5 === t.length ? "000" + t : 4 === t.length ? "0000" + t : 3 === t.length ? "00000" + t : 2 === t.length ? "000000" + t : 1 === t.length ? "0000000" + t : t
    }

    e.inherits = i, e.toArray = function (t, e) {
        if (Array.isArray(t)) return t.slice();
        if (!t) return [];
        var n = [];
        if ("string" == typeof t) if (e) {
            if ("hex" === e) for ((t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t), r = 0; r < t.length; r += 2) n.push(parseInt(t[r] + t[r + 1], 16))
        } else for (var r = 0; r < t.length; r++) {
            var i = t.charCodeAt(r), o = i >> 8, a = 255 & i;
            o ? n.push(o, a) : n.push(a)
        } else for (r = 0; r < t.length; r++) n[r] = 0 | t[r];
        return n
    }, e.toHex = function (t) {
        for (var e = "", n = 0; n < t.length; n++) e += a(t[n].toString(16));
        return e
    }, e.htonl = o, e.toHex32 = function (t, e) {
        for (var n = "", r = 0; r < t.length; r++) {
            var i = t[r];
            "little" === e && (i = o(i)), n += s(i.toString(16))
        }
        return n
    }, e.zero2 = a, e.zero8 = s, e.join32 = function (t, e, n, i) {
        var o = n - e;
        r(o % 4 == 0);
        for (var a = new Array(o / 4), s = 0, c = e; s < a.length; s++, c += 4) {
            var f;
            f = "big" === i ? t[c] << 24 | t[c + 1] << 16 | t[c + 2] << 8 | t[c + 3] : t[c + 3] << 24 | t[c + 2] << 16 | t[c + 1] << 8 | t[c], a[s] = f >>> 0
        }
        return a
    }, e.split32 = function (t, e) {
        for (var n = new Array(4 * t.length), r = 0, i = 0; r < t.length; r++, i += 4) {
            var o = t[r];
            "big" === e ? (n[i] = o >>> 24, n[i + 1] = o >>> 16 & 255, n[i + 2] = o >>> 8 & 255, n[i + 3] = 255 & o) : (n[i + 3] = o >>> 24, n[i + 2] = o >>> 16 & 255, n[i + 1] = o >>> 8 & 255, n[i] = 255 & o)
        }
        return n
    }, e.rotr32 = function (t, e) {
        return t >>> e | t << 32 - e
    }, e.rotl32 = function (t, e) {
        return t << e | t >>> 32 - e
    }, e.sum32 = function (t, e) {
        return t + e >>> 0
    }, e.sum32_3 = function (t, e, n) {
        return t + e + n >>> 0
    }, e.sum32_4 = function (t, e, n, r) {
        return t + e + n + r >>> 0
    }, e.sum32_5 = function (t, e, n, r, i) {
        return t + e + n + r + i >>> 0
    }, e.sum64 = function (t, e, n, r) {
        var i = t[e], o = r + t[e + 1] >>> 0, a = (o < r ? 1 : 0) + n + i;
        t[e] = a >>> 0, t[e + 1] = o
    }, e.sum64_hi = function (t, e, n, r) {
        return (e + r >>> 0 < e ? 1 : 0) + t + n >>> 0
    }, e.sum64_lo = function (t, e, n, r) {
        return e + r >>> 0
    }, e.sum64_4_hi = function (t, e, n, r, i, o, a, s) {
        var c = 0, f = e;
        return c += (f = f + r >>> 0) < e ? 1 : 0, c += (f = f + o >>> 0) < o ? 1 : 0, t + n + i + a + (c += (f = f + s >>> 0) < s ? 1 : 0) >>> 0
    }, e.sum64_4_lo = function (t, e, n, r, i, o, a, s) {
        return e + r + o + s >>> 0
    }, e.sum64_5_hi = function (t, e, n, r, i, o, a, s, c, f) {
        var u = 0, l = e;
        return u += (l = l + r >>> 0) < e ? 1 : 0, u += (l = l + o >>> 0) < o ? 1 : 0, u += (l = l + s >>> 0) < s ? 1 : 0, t + n + i + a + c + (u += (l = l + f >>> 0) < f ? 1 : 0) >>> 0
    }, e.sum64_5_lo = function (t, e, n, r, i, o, a, s, c, f) {
        return e + r + o + s + f >>> 0
    }, e.rotr64_hi = function (t, e, n) {
        return (e << 32 - n | t >>> n) >>> 0
    }, e.rotr64_lo = function (t, e, n) {
        return (t << 32 - n | e >>> n) >>> 0
    }, e.shr64_hi = function (t, e, n) {
        return t >>> n
    }, e.shr64_lo = function (t, e, n) {
        return (t << 32 - n | e >>> n) >>> 0
    }
}