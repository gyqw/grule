var func139 = function (t, e, n) {
    (function (t) {
        var r = n(63), i = n(135), o = n(134), a = {binary: !0, hex: !0, base64: !0};
        e.DiffieHellmanGroup = e.createDiffieHellmanGroup = e.getDiffieHellman = function (e) {
            var n = new t(i[e].prime, "hex"), r = new t(i[e].gen, "hex");
            return new o(n, r)
        }, e.createDiffieHellman = e.DiffieHellman = function e(n, i, s, c) {
            return t.isBuffer(i) || void 0 === a[i] ? e(n, "binary", i, s) : (i = i || "binary", c = c || "binary", s = s || new t([2]), t.isBuffer(s) || (s = new t(s, c)), "number" == typeof n ? new o(r(n, s), s, !0) : (t.isBuffer(n) || (n = new t(n, i)), new o(n, s, !0)))
        }
    }).call(this, n(2).Buffer)
}