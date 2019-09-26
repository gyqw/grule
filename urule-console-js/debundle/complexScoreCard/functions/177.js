var func177 = function (t, e, n) {
    "use strict";
    e.randomBytes = e.rng = e.pseudoRandomBytes = e.prng = n(14), e.createHash = e.Hash = n(26), e.createHmac = e.Hmac = n(75);
    var r = n(158), i = Object.keys(r), o = ["sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160"].concat(i);
    e.getHashes = function () {
        return o
    };
    var a = n(72);
    e.pbkdf2 = a.pbkdf2, e.pbkdf2Sync = a.pbkdf2Sync;
    var s = n(156);
    e.Cipher = s.Cipher, e.createCipher = s.createCipher, e.Cipheriv = s.Cipheriv, e.createCipheriv = s.createCipheriv, e.Decipher = s.Decipher, e.createDecipher = s.createDecipher, e.Decipheriv = s.Decipheriv, e.createDecipheriv = s.createDecipheriv, e.getCiphers = s.getCiphers, e.listCiphers = s.listCiphers;
    var c = n(139);
    e.DiffieHellmanGroup = c.DiffieHellmanGroup, e.createDiffieHellmanGroup = c.createDiffieHellmanGroup, e.getDiffieHellman = c.getDiffieHellman, e.createDiffieHellman = c.createDiffieHellman, e.DiffieHellman = c.DiffieHellman;
    var f = n(133);
    e.createSign = f.createSign, e.Sign = f.Sign, e.createVerify = f.createVerify, e.Verify = f.Verify, e.createECDH = n(94);
    var u = n(93);
    e.publicEncrypt = u.publicEncrypt, e.privateEncrypt = u.privateEncrypt, e.publicDecrypt = u.publicDecrypt, e.privateDecrypt = u.privateDecrypt;
    var l = n(90);
    e.randomFill = l.randomFill, e.randomFillSync = l.randomFillSync, e.createCredentials = function () {
        throw new Error(["sorry, createCredentials is not implemented yet", "we accept pull requests", "https://github.com/crypto-browserify/crypto-browserify"].join("\n"))
    }, e.constants = {
        DH_CHECK_P_NOT_SAFE_PRIME: 2,
        DH_CHECK_P_NOT_PRIME: 1,
        DH_UNABLE_TO_CHECK_GENERATOR: 4,
        DH_NOT_SUITABLE_GENERATOR: 8,
        NPN_ENABLED: 1,
        ALPN_ENABLED: 1,
        RSA_PKCS1_PADDING: 1,
        RSA_SSLV23_PADDING: 2,
        RSA_NO_PADDING: 3,
        RSA_PKCS1_OAEP_PADDING: 4,
        RSA_X931_PADDING: 5,
        RSA_PKCS1_PSS_PADDING: 6,
        POINT_CONVERSION_COMPRESSED: 2,
        POINT_CONVERSION_UNCOMPRESSED: 4,
        POINT_CONVERSION_HYBRID: 6
    }
}