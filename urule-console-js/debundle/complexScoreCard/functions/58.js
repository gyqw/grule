var func58 = function (t, e, n) {
    "use strict";
    var r = n(9), i = n(22), o = n(59), a = n(6), s = r.sum32, c = r.sum32_4, f = r.sum32_5, u = o.ch32, l = o.maj32,
        h = o.s0_256, d = o.s1_256, p = o.g0_256, b = o.g1_256, g = i.BlockHash,
        y = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];

    function m() {
        if (!(this instanceof m)) return new m;
        g.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = y, this.W = new Array(64)
    }

    r.inherits(m, g), t.exports = m, m.blockSize = 512, m.outSize = 256, m.hmacStrength = 192, m.padLength = 64, m.prototype._update = function (t, e) {
        for (var n = this.W, r = 0; r < 16; r++) n[r] = t[e + r];
        for (; r < n.length; r++) n[r] = c(b(n[r - 2]), n[r - 7], p(n[r - 15]), n[r - 16]);
        var i = this.h[0], o = this.h[1], g = this.h[2], y = this.h[3], m = this.h[4], v = this.h[5], A = this.h[6],
            w = this.h[7];
        for (a(this.k.length === n.length), r = 0; r < n.length; r++) {
            var _ = f(w, d(m), u(m, v, A), this.k[r], n[r]), E = s(h(i), l(i, o, g));
            w = A, A = v, v = m, m = s(y, _), y = g, g = o, o = i, i = s(_, E)
        }
        this.h[0] = s(this.h[0], i), this.h[1] = s(this.h[1], o), this.h[2] = s(this.h[2], g), this.h[3] = s(this.h[3], y), this.h[4] = s(this.h[4], m), this.h[5] = s(this.h[5], v), this.h[6] = s(this.h[6], A), this.h[7] = s(this.h[7], w)
    }, m.prototype._digest = function (t) {
        return "hex" === t ? r.toHex32(this.h, "big") : r.split32(this.h, "big")
    }
}