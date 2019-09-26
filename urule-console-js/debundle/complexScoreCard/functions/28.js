var func28 = function (t, e, n) {
    (function (e) {
        var r = n(109), i = n(97), o = n(96), a = n(38), s = n(72);

        function c(t) {
            var n;
            "object" != typeof t || e.isBuffer(t) || (n = t.passphrase, t = t.key), "string" == typeof t && (t = new e(t));
            var c, f, u = o(t, n), l = u.tag, h = u.data;
            switch (l) {
                case"CERTIFICATE":
                    f = r.certificate.decode(h, "der").tbsCertificate.subjectPublicKeyInfo;
                case"PUBLIC KEY":
                    switch (f || (f = r.PublicKey.decode(h, "der")), c = f.algorithm.algorithm.join(".")) {
                        case"1.2.840.113549.1.1.1":
                            return r.RSAPublicKey.decode(f.subjectPublicKey.data, "der");
                        case"1.2.840.10045.2.1":
                            return f.subjectPrivateKey = f.subjectPublicKey, {type: "ec", data: f};
                        case"1.2.840.10040.4.1":
                            return f.algorithm.params.pub_key = r.DSAparam.decode(f.subjectPublicKey.data, "der"), {
                                type: "dsa",
                                data: f.algorithm.params
                            };
                        default:
                            throw new Error("unknown key id " + c)
                    }
                    throw new Error("unknown key type " + l);
                case"ENCRYPTED PRIVATE KEY":
                    h = function (t, n) {
                        var r = t.algorithm.decrypt.kde.kdeparams.salt,
                            o = parseInt(t.algorithm.decrypt.kde.kdeparams.iters.toString(), 10),
                            c = i[t.algorithm.decrypt.cipher.algo.join(".")], f = t.algorithm.decrypt.cipher.iv,
                            u = t.subjectPrivateKey, l = parseInt(c.split("-")[1], 10) / 8,
                            h = s.pbkdf2Sync(n, r, o, l), d = a.createDecipheriv(c, h, f), p = [];
                        return p.push(d.update(u)), p.push(d.final()), e.concat(p)
                    }(h = r.EncryptedPrivateKey.decode(h, "der"), n);
                case"PRIVATE KEY":
                    switch (c = (f = r.PrivateKey.decode(h, "der")).algorithm.algorithm.join(".")) {
                        case"1.2.840.113549.1.1.1":
                            return r.RSAPrivateKey.decode(f.subjectPrivateKey, "der");
                        case"1.2.840.10045.2.1":
                            return {
                                curve: f.algorithm.curve,
                                privateKey: r.ECPrivateKey.decode(f.subjectPrivateKey, "der").privateKey
                            };
                        case"1.2.840.10040.4.1":
                            return f.algorithm.params.priv_key = r.DSAparam.decode(f.subjectPrivateKey, "der"), {
                                type: "dsa",
                                params: f.algorithm.params
                            };
                        default:
                            throw new Error("unknown key id " + c)
                    }
                    throw new Error("unknown key type " + l);
                case"RSA PUBLIC KEY":
                    return r.RSAPublicKey.decode(h, "der");
                case"RSA PRIVATE KEY":
                    return r.RSAPrivateKey.decode(h, "der");
                case"DSA PRIVATE KEY":
                    return {type: "dsa", params: r.DSAPrivateKey.decode(h, "der")};
                case"EC PRIVATE KEY":
                    return {curve: (h = r.ECPrivateKey.decode(h, "der")).parameters.value, privateKey: h.privateKey};
                default:
                    throw new Error("unknown key type " + l)
            }
        }

        t.exports = c, c.signature = r.signature
    }).call(this, n(2).Buffer)
}