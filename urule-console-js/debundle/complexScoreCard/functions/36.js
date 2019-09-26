var func36 = function (t, e, n) {
    (function (e) {
        var r = n(3), i = n(14);

        function o(t, n) {
            var i = function (t) {
                    var e = a(t);
                    return {
                        blinder: e.toRed(r.mont(t.modulus)).redPow(new r(t.publicExponent)).fromRed(),
                        unblinder: e.invm(t.modulus)
                    }
                }(n), o = n.modulus.byteLength(), s = (r.mont(n.modulus), new r(t).mul(i.blinder).umod(n.modulus)),
                c = s.toRed(r.mont(n.prime1)), f = s.toRed(r.mont(n.prime2)), u = n.coefficient, l = n.prime1,
                h = n.prime2, d = c.redPow(n.exponent1), p = f.redPow(n.exponent2);
            d = d.fromRed(), p = p.fromRed();
            var b = d.isub(p).imul(u).umod(l);
            return b.imul(h), p.iadd(b), new e(p.imul(i.unblinder).umod(n.modulus).toArray(!1, o))
        }

        function a(t) {
            for (var e = t.modulus.byteLength(), n = new r(i(e)); n.cmp(t.modulus) >= 0 || !n.umod(t.prime1) || !n.umod(t.prime2);) n = new r(i(e));
            return n
        }

        t.exports = o, o.getr = a
    }).call(this, n(2).Buffer)
}