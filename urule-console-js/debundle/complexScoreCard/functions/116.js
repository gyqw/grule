var func116 = function (t, e, n) {
    "use strict";
    var r = n(3), i = n(115), o = n(4), a = o.utils.assert, s = n(114), c = n(113);

    function f(t) {
        if (!(this instanceof f)) return new f(t);
        "string" == typeof t && (a(o.curves.hasOwnProperty(t), "Unknown curve " + t), t = o.curves[t]), t instanceof o.curves.PresetCurve && (t = {curve: t}), this.curve = t.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = t.curve.g, this.g.precompute(t.curve.n.bitLength() + 1), this.hash = t.hash || t.curve.hash
    }

    t.exports = f, f.prototype.keyPair = function (t) {
        return new s(this, t)
    }, f.prototype.keyFromPrivate = function (t, e) {
        return s.fromPrivate(this, t, e)
    }, f.prototype.keyFromPublic = function (t, e) {
        return s.fromPublic(this, t, e)
    }, f.prototype.genKeyPair = function (t) {
        t || (t = {});
        for (var e = new i({
            hash: this.hash,
            pers: t.pers,
            persEnc: t.persEnc || "utf8",
            entropy: t.entropy || o.rand(this.hash.hmacStrength),
            entropyEnc: t.entropy && t.entropyEnc || "utf8",
            nonce: this.n.toArray()
        }), n = this.n.byteLength(), a = this.n.sub(new r(2)); ;) {
            var s = new r(e.generate(n));
            if (!(s.cmp(a) > 0)) return s.iaddn(1), this.keyFromPrivate(s)
        }
    }, f.prototype._truncateToN = function (t, e) {
        var n = 8 * t.byteLength() - this.n.bitLength();
        return n > 0 && (t = t.ushrn(n)), !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t
    }, f.prototype.sign = function (t, e, n, o) {
        "object" == typeof n && (o = n, n = null), o || (o = {}), e = this.keyFromPrivate(e, n), t = this._truncateToN(new r(t, 16));
        for (var a = this.n.byteLength(), s = e.getPrivate().toArray("be", a), f = t.toArray("be", a), u = new i({
            hash: this.hash,
            entropy: s,
            nonce: f,
            pers: o.pers,
            persEnc: o.persEnc || "utf8"
        }), l = this.n.sub(new r(1)), h = 0; ; h++) {
            var d = o.k ? o.k(h) : new r(u.generate(this.n.byteLength()));
            if (!((d = this._truncateToN(d, !0)).cmpn(1) <= 0 || d.cmp(l) >= 0)) {
                var p = this.g.mul(d);
                if (!p.isInfinity()) {
                    var b = p.getX(), g = b.umod(this.n);
                    if (0 !== g.cmpn(0)) {
                        var y = d.invm(this.n).mul(g.mul(e.getPrivate()).iadd(t));
                        if (0 !== (y = y.umod(this.n)).cmpn(0)) {
                            var m = (p.getY().isOdd() ? 1 : 0) | (0 !== b.cmp(g) ? 2 : 0);
                            return o.canonical && y.cmp(this.nh) > 0 && (y = this.n.sub(y), m ^= 1), new c({
                                r: g,
                                s: y,
                                recoveryParam: m
                            })
                        }
                    }
                }
            }
        }
    }, f.prototype.verify = function (t, e, n, i) {
        t = this._truncateToN(new r(t, 16)), n = this.keyFromPublic(n, i);
        var o = (e = new c(e, "hex")).r, a = e.s;
        if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
        if (a.cmpn(1) < 0 || a.cmp(this.n) >= 0) return !1;
        var s, f = a.invm(this.n), u = f.mul(t).umod(this.n), l = f.mul(o).umod(this.n);
        return this.curve._maxwellTrick ? !(s = this.g.jmulAdd(u, n.getPublic(), l)).isInfinity() && s.eqXToP(o) : !(s = this.g.mulAdd(u, n.getPublic(), l)).isInfinity() && 0 === s.getX().umod(this.n).cmp(o)
    }, f.prototype.recoverPubKey = function (t, e, n, i) {
        a((3 & n) === n, "The recovery param is more than two bits"), e = new c(e, i);
        var o = this.n, s = new r(t), f = e.r, u = e.s, l = 1 & n, h = n >> 1;
        if (f.cmp(this.curve.p.umod(this.curve.n)) >= 0 && h) throw new Error("Unable to find sencond key candinate");
        f = h ? this.curve.pointFromX(f.add(this.curve.n), l) : this.curve.pointFromX(f, l);
        var d = e.r.invm(o), p = o.sub(s).mul(d).umod(o), b = u.mul(d).umod(o);
        return this.g.mulAdd(p, f, b)
    }, f.prototype.getKeyRecoveryParam = function (t, e, n, r) {
        if (null !== (e = new c(e, r)).recoveryParam) return e.recoveryParam;
        for (var i = 0; i < 4; i++) {
            var o;
            try {
                o = this.recoverPubKey(t, e, i)
            } catch (t) {
                continue
            }
            if (o.eq(n)) return i
        }
        throw new Error("Unable to find valid recovery factor")
    }
}