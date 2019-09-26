var func115 = function (t, e, n) {
    "use strict";
    var r = n(35), i = n(60), o = n(6);

    function a(t) {
        if (!(this instanceof a)) return new a(t);
        this.hash = t.hash, this.predResist = !!t.predResist, this.outLen = this.hash.outSize, this.minEntropy = t.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
        var e = i.toArray(t.entropy, t.entropyEnc || "hex"), n = i.toArray(t.nonce, t.nonceEnc || "hex"),
            r = i.toArray(t.pers, t.persEnc || "hex");
        o(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(e, n, r)
    }

    t.exports = a, a.prototype._init = function (t, e, n) {
        var r = t.concat(e).concat(n);
        this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
        for (var i = 0; i < this.V.length; i++) this.K[i] = 0, this.V[i] = 1;
        this._update(r), this._reseed = 1, this.reseedInterval = 281474976710656
    }, a.prototype._hmac = function () {
        return new r.hmac(this.hash, this.K)
    }, a.prototype._update = function (t) {
        var e = this._hmac().update(this.V).update([0]);
        t && (e = e.update(t)), this.K = e.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac().update(this.V).digest())
    }, a.prototype.reseed = function (t, e, n, r) {
        "string" != typeof e && (r = n, n = e, e = null), t = i.toArray(t, e), n = i.toArray(n, r), o(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(t.concat(n || [])), this._reseed = 1
    }, a.prototype.generate = function (t, e, n, r) {
        if (this._reseed > this.reseedInterval) throw new Error("Reseed is required");
        "string" != typeof e && (r = n, n = e, e = null), n && (n = i.toArray(n, r || "hex"), this._update(n));
        for (var o = []; o.length < t;) this.V = this._hmac().update(this.V).digest(), o = o.concat(this.V);
        var a = o.slice(0, t);
        return this._update(n), this._reseed++, i.encode(a, e)
    }
}