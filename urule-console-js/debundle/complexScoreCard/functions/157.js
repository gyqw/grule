var func157 = function (t, e, n) {
    (function (e, r) {
        var i, o = n(71), a = n(70), s = n(69), c = n(1).Buffer, f = e.crypto && e.crypto.subtle, u = {
            sha: "SHA-1",
            "sha-1": "SHA-1",
            sha1: "SHA-1",
            sha256: "SHA-256",
            "sha-256": "SHA-256",
            sha384: "SHA-384",
            "sha-384": "SHA-384",
            "sha-512": "SHA-512",
            sha512: "SHA-512"
        }, l = [];

        function h(t, e, n, r, i) {
            return f.importKey("raw", t, {name: "PBKDF2"}, !1, ["deriveBits"]).then(function (t) {
                return f.deriveBits({name: "PBKDF2", salt: e, iterations: n, hash: {name: i}}, t, r << 3)
            }).then(function (t) {
                return c.from(t)
            })
        }

        t.exports = function (t, n, d, p, b, g) {
            if (c.isBuffer(t) || (t = c.from(t, a)), c.isBuffer(n) || (n = c.from(n, a)), o(d, p), "function" == typeof b && (g = b, b = void 0), "function" != typeof g) throw new Error("No callback provided to pbkdf2");
            var y = u[(b = b || "sha1").toLowerCase()];
            if (!y || "function" != typeof e.Promise) return r.nextTick(function () {
                var e;
                try {
                    e = s(t, n, d, p, b)
                } catch (t) {
                    return g(t)
                }
                g(null, e)
            });
            !function (t, e) {
                t.then(function (t) {
                    r.nextTick(function () {
                        e(null, t)
                    })
                }, function (t) {
                    r.nextTick(function () {
                        e(t)
                    })
                })
            }(function (t) {
                if (e.process && !e.process.browser) return Promise.resolve(!1);
                if (!f || !f.importKey || !f.deriveBits) return Promise.resolve(!1);
                if (void 0 !== l[t]) return l[t];
                var n = h(i = i || c.alloc(8), i, 10, 128, t).then(function () {
                    return !0
                }).catch(function () {
                    return !1
                });
                return l[t] = n, n
            }(y).then(function (e) {
                return e ? h(t, n, d, p, y) : s(t, n, d, p, b)
            }), g)
        }
    }).call(this, n(8), n(11))
}