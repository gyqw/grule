var func151 = function (t, e, n) {
    "use strict";
    var r = n(6), i = n(0), o = {};
    e.instantiate = function (t) {
        function e(e) {
            t.call(this, e), this._cbcInit()
        }

        i(e, t);
        for (var n = Object.keys(o), r = 0; r < n.length; r++) {
            var a = n[r];
            e.prototype[a] = o[a]
        }
        return e.create = function (t) {
            return new e(t)
        }, e
    }, o._cbcInit = function () {
        var t = new function (t) {
            r.equal(t.length, 8, "Invalid IV length"), this.iv = new Array(8);
            for (var e = 0; e < this.iv.length; e++) this.iv[e] = t[e]
        }(this.options.iv);
        this._cbcState = t
    }, o._update = function (t, e, n, r) {
        var i = this._cbcState, o = this.constructor.super_.prototype, a = i.iv;
        if ("encrypt" === this.type) {
            for (var s = 0; s < this.blockSize; s++) a[s] ^= t[e + s];
            for (o._update.call(this, a, 0, n, r), s = 0; s < this.blockSize; s++) a[s] = n[r + s]
        } else {
            for (o._update.call(this, t, e, n, r), s = 0; s < this.blockSize; s++) n[r + s] ^= a[s];
            for (s = 0; s < this.blockSize; s++) a[s] = t[e + s]
        }
    }
}