var func176 = function (t, e, n) {
    "use strict";
    var r = n(1).Buffer, i = n(33).Transform;

    function o(t) {
        i.call(this), this._block = r.allocUnsafe(t), this._blockSize = t, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1
    }

    n(0)(o, i), o.prototype._transform = function (t, e, n) {
        var r = null;
        try {
            this.update(t, e)
        } catch (t) {
            r = t
        }
        n(r)
    }, o.prototype._flush = function (t) {
        var e = null;
        try {
            this.push(this.digest())
        } catch (t) {
            e = t
        }
        t(e)
    }, o.prototype.update = function (t, e) {
        if (function (t, e) {
            if (!r.isBuffer(t) && "string" != typeof t) throw new TypeError("Data must be a string or a buffer")
        }(t), this._finalized) throw new Error("Digest already called");
        r.isBuffer(t) || (t = r.from(t, e));
        for (var n = this._block, i = 0; this._blockOffset + t.length - i >= this._blockSize;) {
            for (var o = this._blockOffset; o < this._blockSize;) n[o++] = t[i++];
            this._update(), this._blockOffset = 0
        }
        for (; i < t.length;) n[this._blockOffset++] = t[i++];
        for (var a = 0, s = 8 * t.length; s > 0; ++a) this._length[a] += s, (s = this._length[a] / 4294967296 | 0) > 0 && (this._length[a] -= 4294967296 * s);
        return this
    }, o.prototype._update = function () {
        throw new Error("_update is not implemented")
    }, o.prototype.digest = function (t) {
        if (this._finalized) throw new Error("Digest already called");
        this._finalized = !0;
        var e = this._digest();
        void 0 !== t && (e = e.toString(t)), this._block.fill(0), this._blockOffset = 0;
        for (var n = 0; n < 4; ++n) this._length[n] = 0;
        return e
    }, o.prototype._digest = function () {
        throw new Error("_digest is not implemented")
    }, t.exports = o
}