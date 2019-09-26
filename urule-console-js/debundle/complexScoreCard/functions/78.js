var func78 = function (t, e, n) {
    "use strict";
    t.exports = o;
    var r = n(12), i = n(25);

    function o(t) {
        if (!(this instanceof o)) return new o(t);
        r.call(this, t), this._transformState = {
            afterTransform: function (t, e) {
                var n = this._transformState;
                n.transforming = !1;
                var r = n.writecb;
                if (!r) return this.emit("error", new Error("write callback called multiple times"));
                n.writechunk = null, n.writecb = null, null != e && this.push(e), r(t);
                var i = this._readableState;
                i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
            }.bind(this), needTransform: !1, transforming: !1, writecb: null, writechunk: null, writeencoding: null
        }, this._readableState.needReadable = !0, this._readableState.sync = !1, t && ("function" == typeof t.transform && (this._transform = t.transform), "function" == typeof t.flush && (this._flush = t.flush)), this.on("prefinish", a)
    }

    function a() {
        var t = this;
        "function" == typeof this._flush ? this._flush(function (e, n) {
            s(t, e, n)
        }) : s(this, null, null)
    }

    function s(t, e, n) {
        if (e) return t.emit("error", e);
        if (null != n && t.push(n), t._writableState.length) throw new Error("Calling transform done when ws.length != 0");
        if (t._transformState.transforming) throw new Error("Calling transform done when still transforming");
        return t.push(null)
    }

    i.inherits = n(24), i.inherits(o, r), o.prototype.push = function (t, e) {
        return this._transformState.needTransform = !1, r.prototype.push.call(this, t, e)
    }, o.prototype._transform = function (t, e, n) {
        throw new Error("_transform() is not implemented")
    }, o.prototype._write = function (t, e, n) {
        var r = this._transformState;
        if (r.writecb = n, r.writechunk = t, r.writeencoding = e, !r.transforming) {
            var i = this._readableState;
            (r.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
        }
    }, o.prototype._read = function (t) {
        var e = this._transformState;
        null !== e.writechunk && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0
    }, o.prototype._destroy = function (t, e) {
        var n = this;
        r.prototype._destroy.call(this, t, function (t) {
            e(t), n.emit("close")
        })
    }
}