var func64 = function (t, e, n) {
    var r = n(31), i = n(1).Buffer, o = n(10);

    function a(t, e, n, a) {
        o.call(this), this._cipher = new r.AES(e), this._prev = i.from(n), this._cache = i.allocUnsafe(0), this._secCache = i.allocUnsafe(0), this._decrypt = a, this._mode = t
    }

    n(0)(a, o), a.prototype._update = function (t) {
        return this._mode.encrypt(this, t, this._decrypt)
    }, a.prototype._final = function () {
        this._cipher.scrub()
    }, t.exports = a
}