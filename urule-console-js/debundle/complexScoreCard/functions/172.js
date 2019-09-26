var func172 = function (t, e, n) {
    (function (t) {
        var r = Function.prototype.apply;

        function i(t, e) {
            this._id = t, this._clearFn = e
        }

        e.setTimeout = function () {
            return new i(r.call(setTimeout, window, arguments), clearTimeout)
        }, e.setInterval = function () {
            return new i(r.call(setInterval, window, arguments), clearInterval)
        }, e.clearTimeout = e.clearInterval = function (t) {
            t && t.close()
        }, i.prototype.unref = i.prototype.ref = function () {
        }, i.prototype.close = function () {
            this._clearFn.call(window, this._id)
        }, e.enroll = function (t, e) {
            clearTimeout(t._idleTimeoutId), t._idleTimeout = e
        }, e.unenroll = function (t) {
            clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
        }, e._unrefActive = e.active = function (t) {
            clearTimeout(t._idleTimeoutId);
            var e = t._idleTimeout;
            e >= 0 && (t._idleTimeoutId = setTimeout(function () {
                t._onTimeout && t._onTimeout()
            }, e))
        }, n(171), e.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== t && t.setImmediate || this && this.setImmediate, e.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== t && t.clearImmediate || this && this.clearImmediate
    }).call(this, n(8))
}