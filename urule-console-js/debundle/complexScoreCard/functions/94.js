var func94 = function (t, e, n) {
    (function (e) {
        var r = n(4), i = n(3);
        t.exports = function (t) {
            return new a(t)
        };
        var o = {
            secp256k1: {name: "secp256k1", byteLength: 32},
            secp224r1: {name: "p224", byteLength: 28},
            prime256v1: {name: "p256", byteLength: 32},
            prime192v1: {name: "p192", byteLength: 24},
            ed25519: {name: "ed25519", byteLength: 32},
            secp384r1: {name: "p384", byteLength: 48},
            secp521r1: {name: "p521", byteLength: 66}
        };

        function a(t) {
            this.curveType = o[t], this.curveType || (this.curveType = {name: t}), this.curve = new r.ec(this.curveType.name), this.keys = void 0
        }

        function s(t, n, r) {
            Array.isArray(t) || (t = t.toArray());
            var i = new e(t);
            if (r && i.length < r) {
                var o = new e(r - i.length);
                o.fill(0), i = e.concat([o, i])
            }
            return n ? i.toString(n) : i
        }

        o.p224 = o.secp224r1, o.p256 = o.secp256r1 = o.prime256v1, o.p192 = o.secp192r1 = o.prime192v1, o.p384 = o.secp384r1, o.p521 = o.secp521r1, a.prototype.generateKeys = function (t, e) {
            return this.keys = this.curve.genKeyPair(), this.getPublicKey(t, e)
        }, a.prototype.computeSecret = function (t, n, r) {
            return n = n || "utf8", e.isBuffer(t) || (t = new e(t, n)), s(this.curve.keyFromPublic(t).getPublic().mul(this.keys.getPrivate()).getX(), r, this.curveType.byteLength)
        }, a.prototype.getPublicKey = function (t, e) {
            var n = this.keys.getPublic("compressed" === e, !0);
            return "hybrid" === e && (n[n.length - 1] % 2 ? n[0] = 7 : n[0] = 6), s(n, t)
        }, a.prototype.getPrivateKey = function (t) {
            return s(this.keys.getPrivate(), t)
        }, a.prototype.setPublicKey = function (t, n) {
            return n = n || "utf8", e.isBuffer(t) || (t = new e(t, n)), this.keys._importPublic(t), this
        }, a.prototype.setPrivateKey = function (t, n) {
            n = n || "utf8", e.isBuffer(t) || (t = new e(t, n));
            var r = new i(t);
            return r = r.toString(16), this.keys._importPrivate(r), this
        }
    }).call(this, n(2).Buffer)
}