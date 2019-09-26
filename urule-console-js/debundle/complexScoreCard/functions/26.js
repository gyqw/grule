var func26 = function (t, e, n) {
    "use strict";
    var r = n(0), i = n(45), o = n(41), a = n(40), s = n(10);

    function c(t) {
        s.call(this, "digest"), this._hash = t
    }

    r(c, s), c.prototype._update = function (t) {
        this._hash.update(t)
    }, c.prototype._final = function () {
        return this._hash.digest()
    }, t.exports = function (t) {
        return "md5" === (t = t.toLowerCase()) ? new i : "rmd160" === t || "ripemd160" === t ? new o : new c(a(t))
    }
}