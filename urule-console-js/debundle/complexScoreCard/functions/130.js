var func130 = function (t, e, n) {
    "use strict";
    var r = e, i = n(3), o = n(6), a = n(60);
    r.assert = o, r.toArray = a.toArray, r.zero2 = a.zero2, r.toHex = a.toHex, r.encode = a.encode, r.getNAF = function (t, e) {
        for (var n = [], r = 1 << e + 1, i = t.clone(); i.cmpn(1) >= 0;) {
            var o;
            if (i.isOdd()) {
                var a = i.andln(r - 1);
                o = a > (r >> 1) - 1 ? (r >> 1) - a : a, i.isubn(o)
            } else o = 0;
            n.push(o);
            for (var s = 0 !== i.cmpn(0) && 0 === i.andln(r - 1) ? e + 1 : 1, c = 1; c < s; c++) n.push(0);
            i.iushrn(s)
        }
        return n
    }, r.getJSF = function (t, e) {
        var n = [[], []];
        t = t.clone(), e = e.clone();
        for (var r = 0, i = 0; t.cmpn(-r) > 0 || e.cmpn(-i) > 0;) {
            var o, a, s, c = t.andln(3) + r & 3, f = e.andln(3) + i & 3;
            3 === c && (c = -1), 3 === f && (f = -1), o = 0 == (1 & c) ? 0 : 3 != (s = t.andln(7) + r & 7) && 5 !== s || 2 !== f ? c : -c, n[0].push(o), a = 0 == (1 & f) ? 0 : 3 != (s = e.andln(7) + i & 7) && 5 !== s || 2 !== c ? f : -f, n[1].push(a), 2 * r === o + 1 && (r = 1 - r), 2 * i === a + 1 && (i = 1 - i), t.iushrn(1), e.iushrn(1)
        }
        return n
    }, r.cachedProperty = function (t, e, n) {
        var r = "_" + e;
        t.prototype[e] = function () {
            return void 0 !== this[r] ? this[r] : this[r] = n.call(this)
        }
    }, r.parseBytes = function (t) {
        return "string" == typeof t ? r.toArray(t, "hex") : t
    }, r.intFromLE = function (t) {
        return new i(t, "hex", "le")
    }
}