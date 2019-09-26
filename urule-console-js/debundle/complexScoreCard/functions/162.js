var func162 = function (t, e, n) {
    var r = n(0), i = n(13), o = n(1).Buffer, a = [1518500249, 1859775393, -1894007588, -899497514], s = new Array(80);

    function c() {
        this.init(), this._w = s, i.call(this, 64, 56)
    }

    function f(t) {
        return t << 5 | t >>> 27
    }

    function u(t) {
        return t << 30 | t >>> 2
    }

    function l(t, e, n, r) {
        return 0 === t ? e & n | ~e & r : 2 === t ? e & n | e & r | n & r : e ^ n ^ r
    }

    r(c, i), c.prototype.init = function () {
        return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
    }, c.prototype._update = function (t) {
        for (var e, n = this._w, r = 0 | this._a, i = 0 | this._b, o = 0 | this._c, s = 0 | this._d, c = 0 | this._e, h = 0; h < 16; ++h) n[h] = t.readInt32BE(4 * h);
        for (; h < 80; ++h) n[h] = (e = n[h - 3] ^ n[h - 8] ^ n[h - 14] ^ n[h - 16]) << 1 | e >>> 31;
        for (var d = 0; d < 80; ++d) {
            var p = ~~(d / 20), b = f(r) + l(p, i, o, s) + c + n[d] + a[p] | 0;
            c = s, s = o, o = u(i), i = r, r = b
        }
        this._a = r + this._a | 0, this._b = i + this._b | 0, this._c = o + this._c | 0, this._d = s + this._d | 0, this._e = c + this._e | 0
    }, c.prototype._hash = function () {
        var t = o.allocUnsafe(20);
        return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
    }, t.exports = c
}