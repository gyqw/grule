var func144 = function (t, e, n) {
    var r = n(1).Buffer;

    function i(t, e, n) {
        for (var r, i, a, s = -1, c = 0; ++s < 8;) r = t._cipher.encryptBlock(t._prev), i = e & 1 << 7 - s ? 128 : 0, c += (128 & (a = r[0] ^ i)) >> s % 8, t._prev = o(t._prev, n ? i : a);
        return c
    }

    function o(t, e) {
        var n = t.length, i = -1, o = r.allocUnsafe(t.length);
        for (t = r.concat([t, r.from([e])]); ++i < n;) o[i] = t[i] << 1 | t[i + 1] >> 7;
        return o
    }

    e.encrypt = function (t, e, n) {
        for (var o = e.length, a = r.allocUnsafe(o), s = -1; ++s < o;) a[s] = i(t, e[s], n);
        return a
    }
}