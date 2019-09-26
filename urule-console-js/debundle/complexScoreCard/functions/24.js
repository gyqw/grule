var func24 = function (t, e) {
    "function" == typeof Object.create ? t.exports = function (t, e) {
        t.super_ = e, t.prototype = Object.create(e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    } : t.exports = function (t, e) {
        t.super_ = e;
        var n = function () {
        };
        n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
    }
}