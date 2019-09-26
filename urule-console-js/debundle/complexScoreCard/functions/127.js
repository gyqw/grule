var func127 = function (t, e, n) {
    "use strict";
    var r = n(29), i = n(3), o = n(0), a = r.base, s = n(4).utils;

    function c(t) {
        a.call(this, "mont", t), this.a = new i(t.a, 16).toRed(this.red), this.b = new i(t.b, 16).toRed(this.red), this.i4 = new i(4).toRed(this.red).redInvm(), this.two = new i(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two))
    }

    function f(t, e, n) {
        a.BasePoint.call(this, t, "projective"), null === e && null === n ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new i(e, 16), this.z = new i(n, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)))
    }

    o(c, a), t.exports = c, c.prototype.validate = function (t) {
        var e = t.normalize().x, n = e.redSqr(), r = n.redMul(e).redAdd(n.redMul(this.a)).redAdd(e);
        return 0 === r.redSqrt().redSqr().cmp(r)
    }, o(f, a.BasePoint), c.prototype.decodePoint = function (t, e) {
        return this.point(s.toArray(t, e), 1)
    }, c.prototype.point = function (t, e) {
        return new f(this, t, e)
    }, c.prototype.pointFromJSON = function (t) {
        return f.fromJSON(this, t)
    }, f.prototype.precompute = function () {
    }, f.prototype._encode = function () {
        return this.getX().toArray("be", this.curve.p.byteLength())
    }, f.fromJSON = function (t, e) {
        return new f(t, e[0], e[1] || t.one)
    }, f.prototype.inspect = function () {
        return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
    }, f.prototype.isInfinity = function () {
        return 0 === this.z.cmpn(0)
    }, f.prototype.dbl = function () {
        var t = this.x.redAdd(this.z).redSqr(), e = this.x.redSub(this.z).redSqr(), n = t.redSub(e), r = t.redMul(e),
            i = n.redMul(e.redAdd(this.curve.a24.redMul(n)));
        return this.curve.point(r, i)
    }, f.prototype.add = function () {
        throw new Error("Not supported on Montgomery curve")
    }, f.prototype.diffAdd = function (t, e) {
        var n = this.x.redAdd(this.z), r = this.x.redSub(this.z), i = t.x.redAdd(t.z), o = t.x.redSub(t.z).redMul(n),
            a = i.redMul(r), s = e.z.redMul(o.redAdd(a).redSqr()), c = e.x.redMul(o.redISub(a).redSqr());
        return this.curve.point(s, c)
    }, f.prototype.mul = function (t) {
        for (var e = t.clone(), n = this, r = this.curve.point(null, null), i = []; 0 !== e.cmpn(0); e.iushrn(1)) i.push(e.andln(1));
        for (var o = i.length - 1; o >= 0; o--) 0 === i[o] ? (n = n.diffAdd(r, this), r = r.dbl()) : (r = n.diffAdd(r, this), n = n.dbl());
        return r
    }, f.prototype.mulAdd = function () {
        throw new Error("Not supported on Montgomery curve")
    }, f.prototype.jumlAdd = function () {
        throw new Error("Not supported on Montgomery curve")
    }, f.prototype.eq = function (t) {
        return 0 === this.getX().cmp(t.getX())
    }, f.prototype.normalize = function () {
        return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this
    }, f.prototype.getX = function () {
        return this.normalize(), this.x.fromRed()
    }
}