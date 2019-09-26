var func92 = function (t, e, n) {
    (function (e) {
        var r = n(28), i = n(14), o = n(26), a = n(51), s = n(50), c = n(3), f = n(49), u = n(36);
        t.exports = function (t, n, l) {
            var h;
            h = t.padding ? t.padding : l ? 1 : 4;
            var d, p = r(t);
            if (4 === h) d = function (t, n) {
                var r = t.modulus.byteLength(), f = n.length, u = o("sha1").update(new e("")).digest(), l = u.length,
                    h = 2 * l;
                if (f > r - h - 2) throw new Error("message too long");
                var d = new e(r - f - h - 2);
                d.fill(0);
                var p = r - l - 1, b = i(l), g = s(e.concat([u, d, new e([1]), n], p), a(b, p)), y = s(b, a(g, l));
                return new c(e.concat([new e([0]), y, g], r))
            }(p, n); else if (1 === h) d = function (t, n, r) {
                var o, a = n.length, s = t.modulus.byteLength();
                if (a > s - 11) throw new Error("message too long");
                return r ? (o = new e(s - a - 3)).fill(255) : o = function (t, n) {
                    for (var r, o = new e(t), a = 0, s = i(2 * t), c = 0; a < t;) c === s.length && (s = i(2 * t), c = 0), (r = s[c++]) && (o[a++] = r);
                    return o
                }(s - a - 3), new c(e.concat([new e([0, r ? 1 : 2]), o, new e([0]), n], s))
            }(p, n, l); else {
                if (3 !== h) throw new Error("unknown padding");
                if ((d = new c(n)).cmp(p.modulus) >= 0) throw new Error("data too long for modulus")
            }
            return l ? u(d, p) : f(d, p)
        }
    }).call(this, n(2).Buffer)
}