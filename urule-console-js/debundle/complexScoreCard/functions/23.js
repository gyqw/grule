var func23 = function (t, e, n) {
    (function (e) {
        t.exports = function (t, n) {
            for (var r = Math.min(t.length, n.length), i = new e(r), o = 0; o < r; ++o) i[o] = t[o] ^ n[o];
            return i
        }
    }).call(this, n(2).Buffer)
}