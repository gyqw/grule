var func152 = function (t, e, n) {
    "use strict";
    var r = n(6), i = n(0), o = n(39), a = o.utils, s = o.Cipher;

    function c(t) {
        s.call(this, t);
        var e = new function () {
            this.tmp = new Array(2), this.keys = null
        };
        this._desState = e, this.deriveKeys(e, t.key)
    }

    i(c, s), t.exports = c, c.create = function (t) {
        return new c(t)
    };
    var f = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
    c.prototype.deriveKeys = function (t, e) {
        t.keys = new Array(32), r.equal(e.length, this.blockSize, "Invalid key length");
        var n = a.readUInt32BE(e, 0), i = a.readUInt32BE(e, 4);
        a.pc1(n, i, t.tmp, 0), n = t.tmp[0], i = t.tmp[1];
        for (var o = 0; o < t.keys.length; o += 2) {
            var s = f[o >>> 1];
            n = a.r28shl(n, s), i = a.r28shl(i, s), a.pc2(n, i, t.keys, o)
        }
    }, c.prototype._update = function (t, e, n, r) {
        var i = this._desState, o = a.readUInt32BE(t, e), s = a.readUInt32BE(t, e + 4);
        a.ip(o, s, i.tmp, 0), o = i.tmp[0], s = i.tmp[1], "encrypt" === this.type ? this._encrypt(i, o, s, i.tmp, 0) : this._decrypt(i, o, s, i.tmp, 0), o = i.tmp[0], s = i.tmp[1], a.writeUInt32BE(n, o, r), a.writeUInt32BE(n, s, r + 4)
    }, c.prototype._pad = function (t, e) {
        for (var n = t.length - e, r = e; r < t.length; r++) t[r] = n;
        return !0
    }, c.prototype._unpad = function (t) {
        for (var e = t[t.length - 1], n = t.length - e; n < t.length; n++) r.equal(t[n], e);
        return t.slice(0, t.length - e)
    }, c.prototype._encrypt = function (t, e, n, r, i) {
        for (var o = e, s = n, c = 0; c < t.keys.length; c += 2) {
            var f = t.keys[c], u = t.keys[c + 1];
            a.expand(s, t.tmp, 0), f ^= t.tmp[0], u ^= t.tmp[1];
            var l = a.substitute(f, u), h = s;
            s = (o ^ a.permute(l)) >>> 0, o = h
        }
        a.rip(s, o, r, i)
    }, c.prototype._decrypt = function (t, e, n, r, i) {
        for (var o = n, s = e, c = t.keys.length - 2; c >= 0; c -= 2) {
            var f = t.keys[c], u = t.keys[c + 1];
            a.expand(o, t.tmp, 0), f ^= t.tmp[0], u ^= t.tmp[1];
            var l = a.substitute(f, u), h = o;
            o = (s ^ a.permute(l)) >>> 0, s = h
        }
        a.rip(o, s, r, i)
    }
}