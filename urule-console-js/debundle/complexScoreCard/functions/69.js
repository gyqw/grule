var func69 = function (t, e, n) {
    var r = n(74), i = n(41), o = n(40), a = n(71), s = n(70), c = n(1).Buffer, f = c.alloc(128),
        u = {md5: 16, sha1: 20, sha224: 28, sha256: 32, sha384: 48, sha512: 64, rmd160: 20, ripemd160: 20};

    function l(t, e, n) {
        var a = function (t) {
            return "rmd160" === t || "ripemd160" === t ? i : "md5" === t ? r : function (e) {
                return o(t).update(e).digest()
            }
        }(t), s = "sha512" === t || "sha384" === t ? 128 : 64;
        e.length > s ? e = a(e) : e.length < s && (e = c.concat([e, f], s));
        for (var l = c.allocUnsafe(s + u[t]), h = c.allocUnsafe(s + u[t]), d = 0; d < s; d++) l[d] = 54 ^ e[d], h[d] = 92 ^ e[d];
        var p = c.allocUnsafe(s + n + 4);
        l.copy(p, 0, 0, s), this.ipad1 = p, this.ipad2 = l, this.opad = h, this.alg = t, this.blocksize = s, this.hash = a, this.size = u[t]
    }

    l.prototype.run = function (t, e) {
        return t.copy(e, this.blocksize), this.hash(e).copy(this.opad, this.blocksize), this.hash(this.opad)
    }, t.exports = function (t, e, n, r, i) {
        c.isBuffer(t) || (t = c.from(t, s)), c.isBuffer(e) || (e = c.from(e, s)), a(n, r);
        var o = new l(i = i || "sha1", t, e.length), f = c.allocUnsafe(r), h = c.allocUnsafe(e.length + 4);
        e.copy(h, 0, 0, e.length);
        for (var d = 0, p = u[i], b = Math.ceil(r / p), g = 1; g <= b; g++) {
            h.writeUInt32BE(g, e.length);
            for (var y = o.run(h, o.ipad1), m = y, v = 1; v < n; v++) {
                m = o.run(m, o.ipad2);
                for (var A = 0; A < p; A++) y[A] ^= m[A]
            }
            y.copy(f, d), d += p
        }
        return f
    }
}