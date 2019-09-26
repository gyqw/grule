var func62 = function (t, e, n) {
    var r = n(3), i = n(61);

    function o(t) {
        this.rand = t || new i.Rand
    }

    t.exports = o, o.create = function (t) {
        return new o(t)
    }, o.prototype._randbelow = function (t) {
        var e = t.bitLength(), n = Math.ceil(e / 8);
        do {
            var i = new r(this.rand.generate(n))
        } while (i.cmp(t) >= 0);
        return i
    }, o.prototype._randrange = function (t, e) {
        var n = e.sub(t);
        return t.add(this._randbelow(n))
    }, o.prototype.test = function (t, e, n) {
        var i = t.bitLength(), o = r.mont(t), a = new r(1).toRed(o);
        e || (e = Math.max(1, i / 48 | 0));
        for (var s = t.subn(1), c = 0; !s.testn(c); c++) ;
        for (var f = t.shrn(c), u = s.toRed(o); e > 0; e--) {
            var l = this._randrange(new r(2), s);
            n && n(l);
            var h = l.toRed(o).redPow(f);
            if (0 !== h.cmp(a) && 0 !== h.cmp(u)) {
                for (var d = 1; d < c; d++) {
                    if (0 === (h = h.redSqr()).cmp(a)) return !1;
                    if (0 === h.cmp(u)) break
                }
                if (d === c) return !1
            }
        }
        return !0
    }, o.prototype.getDivisor = function (t, e) {
        var n = t.bitLength(), i = r.mont(t), o = new r(1).toRed(i);
        e || (e = Math.max(1, n / 48 | 0));
        for (var a = t.subn(1), s = 0; !a.testn(s); s++) ;
        for (var c = t.shrn(s), f = a.toRed(i); e > 0; e--) {
            var u = this._randrange(new r(2), a), l = t.gcd(u);
            if (0 !== l.cmpn(1)) return l;
            var h = u.toRed(i).redPow(c);
            if (0 !== h.cmp(o) && 0 !== h.cmp(f)) {
                for (var d = 1; d < s; d++) {
                    if (0 === (h = h.redSqr()).cmp(o)) return h.fromRed().subn(1).gcd(t);
                    if (0 === h.cmp(f)) break
                }
                if (d === s) return (h = h.redSqr()).fromRed().subn(1).gcd(t)
            }
        }
        return !1
    }
}