var func142 = function (t, e, n) {
    var r = n(1).Buffer, i = r.alloc(16, 0);

    function o(t) {
        var e = r.allocUnsafe(16);
        return e.writeUInt32BE(t[0] >>> 0, 0), e.writeUInt32BE(t[1] >>> 0, 4), e.writeUInt32BE(t[2] >>> 0, 8), e.writeUInt32BE(t[3] >>> 0, 12), e
    }

    function a(t) {
        this.h = t, this.state = r.alloc(16, 0), this.cache = r.allocUnsafe(0)
    }

    a.prototype.ghash = function (t) {
        for (var e = -1; ++e < t.length;) this.state[e] ^= t[e];
        this._multiply()
    }, a.prototype._multiply = function () {
        for (var t, e, n, r = [(t = this.h).readUInt32BE(0), t.readUInt32BE(4), t.readUInt32BE(8), t.readUInt32BE(12)], i = [0, 0, 0, 0], a = -1; ++a < 128;) {
            for (0 != (this.state[~~(a / 8)] & 1 << 7 - a % 8) && (i[0] ^= r[0], i[1] ^= r[1], i[2] ^= r[2], i[3] ^= r[3]), n = 0 != (1 & r[3]), e = 3; e > 0; e--) r[e] = r[e] >>> 1 | (1 & r[e - 1]) << 31;
            r[0] = r[0] >>> 1, n && (r[0] = r[0] ^ 225 << 24)
        }
        this.state = o(i)
    }, a.prototype.update = function (t) {
        var e;
        for (this.cache = r.concat([this.cache, t]); this.cache.length >= 16;) e = this.cache.slice(0, 16), this.cache = this.cache.slice(16), this.ghash(e)
    }, a.prototype.final = function (t, e) {
        return this.cache.length && this.ghash(r.concat([this.cache, i], 16)), this.ghash(o([0, t, 0, e])), this.state
    }, t.exports = a
}