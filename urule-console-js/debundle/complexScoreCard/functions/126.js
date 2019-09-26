var func126 = function (t, e, n) {
    "use strict";
    var r = n(29), i = n(4), o = n(3), a = n(0), s = r.base, c = i.utils.assert;

    function f(t) {
        this.twisted = 1 != (0 | t.a), this.mOneA = this.twisted && -1 == (0 | t.a), this.extended = this.mOneA, s.call(this, "edwards", t), this.a = new o(t.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new o(t.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new o(t.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), c(!this.twisted || 0 === this.c.fromRed().cmpn(1)), this.oneC = 1 == (0 | t.c)
    }

    function u(t, e, n, r, i) {
        s.BasePoint.call(this, t, "projective"), null === e && null === n && null === r ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new o(e, 16), this.y = new o(n, 16), this.z = r ? new o(r, 16) : this.curve.one, this.t = i && new o(i, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))))
    }

    a(f, s), t.exports = f, f.prototype._mulA = function (t) {
        return this.mOneA ? t.redNeg() : this.a.redMul(t)
    }, f.prototype._mulC = function (t) {
        return this.oneC ? t : this.c.redMul(t)
    }, f.prototype.jpoint = function (t, e, n, r) {
        return this.point(t, e, n, r)
    }, f.prototype.pointFromX = function (t, e) {
        (t = new o(t, 16)).red || (t = t.toRed(this.red));
        var n = t.redSqr(), r = this.c2.redSub(this.a.redMul(n)), i = this.one.redSub(this.c2.redMul(this.d).redMul(n)),
            a = r.redMul(i.redInvm()), s = a.redSqrt();
        if (0 !== s.redSqr().redSub(a).cmp(this.zero)) throw new Error("invalid point");
        var c = s.fromRed().isOdd();
        return (e && !c || !e && c) && (s = s.redNeg()), this.point(t, s)
    }, f.prototype.pointFromY = function (t, e) {
        (t = new o(t, 16)).red || (t = t.toRed(this.red));
        var n = t.redSqr(), r = n.redSub(this.one), i = n.redMul(this.d).redAdd(this.one), a = r.redMul(i.redInvm());
        if (0 === a.cmp(this.zero)) {
            if (e) throw new Error("invalid point");
            return this.point(this.zero, t)
        }
        var s = a.redSqrt();
        if (0 !== s.redSqr().redSub(a).cmp(this.zero)) throw new Error("invalid point");
        return s.isOdd() !== e && (s = s.redNeg()), this.point(s, t)
    }, f.prototype.validate = function (t) {
        if (t.isInfinity()) return !0;
        t.normalize();
        var e = t.x.redSqr(), n = t.y.redSqr(), r = e.redMul(this.a).redAdd(n),
            i = this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(n)));
        return 0 === r.cmp(i)
    }, a(u, s.BasePoint), f.prototype.pointFromJSON = function (t) {
        return u.fromJSON(this, t)
    }, f.prototype.point = function (t, e, n, r) {
        return new u(this, t, e, n, r)
    }, u.fromJSON = function (t, e) {
        return new u(t, e[0], e[1], e[2])
    }, u.prototype.inspect = function () {
        return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
    }, u.prototype.isInfinity = function () {
        return 0 === this.x.cmpn(0) && 0 === this.y.cmp(this.z)
    }, u.prototype._extDbl = function () {
        var t = this.x.redSqr(), e = this.y.redSqr(), n = this.z.redSqr();
        n = n.redIAdd(n);
        var r = this.curve._mulA(t), i = this.x.redAdd(this.y).redSqr().redISub(t).redISub(e), o = r.redAdd(e),
            a = o.redSub(n), s = r.redSub(e), c = i.redMul(a), f = o.redMul(s), u = i.redMul(s), l = a.redMul(o);
        return this.curve.point(c, f, l, u)
    }, u.prototype._projDbl = function () {
        var t, e, n, r = this.x.redAdd(this.y).redSqr(), i = this.x.redSqr(), o = this.y.redSqr();
        if (this.curve.twisted) {
            var a = (f = this.curve._mulA(i)).redAdd(o);
            if (this.zOne) t = r.redSub(i).redSub(o).redMul(a.redSub(this.curve.two)), e = a.redMul(f.redSub(o)), n = a.redSqr().redSub(a).redSub(a); else {
                var s = this.z.redSqr(), c = a.redSub(s).redISub(s);
                t = r.redSub(i).redISub(o).redMul(c), e = a.redMul(f.redSub(o)), n = a.redMul(c)
            }
        } else {
            var f = i.redAdd(o);
            s = this.curve._mulC(this.c.redMul(this.z)).redSqr(), c = f.redSub(s).redSub(s), t = this.curve._mulC(r.redISub(f)).redMul(c), e = this.curve._mulC(f).redMul(i.redISub(o)), n = f.redMul(c)
        }
        return this.curve.point(t, e, n)
    }, u.prototype.dbl = function () {
        return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl()
    }, u.prototype._extAdd = function (t) {
        var e = this.y.redSub(this.x).redMul(t.y.redSub(t.x)), n = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),
            r = this.t.redMul(this.curve.dd).redMul(t.t), i = this.z.redMul(t.z.redAdd(t.z)), o = n.redSub(e),
            a = i.redSub(r), s = i.redAdd(r), c = n.redAdd(e), f = o.redMul(a), u = s.redMul(c), l = o.redMul(c),
            h = a.redMul(s);
        return this.curve.point(f, u, h, l)
    }, u.prototype._projAdd = function (t) {
        var e, n, r = this.z.redMul(t.z), i = r.redSqr(), o = this.x.redMul(t.x), a = this.y.redMul(t.y),
            s = this.curve.d.redMul(o).redMul(a), c = i.redSub(s), f = i.redAdd(s),
            u = this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(o).redISub(a), l = r.redMul(c).redMul(u);
        return this.curve.twisted ? (e = r.redMul(f).redMul(a.redSub(this.curve._mulA(o))), n = c.redMul(f)) : (e = r.redMul(f).redMul(a.redSub(o)), n = this.curve._mulC(c).redMul(f)), this.curve.point(l, e, n)
    }, u.prototype.add = function (t) {
        return this.isInfinity() ? t : t.isInfinity() ? this : this.curve.extended ? this._extAdd(t) : this._projAdd(t)
    }, u.prototype.mul = function (t) {
        return this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve._wnafMul(this, t)
    }, u.prototype.mulAdd = function (t, e, n) {
        return this.curve._wnafMulAdd(1, [this, e], [t, n], 2, !1)
    }, u.prototype.jmulAdd = function (t, e, n) {
        return this.curve._wnafMulAdd(1, [this, e], [t, n], 2, !0)
    }, u.prototype.normalize = function () {
        if (this.zOne) return this;
        var t = this.z.redInvm();
        return this.x = this.x.redMul(t), this.y = this.y.redMul(t), this.t && (this.t = this.t.redMul(t)), this.z = this.curve.one, this.zOne = !0, this
    }, u.prototype.neg = function () {
        return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg())
    }, u.prototype.getX = function () {
        return this.normalize(), this.x.fromRed()
    }, u.prototype.getY = function () {
        return this.normalize(), this.y.fromRed()
    }, u.prototype.eq = function (t) {
        return this === t || 0 === this.getX().cmp(t.getX()) && 0 === this.getY().cmp(t.getY())
    }, u.prototype.eqXToP = function (t) {
        var e = t.toRed(this.curve.red).redMul(this.z);
        if (0 === this.x.cmp(e)) return !0;
        for (var n = t.clone(), r = this.curve.redN.redMul(this.z); ;) {
            if (n.iadd(this.curve.n), n.cmp(this.curve.p) >= 0) return !1;
            if (e.redIAdd(r), 0 === this.x.cmp(e)) return !0
        }
        return !1
    }, u.prototype.toP = u.prototype.normalize, u.prototype.mixedAdd = u.prototype.add
}