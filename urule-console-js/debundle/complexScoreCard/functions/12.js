var func12 = function (t, e, n) {
    "use strict";
    var r = n(32), i = Object.keys || function (t) {
        var e = [];
        for (var n in t) e.push(n);
        return e
    };
    t.exports = l;
    var o = n(25);
    o.inherits = n(24);
    var a = n(81), s = n(43);
    o.inherits(l, a);
    for (var c = i(s.prototype), f = 0; f < c.length; f++) {
        var u = c[f];
        l.prototype[u] || (l.prototype[u] = s.prototype[u])
    }

    function l(t) {
        if (!(this instanceof l)) return new l(t);
        a.call(this, t), s.call(this, t), t && !1 === t.readable && (this.readable = !1), t && !1 === t.writable && (this.writable = !1), this.allowHalfOpen = !0, t && !1 === t.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", h)
    }

    function h() {
        this.allowHalfOpen || this._writableState.ended || r.nextTick(d, this)
    }

    function d(t) {
        t.end()
    }

    Object.defineProperty(l.prototype, "writableHighWaterMark", {
        enumerable: !1, get: function () {
            return this._writableState.highWaterMark
        }
    }), Object.defineProperty(l.prototype, "destroyed", {
        get: function () {
            return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed
        }, set: function (t) {
            void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = t, this._writableState.destroyed = t)
        }
    }), l.prototype._destroy = function (t, e) {
        this.push(null), this.end(), r.nextTick(e, t)
    }
}