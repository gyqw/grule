var func14 = function (t, e, n) {
    "use strict";
    (function (e, r) {
        var i = n(1).Buffer, o = e.crypto || e.msCrypto;
        o && o.getRandomValues ? t.exports = function (t, n) {
            if (t > 65536) throw new Error("requested too many random bytes");
            var a = new e.Uint8Array(t);
            t > 0 && o.getRandomValues(a);
            var s = i.from(a.buffer);
            return "function" == typeof n ? r.nextTick(function () {
                n(null, s)
            }) : s
        } : t.exports = function () {
            throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")
        }
    }).call(this, n(8), n(11))
}