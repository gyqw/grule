var func122 = function (t, e, n) {
    "use strict";
    var r = n(9), i = n(22), o = n(59), a = r.rotl32, s = r.sum32, c = r.sum32_5, f = o.ft_1, u = i.BlockHash,
        l = [1518500249, 1859775393, 2400959708, 3395469782];

    function h() {
        if (!(this instanceof h)) return new h;
        u.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80)
    }

    r.inherits(h, u), t.exports = h, h.blockSize = 512, h.outSize = 160, h.hmacStrength = 80, h.padLength = 64, h.prototype._update = function (t, e) {
        for (var n = this.W, r = 0; r < 16; r++) n[r] = t[e + r];
        for (; r < n.length; r++) n[r] = a(n[r - 3] ^ n[r - 8] ^ n[r - 14] ^ n[r - 16], 1);
        var i = this.h[0], o = this.h[1], u = this.h[2], h = this.h[3], d = this.h[4];
        for (r = 0; r < n.length; r++) {
            var p = ~~(r / 20), b = c(a(i, 5), f(p, o, u, h), d, n[r], l[p]);
            d = h, h = u, u = a(o, 30), o = i, i = b
        }
        this.h[0] = s(this.h[0], i), this.h[1] = s(this.h[1], o), this.h[2] = s(this.h[2], u), this.h[3] = s(this.h[3], h), this.h[4] = s(this.h[4], d)
    }, h.prototype._digest = function (t) {
        return "hex" === t ? r.toHex32(this.h, "big") : r.split32(this.h, "big")
    }
}