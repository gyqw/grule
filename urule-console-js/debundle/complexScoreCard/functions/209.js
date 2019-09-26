var func209 = function (t, e, n) {
    "use strict";
    var r = Object.getOwnPropertySymbols, i = Object.prototype.hasOwnProperty,
        o = Object.prototype.propertyIsEnumerable;
    t.exports = function () {
        try {
            if (!Object.assign) return !1;
            var t = new String("abc");
            if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
            for (var e = {}, n = 0; n < 10; n++) e["_" + String.fromCharCode(n)] = n;
            if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {
                return e[t]
            }).join("")) return !1;
            var r = {};
            return "abcdefghijklmnopqrst".split("").forEach(function (t) {
                r[t] = t
            }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        } catch (t) {
            return !1
        }
    }() ? Object.assign : function (t, e) {
        for (var n, a, s = function (t) {
            if (null === t || void 0 === t) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(t)
        }(t), c = 1; c < arguments.length; c++) {
            for (var f in n = Object(arguments[c])) i.call(n, f) && (s[f] = n[f]);
            if (r) {
                a = r(n);
                for (var u = 0; u < a.length; u++) o.call(n, a[u]) && (s[a[u]] = n[a[u]])
            }
        }
        return s
    }
}