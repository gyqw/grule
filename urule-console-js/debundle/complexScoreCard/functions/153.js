var func153 = function (t, e, n) {
    "use strict";
    var r = n(6);

    function i(t) {
        this.options = t, this.type = this.options.type, this.blockSize = 8, this._init(), this.buffer = new Array(this.blockSize), this.bufferOff = 0
    }

    t.exports = i, i.prototype._init = function () {
    }, i.prototype.update = function (t) {
        return 0 === t.length ? [] : "decrypt" === this.type ? this._updateDecrypt(t) : this._updateEncrypt(t)
    }, i.prototype._buffer = function (t, e) {
        for (var n = Math.min(this.buffer.length - this.bufferOff, t.length - e), r = 0; r < n; r++) this.buffer[this.bufferOff + r] = t[e + r];
        return this.bufferOff += n, n
    }, i.prototype._flushBuffer = function (t, e) {
        return this._update(this.buffer, 0, t, e), this.bufferOff = 0, this.blockSize
    }, i.prototype._updateEncrypt = function (t) {
        var e = 0, n = 0, r = (this.bufferOff + t.length) / this.blockSize | 0, i = new Array(r * this.blockSize);
        0 !== this.bufferOff && (e += this._buffer(t, e), this.bufferOff === this.buffer.length && (n += this._flushBuffer(i, n)));
        for (var o = t.length - (t.length - e) % this.blockSize; e < o; e += this.blockSize) this._update(t, e, i, n), n += this.blockSize;
        for (; e < t.length; e++, this.bufferOff++) this.buffer[this.bufferOff] = t[e];
        return i
    }, i.prototype._updateDecrypt = function (t) {
        for (var e = 0, n = 0, r = Math.ceil((this.bufferOff + t.length) / this.blockSize) - 1, i = new Array(r * this.blockSize); r > 0; r--) e += this._buffer(t, e), n += this._flushBuffer(i, n);
        return e += this._buffer(t, e), i
    }, i.prototype.final = function (t) {
        var e, n;
        return t && (e = this.update(t)), n = "encrypt" === this.type ? this._finalEncrypt() : this._finalDecrypt(), e ? e.concat(n) : n
    }, i.prototype._pad = function (t, e) {
        if (0 === e) return !1;
        for (; e < t.length;) t[e++] = 0;
        return !0
    }, i.prototype._finalEncrypt = function () {
        if (!this._pad(this.buffer, this.bufferOff)) return [];
        var t = new Array(this.blockSize);
        return this._update(this.buffer, 0, t, 0), t
    }, i.prototype._unpad = function (t) {
        return t
    }, i.prototype._finalDecrypt = function () {
        r.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
        var t = new Array(this.blockSize);
        return this._flushBuffer(t, 0), this._unpad(t)
    }
}