var func134 = function (t, e, n) {
    (function (e) {
        var r = n(3), i = new (n(62)), o = new r(24), a = new r(11), s = new r(10), c = new r(3), f = new r(7),
            u = n(63), l = n(14);

        function h(t, n) {
            return n = n || "utf8", e.isBuffer(t) || (t = new e(t, n)), this._pub = new r(t), this
        }

        function d(t, n) {
            return n = n || "utf8", e.isBuffer(t) || (t = new e(t, n)), this._priv = new r(t), this
        }

        t.exports = b;
        var p = {};

        function b(t, e, n) {
            this.setGenerator(e), this.__prime = new r(t), this._prime = r.mont(this.__prime), this._primeLen = t.length, this._pub = void 0, this._priv = void 0, this._primeCode = void 0, n ? (this.setPublicKey = h, this.setPrivateKey = d) : this._primeCode = 8
        }

        function g(t, n) {
            var r = new e(t.toArray());
            return n ? r.toString(n) : r
        }

        Object.defineProperty(b.prototype, "verifyError", {
            enumerable: !0, get: function () {
                return "number" != typeof this._primeCode && (this._primeCode = function (t, e) {
                    var n = e.toString("hex"), r = [n, t.toString(16)].join("_");
                    if (r in p) return p[r];
                    var l, h = 0;
                    if (t.isEven() || !u.simpleSieve || !u.fermatTest(t) || !i.test(t)) return h += 1, h += "02" === n || "05" === n ? 8 : 4, p[r] = h, h;
                    switch (i.test(t.shrn(1)) || (h += 2), n) {
                        case"02":
                            t.mod(o).cmp(a) && (h += 8);
                            break;
                        case"05":
                            (l = t.mod(s)).cmp(c) && l.cmp(f) && (h += 8);
                            break;
                        default:
                            h += 4
                    }
                    return p[r] = h, h
                }(this.__prime, this.__gen)), this._primeCode
            }
        }), b.prototype.generateKeys = function () {
            return this._priv || (this._priv = new r(l(this._primeLen))), this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed(), this.getPublicKey()
        }, b.prototype.computeSecret = function (t) {
            var n = (t = (t = new r(t)).toRed(this._prime)).redPow(this._priv).fromRed(), i = new e(n.toArray()),
                o = this.getPrime();
            if (i.length < o.length) {
                var a = new e(o.length - i.length);
                a.fill(0), i = e.concat([a, i])
            }
            return i
        }, b.prototype.getPublicKey = function (t) {
            return g(this._pub, t)
        }, b.prototype.getPrivateKey = function (t) {
            return g(this._priv, t)
        }, b.prototype.getPrime = function (t) {
            return g(this.__prime, t)
        }, b.prototype.getGenerator = function (t) {
            return g(this._gen, t)
        }, b.prototype.setGenerator = function (t, n) {
            return n = n || "utf8", e.isBuffer(t) || (t = new e(t, n)), this.__gen = t, this._gen = new r(t), this
        }
    }).call(this, n(2).Buffer)
}