var func68 = function (t, e, n) {
    var r = n(23), i = n(1).Buffer, o = n(67);

    function a(t) {
        var e = t._cipher.encryptBlockRaw(t._prev);
        return o(t._prev), e
    }

    e.encrypt = function (t, e) {
        var n = Math.ceil(e.length / 16), o = t._cache.length;
        t._cache = i.concat([t._cache, i.allocUnsafe(16 * n)]);
        for (var s = 0; s < n; s++) {
            var c = a(t), f = o + 16 * s;
            t._cache.writeUInt32BE(c[0], f + 0), t._cache.writeUInt32BE(c[1], f + 4), t._cache.writeUInt32BE(c[2], f + 8), t._cache.writeUInt32BE(c[3], f + 12)
        }
        var u = t._cache.slice(0, e.length);
        return t._cache = t._cache.slice(e.length), r(e, u)
    }
}