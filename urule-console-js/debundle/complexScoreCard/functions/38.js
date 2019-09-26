var func38 = function (t, e, n) {
    var r = n(149), i = n(141), o = n(66);
    e.createCipher = e.Cipher = r.createCipher, e.createCipheriv = e.Cipheriv = r.createCipheriv, e.createDecipher = e.Decipher = i.createDecipher, e.createDecipheriv = e.Decipheriv = i.createDecipheriv, e.listCiphers = e.getCiphers = function () {
        return Object.keys(o)
    }
}