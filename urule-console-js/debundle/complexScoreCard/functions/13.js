var func13 = function (t, e, n) {
    var r = n(1).Buffer;

    function i(t, e) {
        this._block = r.alloc(t), this._finalSize = e, this._blockSize = t, this._len = 0
    }

    i.prototype.update = function (t, e) {
        "string" == typeof t && (e = e || "utf8", t = r.from(t, e));
        for (var n = this._block, i = this._blockSize, o = t.length, a = this._len, s = 0; s < o;) {
            for (var c = a % i, f = Math.min(o - s, i - c), u = 0; u < f; u++) n[c + u] = t[s + u];
            s += f, (a += f) % i == 0 && this._update(n)
        }
        return this._len += o, this
    }, i.prototype.digest = function (t) {
        var e = this._len % this._blockSize;
        this._block[e] = 128, this._block.fill(0, e + 1), e >= this._finalSize && (this._update(this._block), this._block.fill(0));
        var n = 8 * this._len;
        if (n <= 4294967295) this._block.writeUInt32BE(n, this._blockSize - 4); else {
            var r = (4294967295 & n) >>> 0, i = (n - r) / 4294967296;
            this._block.writeUInt32BE(i, this._blockSize - 8), this._block.writeUInt32BE(r, this._blockSize - 4)
        }
        this._update(this._block);
        var o = this._hash();
        return t ? o.toString(t) : o
    }, i.prototype._update = function () {
        throw new Error("_update must be implemented by subclass")
    }, t.exports = i
}