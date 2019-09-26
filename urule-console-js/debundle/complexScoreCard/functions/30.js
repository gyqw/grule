var func30 = function (t, e, n) {
    var r = n(1).Buffer, i = n(45);
    t.exports = function (t, e, n, o) {
        if (r.isBuffer(t) || (t = r.from(t, "binary")), e && (r.isBuffer(e) || (e = r.from(e, "binary")), 8 !== e.length)) throw new RangeError("salt should be Buffer with 8 byte length");
        for (var a = n / 8, s = r.alloc(a), c = r.alloc(o || 0), f = r.alloc(0); a > 0 || o > 0;) {
            var u = new i;
            u.update(f), u.update(t), e && u.update(e), f = u.digest();
            var l = 0;
            if (a > 0) {
                var h = s.length - a;
                l = Math.min(a, f.length), f.copy(s, h, 0, l), a -= l
            }
            if (l < f.length && o > 0) {
                var d = c.length - o, p = Math.min(o, f.length - l);
                f.copy(c, d, l, l + p), o -= p
            }
        }
        return f.fill(0), {key: s, iv: c}
    }
}