var func143 = function (t, e, n) {
    (function (t) {
        var r = n(23);

        function i(t) {
            return t._prev = t._cipher.encryptBlock(t._prev), t._prev
        }

        e.encrypt = function (e, n) {
            for (; e._cache.length < n.length;) e._cache = t.concat([e._cache, i(e)]);
            var o = e._cache.slice(0, n.length);
            return e._cache = e._cache.slice(n.length), r(n, o)
        }
    }).call(this, n(2).Buffer)
}