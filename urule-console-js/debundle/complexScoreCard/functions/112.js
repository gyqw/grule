var func112 = function (t, e, n) {
    "use strict";
    var r = n(35), i = n(4), o = i.utils, a = o.assert, s = o.parseBytes, c = n(111), f = n(110);

    function u(t) {
        if (a("ed25519" === t, "only tested with ed25519 so far"), !(this instanceof u)) return new u(t);
        t = i.curves[t].curve, this.curve = t, this.g = t.g, this.g.precompute(t.n.bitLength() + 1), this.pointClass = t.point().constructor, this.encodingLength = Math.ceil(t.n.bitLength() / 8), this.hash = r.sha512
    }

    t.exports = u, u.prototype.sign = function (t, e) {
        t = s(t);
        var n = this.keyFromSecret(e), r = this.hashInt(n.messagePrefix(), t), i = this.g.mul(r),
            o = this.encodePoint(i), a = this.hashInt(o, n.pubBytes(), t).mul(n.priv()),
            c = r.add(a).umod(this.curve.n);
        return this.makeSignature({R: i, S: c, Rencoded: o})
    }, u.prototype.verify = function (t, e, n) {
        t = s(t), e = this.makeSignature(e);
        var r = this.keyFromPublic(n), i = this.hashInt(e.Rencoded(), r.pubBytes(), t), o = this.g.mul(e.S());
        return e.R().add(r.pub().mul(i)).eq(o)
    }, u.prototype.hashInt = function () {
        for (var t = this.hash(), e = 0; e < arguments.length; e++) t.update(arguments[e]);
        return o.intFromLE(t.digest()).umod(this.curve.n)
    }, u.prototype.keyFromPublic = function (t) {
        return c.fromPublic(this, t)
    }, u.prototype.keyFromSecret = function (t) {
        return c.fromSecret(this, t)
    }, u.prototype.makeSignature = function (t) {
        return t instanceof f ? t : new f(this, t)
    }, u.prototype.encodePoint = function (t) {
        var e = t.getY().toArray("le", this.encodingLength);
        return e[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0, e
    }, u.prototype.decodePoint = function (t) {
        var e = (t = o.parseBytes(t)).length - 1, n = t.slice(0, e).concat(-129 & t[e]), r = 0 != (128 & t[e]),
            i = o.intFromLE(n);
        return this.curve.pointFromY(i, r)
    }, u.prototype.encodeInt = function (t) {
        return t.toArray("le", this.encodingLength)
    }, u.prototype.decodeInt = function (t) {
        return o.intFromLE(t)
    }, u.prototype.isPoint = function (t) {
        return t instanceof this.pointClass
    }
}