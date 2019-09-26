var func150 = function (t, e, n) {
    "use strict";
    var r = n(6), i = n(0), o = n(39), a = o.Cipher, s = o.DES;

    function c(t) {
        a.call(this, t);
        var e = new function (t, e) {
            r.equal(e.length, 24, "Invalid key length");
            var n = e.slice(0, 8), i = e.slice(8, 16), o = e.slice(16, 24);
            this.ciphers = "encrypt" === t ? [s.create({type: "encrypt", key: n}), s.create({
                type: "decrypt",
                key: i
            }), s.create({type: "encrypt", key: o})] : [s.create({type: "decrypt", key: o}), s.create({
                type: "encrypt",
                key: i
            }), s.create({type: "decrypt", key: n})]
        }(this.type, this.options.key);
        this._edeState = e
    }

    i(c, a), t.exports = c, c.create = function (t) {
        return new c(t)
    }, c.prototype._update = function (t, e, n, r) {
        var i = this._edeState;
        i.ciphers[0]._update(t, e, n, r), i.ciphers[1]._update(n, r, n, r), i.ciphers[2]._update(n, r, n, r)
    }, c.prototype._pad = s.prototype._pad, c.prototype._unpad = s.prototype._unpad
}