var func75 = function (t, e, n) {
    "use strict";
    var r = n(0), i = n(159), o = n(10), a = n(1).Buffer, s = n(74), c = n(41), f = n(40), u = a.alloc(128);

    function l(t, e) {
        o.call(this, "digest"), "string" == typeof e && (e = a.from(e));
        var n = "sha512" === t || "sha384" === t ? 128 : 64;
        this._alg = t, this._key = e, e.length > n ? e = ("rmd160" === t ? new c : f(t)).update(e).digest() : e.length < n && (e = a.concat([e, u], n));
        for (var r = this._ipad = a.allocUnsafe(n), i = this._opad = a.allocUnsafe(n), s = 0; s < n; s++) r[s] = 54 ^ e[s], i[s] = 92 ^ e[s];
        this._hash = "rmd160" === t ? new c : f(t), this._hash.update(r)
    }

    r(l, o), l.prototype._update = function (t) {
        this._hash.update(t)
    }, l.prototype._final = function () {
        var t = this._hash.digest();
        return ("rmd160" === this._alg ? new c : f(this._alg)).update(this._opad).update(t).digest()
    }, t.exports = function (t, e) {
        return "rmd160" === (t = t.toLowerCase()) || "ripemd160" === t ? new l("rmd160", e) : "md5" === t ? new i(s, e) : new l(t, e)
    }
}