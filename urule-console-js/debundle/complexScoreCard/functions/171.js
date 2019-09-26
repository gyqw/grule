var func171 = function (t, e, n) {
    (function (t, e) {
        !function (t, n) {
            "use strict";
            if (!t.setImmediate) {
                var r, i, o, a, s, c = 1, f = {}, u = !1, l = t.document,
                    h = Object.getPrototypeOf && Object.getPrototypeOf(t);
                h = h && h.setTimeout ? h : t, "[object process]" === {}.toString.call(t.process) ? r = function (t) {
                    e.nextTick(function () {
                        p(t)
                    })
                } : function () {
                    if (t.postMessage && !t.importScripts) {
                        var e = !0, n = t.onmessage;
                        return t.onmessage = function () {
                            e = !1
                        }, t.postMessage("", "*"), t.onmessage = n, e
                    }
                }() ? (a = "setImmediate$" + Math.random() + "$", s = function (e) {
                    e.source === t && "string" == typeof e.data && 0 === e.data.indexOf(a) && p(+e.data.slice(a.length))
                }, t.addEventListener ? t.addEventListener("message", s, !1) : t.attachEvent("onmessage", s), r = function (e) {
                    t.postMessage(a + e, "*")
                }) : t.MessageChannel ? ((o = new MessageChannel).port1.onmessage = function (t) {
                    p(t.data)
                }, r = function (t) {
                    o.port2.postMessage(t)
                }) : l && "onreadystatechange" in l.createElement("script") ? (i = l.documentElement, r = function (t) {
                    var e = l.createElement("script");
                    e.onreadystatechange = function () {
                        p(t), e.onreadystatechange = null, i.removeChild(e), e = null
                    }, i.appendChild(e)
                }) : r = function (t) {
                    setTimeout(p, 0, t)
                }, h.setImmediate = function (t) {
                    "function" != typeof t && (t = new Function("" + t));
                    for (var e = new Array(arguments.length - 1), n = 0; n < e.length; n++) e[n] = arguments[n + 1];
                    var i = {callback: t, args: e};
                    return f[c] = i, r(c), c++
                }, h.clearImmediate = d
            }

            function d(t) {
                delete f[t]
            }

            function p(t) {
                if (u) setTimeout(p, 0, t); else {
                    var e = f[t];
                    if (e) {
                        u = !0;
                        try {
                            !function (t) {
                                var e = t.callback, r = t.args;
                                switch (r.length) {
                                    case 0:
                                        e();
                                        break;
                                    case 1:
                                        e(r[0]);
                                        break;
                                    case 2:
                                        e(r[0], r[1]);
                                        break;
                                    case 3:
                                        e(r[0], r[1], r[2]);
                                        break;
                                    default:
                                        e.apply(n, r)
                                }
                            }(e)
                        } finally {
                            d(t), u = !1
                        }
                    }
                }
            }
        }("undefined" == typeof self ? void 0 === t ? this : t : self)
    }).call(this, n(8), n(11))
}