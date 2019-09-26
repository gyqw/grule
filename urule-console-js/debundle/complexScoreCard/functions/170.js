var func170 = function (t, e, n) {
    (function (e) {
        function n(t) {
            try {
                if (!e.localStorage) return !1
            } catch (t) {
                return !1
            }
            var n = e.localStorage[t];
            return null != n && "true" === String(n).toLowerCase()
        }

        t.exports = function (t, e) {
            if (n("noDeprecation")) return t;
            var r = !1;
            return function () {
                if (!r) {
                    if (n("throwDeprecation")) throw new Error(e);
                    n("traceDeprecation"), r = !0
                }
                return t.apply(this, arguments)
            }
        }
    }).call(this, n(8))
}