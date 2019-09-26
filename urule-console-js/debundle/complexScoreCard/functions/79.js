var func79 = function (t, e, n) {
    "use strict";
    var r = n(32);

    function i(t, e) {
        t.emit("error", e)
    }

    t.exports = {
        destroy: function (t, e) {
            var n = this, o = this._readableState && this._readableState.destroyed,
                a = this._writableState && this._writableState.destroyed;
            return o || a ? (e ? e(t) : !t || this._writableState && this._writableState.errorEmitted || r.nextTick(i, this, t), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function (t) {
                !e && t ? (r.nextTick(i, n, t), n._writableState && (n._writableState.errorEmitted = !0)) : e && e(t)
            }), this)
        }, undestroy: function () {
            this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
        }
    }
}