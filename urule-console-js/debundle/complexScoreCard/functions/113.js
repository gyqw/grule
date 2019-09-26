var func113 = function (t, e, n) {
    "use strict";
    var r = n(3), i = n(4).utils, o = i.assert;

    function a(t, e) {
        if (t instanceof a) return t;
        this._importDER(t, e) || (o(t.r && t.s, "Signature without r or s"), this.r = new r(t.r, 16), this.s = new r(t.s, 16), void 0 === t.recoveryParam ? this.recoveryParam = null : this.recoveryParam = t.recoveryParam)
    }

    function s(t, e) {
        var n = t[e.place++];
        if (!(128 & n)) return n;
        for (var r = 15 & n, i = 0, o = 0, a = e.place; o < r; o++, a++) i <<= 8, i |= t[a];
        return e.place = a, i
    }

    function c(t) {
        for (var e = 0, n = t.length - 1; !t[e] && !(128 & t[e + 1]) && e < n;) e++;
        return 0 === e ? t : t.slice(e)
    }

    function f(t, e) {
        if (e < 128) t.push(e); else {
            var n = 1 + (Math.log(e) / Math.LN2 >>> 3);
            for (t.push(128 | n); --n;) t.push(e >>> (n << 3) & 255);
            t.push(e)
        }
    }

    t.exports = a, a.prototype._importDER = function (t, e) {
        t = i.toArray(t, e);
        var n = new function () {
            this.place = 0
        };
        if (48 !== t[n.place++]) return !1;
        if (s(t, n) + n.place !== t.length) return !1;
        if (2 !== t[n.place++]) return !1;
        var o = s(t, n), a = t.slice(n.place, o + n.place);
        if (n.place += o, 2 !== t[n.place++]) return !1;
        var c = s(t, n);
        if (t.length !== c + n.place) return !1;
        var f = t.slice(n.place, c + n.place);
        return 0 === a[0] && 128 & a[1] && (a = a.slice(1)), 0 === f[0] && 128 & f[1] && (f = f.slice(1)), this.r = new r(a), this.s = new r(f), this.recoveryParam = null, !0
    }, a.prototype.toDER = function (t) {
        var e = this.r.toArray(), n = this.s.toArray();
        for (128 & e[0] && (e = [0].concat(e)), 128 & n[0] && (n = [0].concat(n)), e = c(e), n = c(n); !(n[0] || 128 & n[1]);) n = n.slice(1);
        var r = [2];
        f(r, e.length), (r = r.concat(e)).push(2), f(r, n.length);
        var o = r.concat(n), a = [48];
        return f(a, o.length), a = a.concat(o), i.encode(a, t)
    }
}