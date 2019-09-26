var func95 = function (t, e, n) {
    (function (e) {
        var r = n(3), i = n(4).ec, o = n(28), a = n(52);

        function s(t, e) {
            if (t.cmpn(0) <= 0) throw new Error("invalid sig");
            if (t.cmp(e) >= e) throw new Error("invalid sig")
        }

        t.exports = function (t, n, c, f, u) {
            var l = o(c);
            if ("ec" === l.type) {
                if ("ecdsa" !== f && "ecdsa/rsa" !== f) throw new Error("wrong public key type");
                return function (t, e, n) {
                    var r = a[n.data.algorithm.curve.join(".")];
                    if (!r) throw new Error("unknown curve " + n.data.algorithm.curve.join("."));
                    var o = new i(r), s = n.data.subjectPrivateKey.data;
                    return o.verify(e, t, s)
                }(t, n, l)
            }
            if ("dsa" === l.type) {
                if ("dsa" !== f) throw new Error("wrong public key type");
                return function (t, e, n) {
                    var i = n.data.p, a = n.data.q, c = n.data.g, f = n.data.pub_key, u = o.signature.decode(t, "der"),
                        l = u.s, h = u.r;
                    s(l, a), s(h, a);
                    var d = r.mont(i), p = l.invm(a);
                    return 0 === c.toRed(d).redPow(new r(e).mul(p).mod(a)).fromRed().mul(f.toRed(d).redPow(h.mul(p).mod(a)).fromRed()).mod(i).mod(a).cmp(h)
                }(t, n, l)
            }
            if ("rsa" !== f && "ecdsa/rsa" !== f) throw new Error("wrong public key type");
            n = e.concat([u, n]);
            for (var h = l.modulus.byteLength(), d = [1], p = 0; n.length + d.length + 2 < h;) d.push(255), p++;
            d.push(0);
            for (var b = -1; ++b < n.length;) d.push(n[b]);
            d = new e(d);
            var g = r.mont(l.modulus);
            t = (t = new r(t).toRed(g)).redPow(new r(l.publicExponent)), t = new e(t.fromRed().toArray());
            var y = p < 8 ? 1 : 0;
            for (h = Math.min(t.length, d.length), t.length !== d.length && (y = 1), b = -1; ++b < h;) y |= t[b] ^ d[b];
            return 0 === y
        }
    }).call(this, n(2).Buffer)
}