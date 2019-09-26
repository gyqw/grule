var func145 = function (t, e, n) {
    var r = n(1).Buffer;

    function i(t, e, n) {
        var i = t._cipher.encryptBlock(t._prev)[0] ^ e;
        return t._prev = r.concat([t._prev.slice(1), r.from([n ? e : i])]), i
    }

    e.encrypt = function (t, e, n) {
        for (var o = e.length, a = r.allocUnsafe(o), s = -1; ++s < o;) a[s] = i(t, e[s], n);
        return a
    }
}