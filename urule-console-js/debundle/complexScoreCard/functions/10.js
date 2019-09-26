var func10 = function (t, e, n) {
    var r = n(1).Buffer, i = n(33).Transform, o = n(42).StringDecoder;

    function a(t) {
        i.call(this), this.hashMode = "string" == typeof t, this.hashMode ? this[t] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null
    }

    n(0)(a, i), a.prototype.update = function (t, e, n) {
        "string" == typeof t && (t = r.from(t, e));
        var i = this._update(t);
        return this.hashMode ? this : (n && (i = this._toString(i, n)), i)
    }, a.prototype.setAutoPadding = function () {
    }, a.prototype.getAuthTag = function () {
        throw new Error("trying to get auth tag in unsupported state")
    }, a.prototype.setAuthTag = function () {
        throw new Error("trying to set auth tag in unsupported state")
    }, a.prototype.setAAD = function () {
        throw new Error("trying to set aad in unsupported state")
    }, a.prototype._transform = function (t, e, n) {
        var r;
        try {
            this.hashMode ? this._update(t) : this.push(this._update(t))
        } catch (t) {
            r = t
        } finally {
            n(r)
        }
    }, a.prototype._flush = function (t) {
        var e;
        try {
            this.push(this.__final())
        } catch (t) {
            e = t
        }
        t(e)
    }, a.prototype._finalOrDigest = function (t) {
        var e = this.__final() || r.alloc(0);
        return t && (e = this._toString(e, t, !0)), e
    }, a.prototype._toString = function (t, e, n) {
        if (this._decoder || (this._decoder = new o(e), this._encoding = e), this._encoding !== e) throw new Error("can't switch encodings");
        var r = this._decoder.write(t);
        return n && (r += this._decoder.end()), r
    }, t.exports = a
}