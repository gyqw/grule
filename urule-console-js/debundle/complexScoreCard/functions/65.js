var func65 = function (t, e, n) {
    var r = n(31), i = n(1).Buffer, o = n(10), a = n(0), s = n(142), c = n(23), f = n(67);

    function u(t, e, n, a) {
        o.call(this);
        var c = i.alloc(4, 0);
        this._cipher = new r.AES(e);
        var u = this._cipher.encryptBlock(c);
        this._ghash = new s(u), n = function (t, e, n) {
            if (12 === e.length) return t._finID = i.concat([e, i.from([0, 0, 0, 1])]), i.concat([e, i.from([0, 0, 0, 2])]);
            var r = new s(n), o = e.length, a = o % 16;
            r.update(e), a && (a = 16 - a, r.update(i.alloc(a, 0))), r.update(i.alloc(8, 0));
            var c = 8 * o, u = i.alloc(8);
            u.writeUIntBE(c, 0, 8), r.update(u), t._finID = r.state;
            var l = i.from(t._finID);
            return f(l), l
        }(this, n, u), this._prev = i.from(n), this._cache = i.allocUnsafe(0), this._secCache = i.allocUnsafe(0), this._decrypt = a, this._alen = 0, this._len = 0, this._mode = t, this._authTag = null, this._called = !1
    }

    a(u, o), u.prototype._update = function (t) {
        if (!this._called && this._alen) {
            var e = 16 - this._alen % 16;
            e < 16 && (e = i.alloc(e, 0), this._ghash.update(e))
        }
        this._called = !0;
        var n = this._mode.encrypt(this, t);
        return this._decrypt ? this._ghash.update(t) : this._ghash.update(n), this._len += t.length, n
    }, u.prototype._final = function () {
        if (this._decrypt && !this._authTag) throw new Error("Unsupported state or unable to authenticate data");
        var t = c(this._ghash.final(8 * this._alen, 8 * this._len), this._cipher.encryptBlock(this._finID));
        if (this._decrypt && function (t, e) {
            var n = 0;
            t.length !== e.length && n++;
            for (var r = Math.min(t.length, e.length), i = 0; i < r; ++i) n += t[i] ^ e[i];
            return n
        }(t, this._authTag)) throw new Error("Unsupported state or unable to authenticate data");
        this._authTag = t, this._cipher.scrub()
    }, u.prototype.getAuthTag = function () {
        if (this._decrypt || !i.isBuffer(this._authTag)) throw new Error("Attempting to get auth tag in unsupported state");
        return this._authTag
    }, u.prototype.setAuthTag = function (t) {
        if (!this._decrypt) throw new Error("Attempting to set auth tag in unsupported state");
        this._authTag = t
    }, u.prototype.setAAD = function (t) {
        if (this._called) throw new Error("Attempting to set AAD in unsupported state");
        this._ghash.update(t), this._alen += t.length
    }, t.exports = u
}