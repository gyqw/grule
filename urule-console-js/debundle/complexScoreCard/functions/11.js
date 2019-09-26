var func11 = function (t, e) {
    var n, r, i = t.exports = {};

    function o() {
        throw new Error("setTimeout has not been defined")
    }

    function a() {
        throw new Error("clearTimeout has not been defined")
    }

    function s(t) {
        if (n === setTimeout) return setTimeout(t, 0);
        if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
        try {
            return n(t, 0)
        } catch (e) {
            try {
                return n.call(null, t, 0)
            } catch (e) {
                return n.call(this, t, 0)
            }
        }
    }

    !function () {
        try {
            n = "function" == typeof setTimeout ? setTimeout : o
        } catch (t) {
            n = o
        }
        try {
            r = "function" == typeof clearTimeout ? clearTimeout : a
        } catch (t) {
            r = a
        }
    }();
    var c, f = [], u = !1, l = -1;

    function h() {
        u && c && (u = !1, c.length ? f = c.concat(f) : l = -1, f.length && d())
    }

    function d() {
        if (!u) {
            var t = s(h);
            u = !0;
            for (var e = f.length; e;) {
                for (c = f, f = []; ++l < e;) c && c[l].run();
                l = -1, e = f.length
            }
            c = null, u = !1, function (t) {
                if (r === clearTimeout) return clearTimeout(t);
                if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);
                try {
                    r(t)
                } catch (e) {
                    try {
                        return r.call(null, t)
                    } catch (e) {
                        return r.call(this, t)
                    }
                }
            }(t)
        }
    }

    function p(t, e) {
        this.fun = t, this.array = e
    }

    function b() {
    }

    i.nextTick = function (t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        f.push(new p(t, e)), 1 !== f.length || u || s(d)
    }, p.prototype.run = function () {
        this.fun.apply(null, this.array)
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = b, i.addListener = b, i.once = b, i.off = b, i.removeListener = b, i.removeAllListeners = b, i.emit = b, i.prependListener = b, i.prependOnceListener = b, i.listeners = function (t) {
        return []
    }, i.binding = function (t) {
        throw new Error("process.binding is not supported")
    }, i.cwd = function () {
        return "/"
    }, i.chdir = function (t) {
        throw new Error("process.chdir is not supported")
    }, i.umask = function () {
        return 0
    }
}