var func179 = function (t, e, n) {
    "use strict";
    e.byteLength = function (t) {
        return 3 * t.length / 4 - f(t)
    }, e.toByteArray = function (t) {
        var e, n, r, a, s, c = t.length;
        a = f(t), s = new o(3 * c / 4 - a), n = a > 0 ? c - 4 : c;
        var u = 0;
        for (e = 0; e < n; e += 4) r = i[t.charCodeAt(e)] << 18 | i[t.charCodeAt(e + 1)] << 12 | i[t.charCodeAt(e + 2)] << 6 | i[t.charCodeAt(e + 3)], s[u++] = r >> 16 & 255, s[u++] = r >> 8 & 255, s[u++] = 255 & r;
        return 2 === a ? (r = i[t.charCodeAt(e)] << 2 | i[t.charCodeAt(e + 1)] >> 4, s[u++] = 255 & r) : 1 === a && (r = i[t.charCodeAt(e)] << 10 | i[t.charCodeAt(e + 1)] << 4 | i[t.charCodeAt(e + 2)] >> 2, s[u++] = r >> 8 & 255, s[u++] = 255 & r), s
    }, e.fromByteArray = function (t) {
        for (var e, n = t.length, i = n % 3, o = "", a = [], s = 0, c = n - i; s < c; s += 16383) a.push(u(t, s, s + 16383 > c ? c : s + 16383));
        return 1 === i ? (e = t[n - 1], o += r[e >> 2], o += r[e << 4 & 63], o += "==") : 2 === i && (e = (t[n - 2] << 8) + t[n - 1], o += r[e >> 10], o += r[e >> 4 & 63], o += r[e << 2 & 63], o += "="), a.push(o), a.join("")
    };
    for (var r = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, c = a.length; s < c; ++s) r[s] = a[s], i[a.charCodeAt(s)] = s;

    function f(t) {
        var e = t.length;
        if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0
    }

    function u(t, e, n) {
        for (var i, o, a = [], s = e; s < n; s += 3) i = (t[s] << 16 & 16711680) + (t[s + 1] << 8 & 65280) + (255 & t[s + 2]), a.push(r[(o = i) >> 18 & 63] + r[o >> 12 & 63] + r[o >> 6 & 63] + r[63 & o]);
        return a.join("")
    }

    i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63
}