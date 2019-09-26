var func164 = function (t, e, n) {
    "use strict";
    (function (e) {
        var r = n(33).Transform;

        function i(t) {
            r.call(this), this._block = new e(t), this._blockSize = t, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1
        }

        n(0)(i, r), i.prototype._transform = function (t, n, r) {
            var i = null;
            try {
                "buffer" !== n && (t = new e(t, n)), this.update(t)
            } catch (t) {
                i = t
            }
            r(i)
        }, i.prototype._flush = function (t) {
            var e = null;
            try {
                this.push(this._digest())
            } catch (t) {
                e = t
            }
            t(e)
        }, i.prototype.update = function (t, n) {
            if (!e.isBuffer(t) && "string" != typeof t) throw new TypeError("Data must be a string or a buffer");
            if (this._finalized) throw new Error("Digest already called");
            e.isBuffer(t) || (t = new e(t, n || "binary"));
            for (var r = this._block, i = 0; this._blockOffset + t.length - i >= this._blockSize;) {
                for (var o = this._blockOffset; o < this._blockSize;) r[o++] = t[i++];
                this._update(), this._blockOffset = 0
            }
            for (; i < t.length;) r[this._blockOffset++] = t[i++];
            for (var a = 0, s = 8 * t.length; s > 0; ++a) this._length[a] += s, (s = this._length[a] / 4294967296 | 0) > 0 && (this._length[a] -= 4294967296 * s);
            return this
        }, i.prototype._update = function (t) {
            throw new Error("_update is not implemented")
        }, i.prototype.digest = function (t) {
            if (this._finalized) throw new Error("Digest already called");
            this._finalized = !0;
            var e = this._digest();
            return void 0 !== t && (e = e.toString(t)), e
        }, i.prototype._digest = function () {
            throw new Error("_digest is not implemented")
        }, t.exports = i
    }).call(this, n(2).Buffer)
}