var func51 = function (t, e, n) {
    (function (e) {
        var r = n(26);

        function i(t) {
            var n = new e(4);
            return n.writeUInt32BE(t, 0), n
        }

        t.exports = function (t, n) {
            for (var o, a = new e(""), s = 0; a.length < n;) o = i(s++), a = e.concat([a, r("sha1").update(t).update(o).digest()]);
            return a.slice(0, n)
        }
    }).call(this, n(2).Buffer)
}