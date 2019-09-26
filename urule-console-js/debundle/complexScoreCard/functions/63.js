var func63 = function (t, e, n) {
    var r = n(14);
    t.exports = y, y.simpleSieve = b, y.fermatTest = g;
    var i = n(3), o = new i(24), a = new (n(62)), s = new i(1), c = new i(2), f = new i(5),
        u = (new i(16), new i(8), new i(10)), l = new i(3), h = (new i(7), new i(11)), d = new i(4),
        p = (new i(12), null);

    function b(t) {
        for (var e = function () {
            if (null !== p) return p;
            var t = [];
            t[0] = 2;
            for (var e = 1, n = 3; n < 1048576; n += 2) {
                for (var r = Math.ceil(Math.sqrt(n)), i = 0; i < e && t[i] <= r && n % t[i] != 0; i++) ;
                e !== i && t[i] <= r || (t[e++] = n)
            }
            return p = t, t
        }(), n = 0; n < e.length; n++) if (0 === t.modn(e[n])) return 0 === t.cmpn(e[n]);
        return !0
    }

    function g(t) {
        var e = i.mont(t);
        return 0 === c.toRed(e).redPow(t.subn(1)).fromRed().cmpn(1)
    }

    function y(t, e) {
        if (t < 16) return new i(2 === e || 5 === e ? [140, 123] : [140, 39]);
        var n, p;
        for (e = new i(e); ;) {
            for (n = new i(r(Math.ceil(t / 8))); n.bitLength() > t;) n.ishrn(1);
            if (n.isEven() && n.iadd(s), n.testn(1) || n.iadd(c), e.cmp(c)) {
                if (!e.cmp(f)) for (; n.mod(u).cmp(l);) n.iadd(d)
            } else for (; n.mod(o).cmp(h);) n.iadd(d);
            if (b(p = n.shrn(1)) && b(n) && g(p) && g(n) && a.test(p) && a.test(n)) return n
        }
    }
}