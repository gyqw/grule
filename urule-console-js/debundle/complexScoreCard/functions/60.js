var func60 = function (t, e, n) {
    "use strict";
    var r = e;

    function i(t) {
        return 1 === t.length ? "0" + t : t
    }

    function o(t) {
        for (var e = "", n = 0; n < t.length; n++) e += i(t[n].toString(16));
        return e
    }

    r.toArray = function (t, e) {
        if (Array.isArray(t)) return t.slice();
        if (!t) return [];
        var n = [];
        if ("string" != typeof t) {
            for (var r = 0; r < t.length; r++) n[r] = 0 | t[r];
            return n
        }
        if ("hex" === e) for ((t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t), r = 0; r < t.length; r += 2) n.push(parseInt(t[r] + t[r + 1], 16)); else for (r = 0; r < t.length; r++) {
            var i = t.charCodeAt(r), o = i >> 8, a = 255 & i;
            o ? n.push(o, a) : n.push(a)
        }
        return n
    }, r.zero2 = i, r.toHex = o, r.encode = function (t, e) {
        return "hex" === e ? o(t) : t
    }
}