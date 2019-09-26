var func211 = function (t, e, n) {
    var r;
    !function () {
        "use strict";
        var i = function () {
            var t, e, n = [], r = -1, i = 0, o = !1;
            return e = function (t, e) {
                return t && "function" == typeof t[e] ? (o = !0, t[e](), o = !1, this) : this
            }, {
                add: function (e) {
                    return o ? this : (n.splice(r + 1, n.length - r), n.push(e), i && n.length > i && (0, s = -(i + 1), (a = n).splice(0, !s || 1 + s - 0 + (!(s < 0 ^ !0) && (s < 0 || -1) * a.length)), a.length), r = n.length - 1, t && t(), this);
                    var a, s
                }, setCallback: function (e) {
                    t = e
                }, undo: function () {
                    var i = n[r];
                    return i ? (e(i, "undo"), r -= 1, t && t(), this) : this
                }, redo: function () {
                    var i = n[r + 1];
                    return i ? (e(i, "redo"), r += 1, t && t(), this) : this
                }, clear: function () {
                    var e = n.length;
                    n = [], r = -1, t && e > 0 && t()
                }, hasUndo: function () {
                    return -1 !== r
                }, hasRedo: function () {
                    return r < n.length - 1
                }, getCommands: function () {
                    return n
                }, getIndex: function () {
                    return r
                }, setLimit: function (t) {
                    i = t
                }
            }
        };
        void 0 === (r = function () {
            return i
        }.call(e, n, e, t)) || (t.exports = r)
    }()
}