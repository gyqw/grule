var func129 = function (t, e, n) {
    "use strict";
    var r = n(3), i = n(4).utils, o = i.getNAF, a = i.getJSF, s = i.assert;

    function c(t, e) {
        this.type = t, this.p = new r(e.p, 16), this.red = e.prime ? r.red(e.prime) : r.mont(this.p), this.zero = new r(0).toRed(this.red), this.one = new r(1).toRed(this.red), this.two = new r(2).toRed(this.red), this.n = e.n && new r(e.n, 16), this.g = e.g && this.pointFromJSON(e.g, e.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4);
        var n = this.n && this.p.div(this.n);
        !n || n.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red))
    }

    function f(t, e) {
        this.curve = t, this.type = e, this.precomputed = null
    }

    t.exports = c, c.prototype.point = function () {
        throw new Error("Not implemented")
    }, c.prototype.validate = function () {
        throw new Error("Not implemented")
    }, c.prototype._fixedNafMul = function (t, e) {
        s(t.precomputed);
        var n = t._getDoubles(), r = o(e, 1), i = (1 << n.step + 1) - (n.step % 2 == 0 ? 2 : 1);
        i /= 3;
        for (var a = [], c = 0; c < r.length; c += n.step) {
            var f = 0;
            for (e = c + n.step - 1; e >= c; e--) f = (f << 1) + r[e];
            a.push(f)
        }
        for (var u = this.jpoint(null, null, null), l = this.jpoint(null, null, null), h = i; h > 0; h--) {
            for (c = 0; c < a.length; c++) (f = a[c]) === h ? l = l.mixedAdd(n.points[c]) : f === -h && (l = l.mixedAdd(n.points[c].neg()));
            u = u.add(l)
        }
        return u.toP()
    }, c.prototype._wnafMul = function (t, e) {
        var n = 4, r = t._getNAFPoints(n);
        n = r.wnd;
        for (var i = r.points, a = o(e, n), c = this.jpoint(null, null, null), f = a.length - 1; f >= 0; f--) {
            for (e = 0; f >= 0 && 0 === a[f]; f--) e++;
            if (f >= 0 && e++, c = c.dblp(e), f < 0) break;
            var u = a[f];
            s(0 !== u), c = "affine" === t.type ? u > 0 ? c.mixedAdd(i[u - 1 >> 1]) : c.mixedAdd(i[-u - 1 >> 1].neg()) : u > 0 ? c.add(i[u - 1 >> 1]) : c.add(i[-u - 1 >> 1].neg())
        }
        return "affine" === t.type ? c.toP() : c
    }, c.prototype._wnafMulAdd = function (t, e, n, r, i) {
        for (var s = this._wnafT1, c = this._wnafT2, f = this._wnafT3, u = 0, l = 0; l < r; l++) {
            var h = (C = e[l])._getNAFPoints(t);
            s[l] = h.wnd, c[l] = h.points
        }
        for (l = r - 1; l >= 1; l -= 2) {
            var d = l - 1, p = l;
            if (1 === s[d] && 1 === s[p]) {
                var b = [e[d], null, null, e[p]];
                0 === e[d].y.cmp(e[p].y) ? (b[1] = e[d].add(e[p]), b[2] = e[d].toJ().mixedAdd(e[p].neg())) : 0 === e[d].y.cmp(e[p].y.redNeg()) ? (b[1] = e[d].toJ().mixedAdd(e[p]), b[2] = e[d].add(e[p].neg())) : (b[1] = e[d].toJ().mixedAdd(e[p]), b[2] = e[d].toJ().mixedAdd(e[p].neg()));
                var g = [-3, -1, -5, -7, 0, 7, 5, 1, 3], y = a(n[d], n[p]);
                u = Math.max(y[0].length, u), f[d] = new Array(u), f[p] = new Array(u);
                for (var m = 0; m < u; m++) {
                    var v = 0 | y[0][m], A = 0 | y[1][m];
                    f[d][m] = g[3 * (v + 1) + (A + 1)], f[p][m] = 0, c[d] = b
                }
            } else f[d] = o(n[d], s[d]), f[p] = o(n[p], s[p]), u = Math.max(f[d].length, u), u = Math.max(f[p].length, u)
        }
        var w = this.jpoint(null, null, null), _ = this._wnafT4;
        for (l = u; l >= 0; l--) {
            for (var E = 0; l >= 0;) {
                var x = !0;
                for (m = 0; m < r; m++) _[m] = 0 | f[m][l], 0 !== _[m] && (x = !1);
                if (!x) break;
                E++, l--
            }
            if (l >= 0 && E++, w = w.dblp(E), l < 0) break;
            for (m = 0; m < r; m++) {
                var C, B = _[m];
                0 !== B && (B > 0 ? C = c[m][B - 1 >> 1] : B < 0 && (C = c[m][-B - 1 >> 1].neg()), w = "affine" === C.type ? w.mixedAdd(C) : w.add(C))
            }
        }
        for (l = 0; l < r; l++) c[l] = null;
        return i ? w : w.toP()
    }, c.BasePoint = f, f.prototype.eq = function () {
        throw new Error("Not implemented")
    }, f.prototype.validate = function () {
        return this.curve.validate(this)
    }, c.prototype.decodePoint = function (t, e) {
        t = i.toArray(t, e);
        var n = this.p.byteLength();
        if ((4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * n) return 6 === t[0] ? s(t[t.length - 1] % 2 == 0) : 7 === t[0] && s(t[t.length - 1] % 2 == 1), this.point(t.slice(1, 1 + n), t.slice(1 + n, 1 + 2 * n));
        if ((2 === t[0] || 3 === t[0]) && t.length - 1 === n) return this.pointFromX(t.slice(1, 1 + n), 3 === t[0]);
        throw new Error("Unknown point format")
    }, f.prototype.encodeCompressed = function (t) {
        return this.encode(t, !0)
    }, f.prototype._encode = function (t) {
        var e = this.curve.p.byteLength(), n = this.getX().toArray("be", e);
        return t ? [this.getY().isEven() ? 2 : 3].concat(n) : [4].concat(n, this.getY().toArray("be", e))
    }, f.prototype.encode = function (t, e) {
        return i.encode(this._encode(e), t)
    }, f.prototype.precompute = function (t) {
        if (this.precomputed) return this;
        var e = {doubles: null, naf: null, beta: null};
        return e.naf = this._getNAFPoints(8), e.doubles = this._getDoubles(4, t), e.beta = this._getBeta(), this.precomputed = e, this
    }, f.prototype._hasDoubles = function (t) {
        if (!this.precomputed) return !1;
        var e = this.precomputed.doubles;
        return !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
    }, f.prototype._getDoubles = function (t, e) {
        if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
        for (var n = [this], r = this, i = 0; i < e; i += t) {
            for (var o = 0; o < t; o++) r = r.dbl();
            n.push(r)
        }
        return {step: t, points: n}
    }, f.prototype._getNAFPoints = function (t) {
        if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
        for (var e = [this], n = (1 << t) - 1, r = 1 === n ? null : this.dbl(), i = 1; i < n; i++) e[i] = e[i - 1].add(r);
        return {wnd: t, points: e}
    }, f.prototype._getBeta = function () {
        return null
    }, f.prototype.dblp = function (t) {
        for (var e = this, n = 0; n < t; n++) e = e.dbl();
        return e
    }
}