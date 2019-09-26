var func133 = function (t, e, n) {
    (function (e) {
        var r = n(26), i = n(33), o = n(0), a = n(132), s = n(95), c = n(73);

        function f(t) {
            i.Writable.call(this);
            var e = c[t];
            if (!e) throw new Error("Unknown message digest");
            this._hashType = e.hash, this._hash = r(e.hash), this._tag = e.id, this._signType = e.sign
        }

        function u(t) {
            i.Writable.call(this);
            var e = c[t];
            if (!e) throw new Error("Unknown message digest");
            this._hash = r(e.hash), this._tag = e.id, this._signType = e.sign
        }

        function l(t) {
            return new f(t)
        }

        function h(t) {
            return new u(t)
        }

        Object.keys(c).forEach(function (t) {
            c[t].id = new e(c[t].id, "hex"), c[t.toLowerCase()] = c[t]
        }), o(f, i.Writable), f.prototype._write = function (t, e, n) {
            this._hash.update(t), n()
        }, f.prototype.update = function (t, n) {
            return "string" == typeof t && (t = new e(t, n)), this._hash.update(t), this
        }, f.prototype.sign = function (t, e) {
            this.end();
            var n = this._hash.digest(), r = a(n, t, this._hashType, this._signType, this._tag);
            return e ? r.toString(e) : r
        }, o(u, i.Writable), u.prototype._write = function (t, e, n) {
            this._hash.update(t), n()
        }, u.prototype.update = function (t, n) {
            return "string" == typeof t && (t = new e(t, n)), this._hash.update(t), this
        }, u.prototype.verify = function (t, n, r) {
            "string" == typeof n && (n = new e(n, r)), this.end();
            var i = this._hash.digest();
            return s(n, i, t, this._signType, this._tag)
        }, t.exports = {Sign: l, Verify: h, createSign: l, createVerify: h}
    }).call(this, n(2).Buffer)
}