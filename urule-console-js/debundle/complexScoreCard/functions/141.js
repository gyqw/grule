var func141 = function (t, e, n) {
    var r = n(65), i = n(1).Buffer, o = n(37), a = n(64), s = n(10), c = n(31), f = n(30);

    function u(t, e, n) {
        s.call(this), this._cache = new l, this._last = void 0, this._cipher = new c.AES(e), this._prev = i.from(n), this._mode = t, this._autopadding = !0
    }

    function l() {
        this.cache = i.allocUnsafe(0)
    }

    function h(t, e, n) {
        var s = o[t.toLowerCase()];
        if (!s) throw new TypeError("invalid suite type");
        if ("string" == typeof n && (n = i.from(n)), "GCM" !== s.mode && n.length !== s.iv) throw new TypeError("invalid iv length " + n.length);
        if ("string" == typeof e && (e = i.from(e)), e.length !== s.key / 8) throw new TypeError("invalid key length " + e.length);
        return "stream" === s.type ? new a(s.module, e, n, !0) : "auth" === s.type ? new r(s.module, e, n, !0) : new u(s.module, e, n)
    }

    n(0)(u, s), u.prototype._update = function (t) {
        var e, n;
        this._cache.add(t);
        for (var r = []; e = this._cache.get(this._autopadding);) n = this._mode.decrypt(this, e), r.push(n);
        return i.concat(r)
    }, u.prototype._final = function () {
        var t = this._cache.flush();
        if (this._autopadding) return function (t) {
            var e = t[15];
            if (e < 1 || e > 16) throw new Error("unable to decrypt data");
            for (var n = -1; ++n < e;) if (t[n + (16 - e)] !== e) throw new Error("unable to decrypt data");
            if (16 !== e) return t.slice(0, 16 - e)
        }(this._mode.decrypt(this, t));
        if (t) throw new Error("data not multiple of block length")
    }, u.prototype.setAutoPadding = function (t) {
        return this._autopadding = !!t, this
    }, l.prototype.add = function (t) {
        this.cache = i.concat([this.cache, t])
    }, l.prototype.get = function (t) {
        var e;
        if (t) {
            if (this.cache.length > 16) return e = this.cache.slice(0, 16), this.cache = this.cache.slice(16), e
        } else if (this.cache.length >= 16) return e = this.cache.slice(0, 16), this.cache = this.cache.slice(16), e;
        return null
    }, l.prototype.flush = function () {
        if (this.cache.length) return this.cache
    }, e.createDecipher = function (t, e) {
        var n = o[t.toLowerCase()];
        if (!n) throw new TypeError("invalid suite type");
        var r = f(e, !1, n.key, n.iv);
        return h(t, r.key, r.iv)
    }, e.createDecipheriv = h
}