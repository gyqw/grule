var func149 = function (t, e, n) {
    var r = n(37), i = n(65), o = n(1).Buffer, a = n(64), s = n(10), c = n(31), f = n(30);

    function u(t, e, n) {
        s.call(this), this._cache = new h, this._cipher = new c.AES(e), this._prev = o.from(n), this._mode = t, this._autopadding = !0
    }

    n(0)(u, s), u.prototype._update = function (t) {
        var e, n;
        this._cache.add(t);
        for (var r = []; e = this._cache.get();) n = this._mode.encrypt(this, e), r.push(n);
        return o.concat(r)
    };
    var l = o.alloc(16, 16);

    function h() {
        this.cache = o.allocUnsafe(0)
    }

    function d(t, e, n) {
        var s = r[t.toLowerCase()];
        if (!s) throw new TypeError("invalid suite type");
        if ("string" == typeof e && (e = o.from(e)), e.length !== s.key / 8) throw new TypeError("invalid key length " + e.length);
        if ("string" == typeof n && (n = o.from(n)), "GCM" !== s.mode && n.length !== s.iv) throw new TypeError("invalid iv length " + n.length);
        return "stream" === s.type ? new a(s.module, e, n) : "auth" === s.type ? new i(s.module, e, n) : new u(s.module, e, n)
    }

    u.prototype._final = function () {
        var t = this._cache.flush();
        if (this._autopadding) return t = this._mode.encrypt(this, t), this._cipher.scrub(), t;
        if (!t.equals(l)) throw this._cipher.scrub(), new Error("data not multiple of block length")
    }, u.prototype.setAutoPadding = function (t) {
        return this._autopadding = !!t, this
    }, h.prototype.add = function (t) {
        this.cache = o.concat([this.cache, t])
    }, h.prototype.get = function () {
        if (this.cache.length > 15) {
            var t = this.cache.slice(0, 16);
            return this.cache = this.cache.slice(16), t
        }
        return null
    }, h.prototype.flush = function () {
        for (var t = 16 - this.cache.length, e = o.allocUnsafe(t), n = -1; ++n < t;) e.writeUInt8(t, n);
        return o.concat([this.cache, e])
    }, e.createCipheriv = d, e.createCipher = function (t, e) {
        var n = r[t.toLowerCase()];
        if (!n) throw new TypeError("invalid suite type");
        var i = f(e, !1, n.key, n.iv);
        return d(t, i.key, i.iv)
    }
}