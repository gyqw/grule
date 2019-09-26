var func61 = function (t, e, n) {
    var r;

    function i(t) {
        this.rand = t
    }

    if (t.exports = function (t) {
        return r || (r = new i(null)), r.generate(t)
    }, t.exports.Rand = i, i.prototype.generate = function (t) {
        return this._rand(t)
    }, i.prototype._rand = function (t) {
        if (this.rand.getBytes) return this.rand.getBytes(t);
        for (var e = new Uint8Array(t), n = 0; n < e.length; n++) e[n] = this.rand.getByte();
        return e
    }, "object" == typeof self) self.crypto && self.crypto.getRandomValues ? i.prototype._rand = function (t) {
        var e = new Uint8Array(t);
        return self.crypto.getRandomValues(e), e
    } : self.msCrypto && self.msCrypto.getRandomValues ? i.prototype._rand = function (t) {
        var e = new Uint8Array(t);
        return self.msCrypto.getRandomValues(e), e
    } : "object" == typeof window && (i.prototype._rand = function () {
        throw new Error("Not implemented yet")
    }); else try {
        var o = n(136);
        if ("function" != typeof o.randomBytes) throw new Error("Not supported");
        i.prototype._rand = function (t) {
            return o.randomBytes(t)
        }
    } catch (t) {
    }
}