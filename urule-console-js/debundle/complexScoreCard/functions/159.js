var func159 = function (t, e, n) {
    "use strict";
    var r = n(0), i = n(1).Buffer, o = n(10), a = i.alloc(128), s = 64;

    function c(t, e) {
        o.call(this, "digest"), "string" == typeof e && (e = i.from(e)), this._alg = t, this._key = e, e.length > s ? e = t(e) : e.length < s && (e = i.concat([e, a], s));
        for (var n = this._ipad = i.allocUnsafe(s), r = this._opad = i.allocUnsafe(s), c = 0; c < s; c++) n[c] = 54 ^ e[c], r[c] = 92 ^ e[c];
        this._hash = [n]
    }

    r(c, o), c.prototype._update = function (t) {
        this._hash.push(t)
    }, c.prototype._final = function () {
        var t = this._alg(i.concat(this._hash));
        return this._alg(i.concat([this._opad, t]))
    }, t.exports = c
}