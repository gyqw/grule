var func22 = function (t, e, n) {
    "use strict";
    var r = n(9), i = n(6);

    function o() {
        this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32
    }

    e.BlockHash = o, o.prototype.update = function (t, e) {
        if (t = r.toArray(t, e), this.pending ? this.pending = this.pending.concat(t) : this.pending = t, this.pendingTotal += t.length, this.pending.length >= this._delta8) {
            var n = (t = this.pending).length % this._delta8;
            this.pending = t.slice(t.length - n, t.length), 0 === this.pending.length && (this.pending = null), t = r.join32(t, 0, t.length - n, this.endian);
            for (var i = 0; i < t.length; i += this._delta32) this._update(t, i, i + this._delta32)
        }
        return this
    }, o.prototype.digest = function (t) {
        return this.update(this._pad()), i(null === this.pending), this._digest(t)
    }, o.prototype._pad = function () {
        var t = this.pendingTotal, e = this._delta8, n = e - (t + this.padLength) % e,
            r = new Array(n + this.padLength);
        r[0] = 128;
        for (var i = 1; i < n; i++) r[i] = 0;
        if (t <<= 3, "big" === this.endian) {
            for (var o = 8; o < this.padLength; o++) r[i++] = 0;
            r[i++] = 0, r[i++] = 0, r[i++] = 0, r[i++] = 0, r[i++] = t >>> 24 & 255, r[i++] = t >>> 16 & 255, r[i++] = t >>> 8 & 255, r[i++] = 255 & t
        } else for (r[i++] = 255 & t, r[i++] = t >>> 8 & 255, r[i++] = t >>> 16 & 255, r[i++] = t >>> 24 & 255, r[i++] = 0, r[i++] = 0, r[i++] = 0, r[i++] = 0, o = 8; o < this.padLength; o++) r[i++] = 0;
        return r
    }
}