var func146 = function (t, e, n) {
    var r = n(1).Buffer, i = n(23);

    function o(t, e, n) {
        var o = e.length, a = i(e, t._cache);
        return t._cache = t._cache.slice(o), t._prev = r.concat([t._prev, n ? e : a]), a
    }

    e.encrypt = function (t, e, n) {
        for (var i, a = r.allocUnsafe(0); e.length;) {
            if (0 === t._cache.length && (t._cache = t._cipher.encryptBlock(t._prev), t._prev = r.allocUnsafe(0)), !(t._cache.length <= e.length)) {
                a = r.concat([a, o(t, e, n)]);
                break
            }
            i = t._cache.length, a = r.concat([a, o(t, e.slice(0, i), n)]), e = e.slice(i)
        }
        return a
    }
}