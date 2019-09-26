var func128 = function (t, e, n) {
    "use strict";
    var r = n(29), i = n(4), o = n(3), a = n(0), s = r.base, c = i.utils.assert;

    function f(t) {
        s.call(this, "short", t), this.a = new o(t.a, 16).toRed(this.red), this.b = new o(t.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(t), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4)
    }

    function u(t, e, n, r) {
        s.BasePoint.call(this, t, "affine"), null === e && null === n ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new o(e, 16), this.y = new o(n, 16), r && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1)
    }

    function l(t, e, n, r) {
        s.BasePoint.call(this, t, "jacobian"), null === e && null === n && null === r ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new o(0)) : (this.x = new o(e, 16), this.y = new o(n, 16), this.z = new o(r, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one
    }

    a(f, s), t.exports = f, f.prototype._getEndomorphism = function (t) {
        if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
            var e, n;
            if (t.beta) e = new o(t.beta, 16).toRed(this.red); else {
                var r = this._getEndoRoots(this.p);
                e = (e = r[0].cmp(r[1]) < 0 ? r[0] : r[1]).toRed(this.red)
            }
            if (t.lambda) n = new o(t.lambda, 16); else {
                var i = this._getEndoRoots(this.n);
                0 === this.g.mul(i[0]).x.cmp(this.g.x.redMul(e)) ? n = i[0] : (n = i[1], c(0 === this.g.mul(n).x.cmp(this.g.x.redMul(e))))
            }
            return {
                beta: e, lambda: n, basis: t.basis ? t.basis.map(function (t) {
                    return {a: new o(t.a, 16), b: new o(t.b, 16)}
                }) : this._getEndoBasis(n)
            }
        }
    }, f.prototype._getEndoRoots = function (t) {
        var e = t === this.p ? this.red : o.mont(t), n = new o(2).toRed(e).redInvm(), r = n.redNeg(),
            i = new o(3).toRed(e).redNeg().redSqrt().redMul(n);
        return [r.redAdd(i).fromRed(), r.redSub(i).fromRed()]
    }, f.prototype._getEndoBasis = function (t) {
        for (var e, n, r, i, a, s, c, f, u, l = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), h = t, d = this.n.clone(), p = new o(1), b = new o(0), g = new o(0), y = new o(1), m = 0; 0 !== h.cmpn(0);) {
            var v = d.div(h);
            f = d.sub(v.mul(h)), u = g.sub(v.mul(p));
            var A = y.sub(v.mul(b));
            if (!r && f.cmp(l) < 0) e = c.neg(), n = p, r = f.neg(), i = u; else if (r && 2 == ++m) break;
            c = f, d = h, h = f, g = p, p = u, y = b, b = A
        }
        a = f.neg(), s = u;
        var w = r.sqr().add(i.sqr());
        return a.sqr().add(s.sqr()).cmp(w) >= 0 && (a = e, s = n), r.negative && (r = r.neg(), i = i.neg()), a.negative && (a = a.neg(), s = s.neg()), [{
            a: r,
            b: i
        }, {a: a, b: s}]
    }, f.prototype._endoSplit = function (t) {
        var e = this.endo.basis, n = e[0], r = e[1], i = r.b.mul(t).divRound(this.n),
            o = n.b.neg().mul(t).divRound(this.n), a = i.mul(n.a), s = o.mul(r.a), c = i.mul(n.b), f = o.mul(r.b);
        return {k1: t.sub(a).sub(s), k2: c.add(f).neg()}
    }, f.prototype.pointFromX = function (t, e) {
        (t = new o(t, 16)).red || (t = t.toRed(this.red));
        var n = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b), r = n.redSqrt();
        if (0 !== r.redSqr().redSub(n).cmp(this.zero)) throw new Error("invalid point");
        var i = r.fromRed().isOdd();
        return (e && !i || !e && i) && (r = r.redNeg()), this.point(t, r)
    }, f.prototype.validate = function (t) {
        if (t.inf) return !0;
        var e = t.x, n = t.y, r = this.a.redMul(e), i = e.redSqr().redMul(e).redIAdd(r).redIAdd(this.b);
        return 0 === n.redSqr().redISub(i).cmpn(0)
    }, f.prototype._endoWnafMulAdd = function (t, e, n) {
        for (var r = this._endoWnafT1, i = this._endoWnafT2, o = 0; o < t.length; o++) {
            var a = this._endoSplit(e[o]), s = t[o], c = s._getBeta();
            a.k1.negative && (a.k1.ineg(), s = s.neg(!0)), a.k2.negative && (a.k2.ineg(), c = c.neg(!0)), r[2 * o] = s, r[2 * o + 1] = c, i[2 * o] = a.k1, i[2 * o + 1] = a.k2
        }
        for (var f = this._wnafMulAdd(1, r, i, 2 * o, n), u = 0; u < 2 * o; u++) r[u] = null, i[u] = null;
        return f
    }, a(u, s.BasePoint), f.prototype.point = function (t, e, n) {
        return new u(this, t, e, n)
    }, f.prototype.pointFromJSON = function (t, e) {
        return u.fromJSON(this, t, e)
    }, u.prototype._getBeta = function () {
        if (this.curve.endo) {
            var t = this.precomputed;
            if (t && t.beta) return t.beta;
            var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
            if (t) {
                var n = this.curve, r = function (t) {
                    return n.point(t.x.redMul(n.endo.beta), t.y)
                };
                t.beta = e, e.precomputed = {
                    beta: null,
                    naf: t.naf && {wnd: t.naf.wnd, points: t.naf.points.map(r)},
                    doubles: t.doubles && {step: t.doubles.step, points: t.doubles.points.map(r)}
                }
            }
            return e
        }
    }, u.prototype.toJSON = function () {
        return this.precomputed ? [this.x, this.y, this.precomputed && {
            doubles: this.precomputed.doubles && {
                step: this.precomputed.doubles.step,
                points: this.precomputed.doubles.points.slice(1)
            },
            naf: this.precomputed.naf && {wnd: this.precomputed.naf.wnd, points: this.precomputed.naf.points.slice(1)}
        }] : [this.x, this.y]
    }, u.fromJSON = function (t, e, n) {
        "string" == typeof e && (e = JSON.parse(e));
        var r = t.point(e[0], e[1], n);
        if (!e[2]) return r;

        function i(e) {
            return t.point(e[0], e[1], n)
        }

        var o = e[2];
        return r.precomputed = {
            beta: null,
            doubles: o.doubles && {step: o.doubles.step, points: [r].concat(o.doubles.points.map(i))},
            naf: o.naf && {wnd: o.naf.wnd, points: [r].concat(o.naf.points.map(i))}
        }, r
    }, u.prototype.inspect = function () {
        return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"
    }, u.prototype.isInfinity = function () {
        return this.inf
    }, u.prototype.add = function (t) {
        if (this.inf) return t;
        if (t.inf) return this;
        if (this.eq(t)) return this.dbl();
        if (this.neg().eq(t)) return this.curve.point(null, null);
        if (0 === this.x.cmp(t.x)) return this.curve.point(null, null);
        var e = this.y.redSub(t.y);
        0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(t.x).redInvm()));
        var n = e.redSqr().redISub(this.x).redISub(t.x), r = e.redMul(this.x.redSub(n)).redISub(this.y);
        return this.curve.point(n, r)
    }, u.prototype.dbl = function () {
        if (this.inf) return this;
        var t = this.y.redAdd(this.y);
        if (0 === t.cmpn(0)) return this.curve.point(null, null);
        var e = this.curve.a, n = this.x.redSqr(), r = t.redInvm(), i = n.redAdd(n).redIAdd(n).redIAdd(e).redMul(r),
            o = i.redSqr().redISub(this.x.redAdd(this.x)), a = i.redMul(this.x.redSub(o)).redISub(this.y);
        return this.curve.point(o, a)
    }, u.prototype.getX = function () {
        return this.x.fromRed()
    }, u.prototype.getY = function () {
        return this.y.fromRed()
    }, u.prototype.mul = function (t) {
        return t = new o(t, 16), this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [t]) : this.curve._wnafMul(this, t)
    }, u.prototype.mulAdd = function (t, e, n) {
        var r = [this, e], i = [t, n];
        return this.curve.endo ? this.curve._endoWnafMulAdd(r, i) : this.curve._wnafMulAdd(1, r, i, 2)
    }, u.prototype.jmulAdd = function (t, e, n) {
        var r = [this, e], i = [t, n];
        return this.curve.endo ? this.curve._endoWnafMulAdd(r, i, !0) : this.curve._wnafMulAdd(1, r, i, 2, !0)
    }, u.prototype.eq = function (t) {
        return this === t || this.inf === t.inf && (this.inf || 0 === this.x.cmp(t.x) && 0 === this.y.cmp(t.y))
    }, u.prototype.neg = function (t) {
        if (this.inf) return this;
        var e = this.curve.point(this.x, this.y.redNeg());
        if (t && this.precomputed) {
            var n = this.precomputed, r = function (t) {
                return t.neg()
            };
            e.precomputed = {
                naf: n.naf && {wnd: n.naf.wnd, points: n.naf.points.map(r)},
                doubles: n.doubles && {step: n.doubles.step, points: n.doubles.points.map(r)}
            }
        }
        return e
    }, u.prototype.toJ = function () {
        return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one)
    }, a(l, s.BasePoint), f.prototype.jpoint = function (t, e, n) {
        return new l(this, t, e, n)
    }, l.prototype.toP = function () {
        if (this.isInfinity()) return this.curve.point(null, null);
        var t = this.z.redInvm(), e = t.redSqr(), n = this.x.redMul(e), r = this.y.redMul(e).redMul(t);
        return this.curve.point(n, r)
    }, l.prototype.neg = function () {
        return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
    }, l.prototype.add = function (t) {
        if (this.isInfinity()) return t;
        if (t.isInfinity()) return this;
        var e = t.z.redSqr(), n = this.z.redSqr(), r = this.x.redMul(e), i = t.x.redMul(n),
            o = this.y.redMul(e.redMul(t.z)), a = t.y.redMul(n.redMul(this.z)), s = r.redSub(i), c = o.redSub(a);
        if (0 === s.cmpn(0)) return 0 !== c.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
        var f = s.redSqr(), u = f.redMul(s), l = r.redMul(f), h = c.redSqr().redIAdd(u).redISub(l).redISub(l),
            d = c.redMul(l.redISub(h)).redISub(o.redMul(u)), p = this.z.redMul(t.z).redMul(s);
        return this.curve.jpoint(h, d, p)
    }, l.prototype.mixedAdd = function (t) {
        if (this.isInfinity()) return t.toJ();
        if (t.isInfinity()) return this;
        var e = this.z.redSqr(), n = this.x, r = t.x.redMul(e), i = this.y, o = t.y.redMul(e).redMul(this.z),
            a = n.redSub(r), s = i.redSub(o);
        if (0 === a.cmpn(0)) return 0 !== s.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
        var c = a.redSqr(), f = c.redMul(a), u = n.redMul(c), l = s.redSqr().redIAdd(f).redISub(u).redISub(u),
            h = s.redMul(u.redISub(l)).redISub(i.redMul(f)), d = this.z.redMul(a);
        return this.curve.jpoint(l, h, d)
    }, l.prototype.dblp = function (t) {
        if (0 === t) return this;
        if (this.isInfinity()) return this;
        if (!t) return this.dbl();
        if (this.curve.zeroA || this.curve.threeA) {
            for (var e = this, n = 0; n < t; n++) e = e.dbl();
            return e
        }
        var r = this.curve.a, i = this.curve.tinv, o = this.x, a = this.y, s = this.z, c = s.redSqr().redSqr(),
            f = a.redAdd(a);
        for (n = 0; n < t; n++) {
            var u = o.redSqr(), l = f.redSqr(), h = l.redSqr(), d = u.redAdd(u).redIAdd(u).redIAdd(r.redMul(c)),
                p = o.redMul(l), b = d.redSqr().redISub(p.redAdd(p)), g = p.redISub(b), y = d.redMul(g);
            y = y.redIAdd(y).redISub(h);
            var m = f.redMul(s);
            n + 1 < t && (c = c.redMul(h)), o = b, s = m, f = y
        }
        return this.curve.jpoint(o, f.redMul(i), s)
    }, l.prototype.dbl = function () {
        return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl()
    }, l.prototype._zeroDbl = function () {
        var t, e, n;
        if (this.zOne) {
            var r = this.x.redSqr(), i = this.y.redSqr(), o = i.redSqr(),
                a = this.x.redAdd(i).redSqr().redISub(r).redISub(o);
            a = a.redIAdd(a);
            var s = r.redAdd(r).redIAdd(r), c = s.redSqr().redISub(a).redISub(a), f = o.redIAdd(o);
            f = (f = f.redIAdd(f)).redIAdd(f), t = c, e = s.redMul(a.redISub(c)).redISub(f), n = this.y.redAdd(this.y)
        } else {
            var u = this.x.redSqr(), l = this.y.redSqr(), h = l.redSqr(),
                d = this.x.redAdd(l).redSqr().redISub(u).redISub(h);
            d = d.redIAdd(d);
            var p = u.redAdd(u).redIAdd(u), b = p.redSqr(), g = h.redIAdd(h);
            g = (g = g.redIAdd(g)).redIAdd(g), t = b.redISub(d).redISub(d), e = p.redMul(d.redISub(t)).redISub(g), n = (n = this.y.redMul(this.z)).redIAdd(n)
        }
        return this.curve.jpoint(t, e, n)
    }, l.prototype._threeDbl = function () {
        var t, e, n;
        if (this.zOne) {
            var r = this.x.redSqr(), i = this.y.redSqr(), o = i.redSqr(),
                a = this.x.redAdd(i).redSqr().redISub(r).redISub(o);
            a = a.redIAdd(a);
            var s = r.redAdd(r).redIAdd(r).redIAdd(this.curve.a), c = s.redSqr().redISub(a).redISub(a);
            t = c;
            var f = o.redIAdd(o);
            f = (f = f.redIAdd(f)).redIAdd(f), e = s.redMul(a.redISub(c)).redISub(f), n = this.y.redAdd(this.y)
        } else {
            var u = this.z.redSqr(), l = this.y.redSqr(), h = this.x.redMul(l),
                d = this.x.redSub(u).redMul(this.x.redAdd(u));
            d = d.redAdd(d).redIAdd(d);
            var p = h.redIAdd(h), b = (p = p.redIAdd(p)).redAdd(p);
            t = d.redSqr().redISub(b), n = this.y.redAdd(this.z).redSqr().redISub(l).redISub(u);
            var g = l.redSqr();
            g = (g = (g = g.redIAdd(g)).redIAdd(g)).redIAdd(g), e = d.redMul(p.redISub(t)).redISub(g)
        }
        return this.curve.jpoint(t, e, n)
    }, l.prototype._dbl = function () {
        var t = this.curve.a, e = this.x, n = this.y, r = this.z, i = r.redSqr().redSqr(), o = e.redSqr(),
            a = n.redSqr(), s = o.redAdd(o).redIAdd(o).redIAdd(t.redMul(i)), c = e.redAdd(e),
            f = (c = c.redIAdd(c)).redMul(a), u = s.redSqr().redISub(f.redAdd(f)), l = f.redISub(u), h = a.redSqr();
        h = (h = (h = h.redIAdd(h)).redIAdd(h)).redIAdd(h);
        var d = s.redMul(l).redISub(h), p = n.redAdd(n).redMul(r);
        return this.curve.jpoint(u, d, p)
    }, l.prototype.trpl = function () {
        if (!this.curve.zeroA) return this.dbl().add(this);
        var t = this.x.redSqr(), e = this.y.redSqr(), n = this.z.redSqr(), r = e.redSqr(), i = t.redAdd(t).redIAdd(t),
            o = i.redSqr(), a = this.x.redAdd(e).redSqr().redISub(t).redISub(r),
            s = (a = (a = (a = a.redIAdd(a)).redAdd(a).redIAdd(a)).redISub(o)).redSqr(), c = r.redIAdd(r);
        c = (c = (c = c.redIAdd(c)).redIAdd(c)).redIAdd(c);
        var f = i.redIAdd(a).redSqr().redISub(o).redISub(s).redISub(c), u = e.redMul(f);
        u = (u = u.redIAdd(u)).redIAdd(u);
        var l = this.x.redMul(s).redISub(u);
        l = (l = l.redIAdd(l)).redIAdd(l);
        var h = this.y.redMul(f.redMul(c.redISub(f)).redISub(a.redMul(s)));
        h = (h = (h = h.redIAdd(h)).redIAdd(h)).redIAdd(h);
        var d = this.z.redAdd(a).redSqr().redISub(n).redISub(s);
        return this.curve.jpoint(l, h, d)
    }, l.prototype.mul = function (t, e) {
        return t = new o(t, e), this.curve._wnafMul(this, t)
    }, l.prototype.eq = function (t) {
        if ("affine" === t.type) return this.eq(t.toJ());
        if (this === t) return !0;
        var e = this.z.redSqr(), n = t.z.redSqr();
        if (0 !== this.x.redMul(n).redISub(t.x.redMul(e)).cmpn(0)) return !1;
        var r = e.redMul(this.z), i = n.redMul(t.z);
        return 0 === this.y.redMul(i).redISub(t.y.redMul(r)).cmpn(0)
    }, l.prototype.eqXToP = function (t) {
        var e = this.z.redSqr(), n = t.toRed(this.curve.red).redMul(e);
        if (0 === this.x.cmp(n)) return !0;
        for (var r = t.clone(), i = this.curve.redN.redMul(e); ;) {
            if (r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0) return !1;
            if (n.redIAdd(i), 0 === this.x.cmp(n)) return !0
        }
        return !1
    }, l.prototype.inspect = function () {
        return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"
    }, l.prototype.isInfinity = function () {
        return 0 === this.z.cmpn(0)
    }
}