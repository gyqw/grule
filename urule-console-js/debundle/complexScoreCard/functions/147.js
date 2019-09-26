var func147 = function (t, e, n) {
    var r = n(23);
    e.encrypt = function (t, e) {
        var n = r(e, t._prev);
        return t._prev = t._cipher.encryptBlock(n), t._prev
    }, e.decrypt = function (t, e) {
        var n = t._prev;
        t._prev = e;
        var i = t._cipher.decryptBlock(e);
        return r(i, n)
    }
}