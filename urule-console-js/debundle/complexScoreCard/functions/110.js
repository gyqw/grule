var func110 = function (t, e, n) {
    "use strict";
    var r = n(3), i = n(4).utils, o = i.assert, a = i.cachedProperty, s = i.parseBytes;

    function c(t, e) {
        this.eddsa = t, "object" != typeof e && (e = s(e)), Array.isArray(e) && (e = {
            R: e.slice(0, t.encodingLength),
            S: e.slice(t.encodingLength)
        }), o(e.R && e.S, "Signature without R or S"), t.isPoint(e.R) && (this._R = e.R), e.S instanceof r && (this._S = e.S), this._Rencoded = Array.isArray(e.R) ? e.R : e.Rencoded, this._Sencoded = Array.isArray(e.S) ? e.S : e.Sencoded
    }

    a(c, "S", function () {
        return this.eddsa.decodeInt(this.Sencoded())
    }), a(c, "R", function () {
        return this.eddsa.decodePoint(this.Rencoded())
    }), a(c, "Rencoded", function () {
        return this.eddsa.encodePoint(this.R())
    }), a(c, "Sencoded", function () {
        return this.eddsa.encodeInt(this.S())
    }), c.prototype.toBytes = function () {
        return this.Rencoded().concat(this.Sencoded())
    }, c.prototype.toHex = function () {
        return i.encode(this.toBytes(), "hex").toUpperCase()
    }, t.exports = c
}