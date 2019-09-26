var func1 = function (t, e, n) {
    var r = n(2), i = r.Buffer;

    function o(t, e) {
        for (var n in t) e[n] = t[n]
    }

    function a(t, e, n) {
        return i(t, e, n)
    }

    i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = r : (o(r, e), e.Buffer = a), o(i, a), a.from = function (t, e, n) {
        if ("number" == typeof t) throw new TypeError("Argument must not be a number");
        return i(t, e, n)
    }, a.alloc = function (t, e, n) {
        if ("number" != typeof t) throw new TypeError("Argument must be a number");
        var r = i(t);
        return void 0 !== e ? "string" == typeof n ? r.fill(e, n) : r.fill(e) : r.fill(0), r
    }, a.allocUnsafe = function (t) {
        if ("number" != typeof t) throw new TypeError("Argument must be a number");
        return i(t)
    }, a.allocUnsafeSlow = function (t) {
        if ("number" != typeof t) throw new TypeError("Argument must be a number");
        return r.SlowBuffer(t)
    }
}