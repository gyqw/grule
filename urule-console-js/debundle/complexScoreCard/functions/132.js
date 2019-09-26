var func132 = function (t, e, n) {
    (function (e) {
        var r = n(75), i = n(36), o = n(4).ec, a = n(3), s = n(28), c = n(52);

        function f(t, n, i, o) {
            if ((t = new e(t.toArray())).length < n.byteLength()) {
                var a = new e(n.byteLength() - t.length);
                a.fill(0), t = e.concat([a, t])
            }
            var s = i.length, c = function (t, n) {
                t = (t = u(t, n)).mod(n);
                var r = new e(t.toArray());
                if (r.length < n.byteLength()) {
                    var i = new e(n.byteLength() - r.length);
                    i.fill(0), r = e.concat([i, r])
                }
                return r
            }(i, n), f = new e(s);
            f.fill(1);
            var l = new e(s);
            return l.fill(0), l = r(o, l).update(f).update(new e([0])).update(t).update(c).digest(), f = r(o, l).update(f).digest(), {
                k: l = r(o, l).update(f).update(new e([1])).update(t).update(c).digest(),
                v: f = r(o, l).update(f).digest()
            }
        }

        function u(t, e) {
            var n = new a(t), r = (t.length << 3) - e.bitLength();
            return r > 0 && n.ishrn(r), n
        }

        function l(t, n, i) {
            var o, a;
            do {
                for (o = new e(0); 8 * o.length < t.bitLength();) n.v = r(i, n.k).update(n.v).digest(), o = e.concat([o, n.v]);
                a = u(o, t), n.k = r(i, n.k).update(n.v).update(new e([0])).digest(), n.v = r(i, n.k).update(n.v).digest()
            } while (-1 !== a.cmp(t));
            return a
        }

        function h(t, e, n, r) {
            return t.toRed(a.mont(n)).redPow(e).fromRed().mod(r)
        }

        t.exports = function (t, n, r, d, p) {
            var b = s(n);
            if (b.curve) {
                if ("ecdsa" !== d && "ecdsa/rsa" !== d) throw new Error("wrong private key type");
                return function (t, n) {
                    var r = c[n.curve.join(".")];
                    if (!r) throw new Error("unknown curve " + n.curve.join("."));
                    var i = new o(r).keyFromPrivate(n.privateKey).sign(t);
                    return new e(i.toDER())
                }(t, b)
            }
            if ("dsa" === b.type) {
                if ("dsa" !== d) throw new Error("wrong private key type");
                return function (t, n, r) {
                    for (var i, o = n.params.priv_key, s = n.params.p, c = n.params.q, d = n.params.g, p = new a(0), b = u(t, c).mod(c), g = !1, y = f(o, c, t, r); !1 === g;) p = h(d, i = l(c, y, r), s, c), 0 === (g = i.invm(c).imul(b.add(o.mul(p))).mod(c)).cmpn(0) && (g = !1, p = new a(0));
                    return function (t, n) {
                        t = t.toArray(), n = n.toArray(), 128 & t[0] && (t = [0].concat(t)), 128 & n[0] && (n = [0].concat(n));
                        var r = [48, t.length + n.length + 4, 2, t.length];
                        return r = r.concat(t, [2, n.length], n), new e(r)
                    }(p, g)
                }(t, b, r)
            }
            if ("rsa" !== d && "ecdsa/rsa" !== d) throw new Error("wrong private key type");
            t = e.concat([p, t]);
            for (var g = b.modulus.byteLength(), y = [0, 1]; t.length + y.length + 1 < g;) y.push(255);
            y.push(0);
            for (var m = -1; ++m < t.length;) y.push(t[m]);
            return i(y, b)
        }, t.exports.getKey = f, t.exports.makeKey = l
    }).call(this, n(2).Buffer)
}