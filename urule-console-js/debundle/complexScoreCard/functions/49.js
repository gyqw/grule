var func49 = function (t, e, n) {
    (function (e) {
        var r = n(3);
        t.exports = function (t, n) {
            return new e(t.toRed(r.mont(n.modulus)).redPow(new r(n.publicExponent)).fromRed().toArray())
        }
    }).call(this, n(2).Buffer)
}