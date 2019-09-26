var func77 = function (t, e, n) {
    var r = n(0), i = n(13), o = n(1).Buffer,
        a = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
        s = new Array(64);

    function c() {
        this.init(), this._w = s, i.call(this, 64, 56)
    }

    function f(t, e, n) {
        return n ^ t & (e ^ n)
    }

    function u(t, e, n) {
        return t & e | n & (t | e)
    }

    function l(t) {
        return (t >>> 2 | t << 30) ^ (t >>> 13 | t << 19) ^ (t >>> 22 | t << 10)
    }

    function h(t) {
        return (t >>> 6 | t << 26) ^ (t >>> 11 | t << 21) ^ (t >>> 25 | t << 7)
    }

    function d(t) {
        return (t >>> 7 | t << 25) ^ (t >>> 18 | t << 14) ^ t >>> 3
    }

    r(c, i), c.prototype.init = function () {
        return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this
    }, c.prototype._update = function (t) {
        for (var e, n = this._w, r = 0 | this._a, i = 0 | this._b, o = 0 | this._c, s = 0 | this._d, c = 0 | this._e, p = 0 | this._f, b = 0 | this._g, g = 0 | this._h, y = 0; y < 16; ++y) n[y] = t.readInt32BE(4 * y);
        for (; y < 64; ++y) n[y] = 0 | (((e = n[y - 2]) >>> 17 | e << 15) ^ (e >>> 19 | e << 13) ^ e >>> 10) + n[y - 7] + d(n[y - 15]) + n[y - 16];
        for (var m = 0; m < 64; ++m) {
            var v = g + h(c) + f(c, p, b) + a[m] + n[m] | 0, A = l(r) + u(r, i, o) | 0;
            g = b, b = p, p = c, c = s + v | 0, s = o, o = i, i = r, r = v + A | 0
        }
        this._a = r + this._a | 0, this._b = i + this._b | 0, this._c = o + this._c | 0, this._d = s + this._d | 0, this._e = c + this._e | 0, this._f = p + this._f | 0, this._g = b + this._g | 0, this._h = g + this._h | 0
    }, c.prototype._hash = function () {
        var t = o.allocUnsafe(32);
        return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t.writeInt32BE(this._h, 28), t
    }, t.exports = c
}