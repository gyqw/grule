var func156 = function (t, e, n) {
    var r = n(155), i = n(38), o = n(37), a = n(140), s = n(30);

    function c(t, e, n) {
        if (t = t.toLowerCase(), o[t]) return i.createCipheriv(t, e, n);
        if (a[t]) return new r({key: e, iv: n, mode: t});
        throw new TypeError("invalid suite type")
    }

    function f(t, e, n) {
        if (t = t.toLowerCase(), o[t]) return i.createDecipheriv(t, e, n);
        if (a[t]) return new r({key: e, iv: n, mode: t, decrypt: !0});
        throw new TypeError("invalid suite type")
    }

    e.createCipher = e.Cipher = function (t, e) {
        var n, r;
        if (t = t.toLowerCase(), o[t]) n = o[t].key, r = o[t].iv; else {
            if (!a[t]) throw new TypeError("invalid suite type");
            n = 8 * a[t].key, r = a[t].iv
        }
        var i = s(e, !1, n, r);
        return c(t, i.key, i.iv)
    }, e.createCipheriv = e.Cipheriv = c, e.createDecipher = e.Decipher = function (t, e) {
        var n, r;
        if (t = t.toLowerCase(), o[t]) n = o[t].key, r = o[t].iv; else {
            if (!a[t]) throw new TypeError("invalid suite type");
            n = 8 * a[t].key, r = a[t].iv
        }
        var i = s(e, !1, n, r);
        return f(t, i.key, i.iv)
    }, e.createDecipheriv = e.Decipheriv = f, e.listCiphers = e.getCiphers = function () {
        return Object.keys(a).concat(i.getCiphers())
    }
}