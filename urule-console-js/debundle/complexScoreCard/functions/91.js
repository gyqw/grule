var func91 = function (t, e, n) {
    (function (e) {
        var r = n(28), i = n(51), o = n(50), a = n(3), s = n(36), c = n(26), f = n(49);
        t.exports = function (t, n, u) {
            var l;
            l = t.padding ? t.padding : u ? 1 : 4;
            var h, d = r(t), p = d.modulus.byteLength();
            if (n.length > p || new a(n).cmp(d.modulus) >= 0) throw new Error("decryption error");
            h = u ? f(new a(n), d) : s(n, d);
            var b = new e(p - h.length);
            if (b.fill(0), h = e.concat([b, h], p), 4 === l) return function (t, n) {
                t.modulus;
                var r = t.modulus.byteLength(), a = (n.length, c("sha1").update(new e("")).digest()), s = a.length;
                if (0 !== n[0]) throw new Error("decryption error");
                var f = n.slice(1, s + 1), u = n.slice(s + 1), l = o(f, i(u, s)), h = o(u, i(l, r - s - 1));
                if (function (t, n) {
                    t = new e(t), n = new e(n);
                    var r = 0, i = t.length;
                    t.length !== n.length && (r++, i = Math.min(t.length, n.length));
                    for (var o = -1; ++o < i;) r += t[o] ^ n[o];
                    return r
                }(a, h.slice(0, s))) throw new Error("decryption error");
                for (var d = s; 0 === h[d];) d++;
                if (1 !== h[d++]) throw new Error("decryption error");
                return h.slice(d)
            }(d, h);
            if (1 === l) return function (t, e, n) {
                for (var r = e.slice(0, 2), i = 2, o = 0; 0 !== e[i++];) if (i >= e.length) {
                    o++;
                    break
                }
                var a = e.slice(2, i - 1);
                if (e.slice(i - 1, i), ("0002" !== r.toString("hex") && !n || "0001" !== r.toString("hex") && n) && o++, a.length < 8 && o++, o) throw new Error("decryption error");
                return e.slice(i)
            }(0, h, u);
            if (3 === l) return h;
            throw new Error("unknown padding")
        }
    }).call(this, n(2).Buffer)
}