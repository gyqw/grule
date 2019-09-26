var func163 = function (t, e, n) {
    var r = n(0), i = n(13), o = n(1).Buffer, a = [1518500249, 1859775393, -1894007588, -899497514], s = new Array(80);

    function c() {
        this.init(), this._w = s, i.call(this, 64, 56)
    }

    function f(t) {
        return t << 30 | t >>> 2
    }

    function u(t, e, n, r) {
        return 0 === t ? e & n | ~e & r : 2 === t ? e & n | e & r | n & r : e ^ n ^ r
    }

    r(c, i), c.prototype.init = function () {
        return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
    }, c.prototype._update = function (t) {
        for (var e, n = this._w, r = 0 | this._a, i = 0 | this._b, o = 0 | this._c, s = 0 | this._d, c = 0 | this._e, l = 0; l < 16; ++l) n[l] = t.readInt32BE(4 * l);
        for (; l < 80; ++l) n[l] = n[l - 3] ^ n[l - 8] ^ n[l - 14] ^ n[l - 16];
        for (var h = 0; h < 80; ++h) {
            var d = ~~(h / 20), p = 0 | ((e = r) << 5 | e >>> 27) + u(d, i, o, s) + c + n[h] + a[d];
            c = s, s = o, o = f(i), i = r, r = p
        }
        this._a = r + this._a | 0, this._b = i + this._b | 0, this._c = o + this._c | 0, this._d = s + this._d | 0, this._e = c + this._e | 0
    }, c.prototype._hash = function () {
        var t = o.allocUnsafe(20);
        return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
    }, t.exports = c
}