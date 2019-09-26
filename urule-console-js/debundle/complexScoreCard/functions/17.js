var func17 = function (t, e) {
    var n = {}, r = function (t) {
        var e;
        return function () {
            return void 0 === e && (e = t.apply(this, arguments)), e
        }
    }, i = r(function () {
        return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())
    }), o = r(function () {
        return document.head || document.getElementsByTagName("head")[0]
    }), a = null, s = 0, c = [];

    function f(t, e) {
        for (var r = 0; r < t.length; r++) {
            var i = t[r], o = n[i.id];
            if (o) {
                o.refs++;
                for (var a = 0; a < o.parts.length; a++) o.parts[a](i.parts[a]);
                for (; a < i.parts.length; a++) o.parts.push(p(i.parts[a], e))
            } else {
                var s = [];
                for (a = 0; a < i.parts.length; a++) s.push(p(i.parts[a], e));
                n[i.id] = {id: i.id, refs: 1, parts: s}
            }
        }
    }

    function u(t) {
        for (var e = [], n = {}, r = 0; r < t.length; r++) {
            var i = t[r], o = i[0], a = {css: i[1], media: i[2], sourceMap: i[3]};
            n[o] ? n[o].parts.push(a) : e.push(n[o] = {id: o, parts: [a]})
        }
        return e
    }

    function l(t, e) {
        var n = o(), r = c[c.length - 1];
        if ("top" === t.insertAt) r ? r.nextSibling ? n.insertBefore(e, r.nextSibling) : n.appendChild(e) : n.insertBefore(e, n.firstChild), c.push(e); else {
            if ("bottom" !== t.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
            n.appendChild(e)
        }
    }

    function h(t) {
        t.parentNode.removeChild(t);
        var e = c.indexOf(t);
        e >= 0 && c.splice(e, 1)
    }

    function d(t) {
        var e = document.createElement("style");
        return e.type = "text/css", l(t, e), e
    }

    function p(t, e) {
        var n, r, i;
        if (e.singleton) {
            var o = s++;
            n = a || (a = d(e)), r = y.bind(null, n, o, !1), i = y.bind(null, n, o, !0)
        } else t.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = function (t) {
            var e = document.createElement("link");
            return e.rel = "stylesheet", l(t, e), e
        }(e), r = function (t, e) {
            var n = e.css, r = e.sourceMap;
            r && (n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
            var i = new Blob([n], {type: "text/css"}), o = t.href;
            t.href = URL.createObjectURL(i), o && URL.revokeObjectURL(o)
        }.bind(null, n), i = function () {
            h(n), n.href && URL.revokeObjectURL(n.href)
        }) : (n = d(e), r = function (t, e) {
            var n = e.css, r = e.media;
            if (r && t.setAttribute("media", r), t.styleSheet) t.styleSheet.cssText = n; else {
                for (; t.firstChild;) t.removeChild(t.firstChild);
                t.appendChild(document.createTextNode(n))
            }
        }.bind(null, n), i = function () {
            h(n)
        });
        return r(t), function (e) {
            if (e) {
                if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
                r(t = e)
            } else i()
        }
    }

    t.exports = function (t, e) {
        if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
        void 0 === (e = e || {}).singleton && (e.singleton = i()), void 0 === e.insertAt && (e.insertAt = "bottom");
        var r = u(t);
        return f(r, e), function (t) {
            for (var i = [], o = 0; o < r.length; o++) {
                var a = r[o];
                (s = n[a.id]).refs--, i.push(s)
            }
            for (t && f(u(t), e), o = 0; o < i.length; o++) {
                var s;
                if (0 === (s = i[o]).refs) {
                    for (var c = 0; c < s.parts.length; c++) s.parts[c]();
                    delete n[s.id]
                }
            }
        }
    };
    var b, g = (b = [], function (t, e) {
        return b[t] = e, b.filter(Boolean).join("\n")
    });

    function y(t, e, n, r) {
        var i = n ? "" : r.css;
        if (t.styleSheet) t.styleSheet.cssText = g(e, i); else {
            var o = document.createTextNode(i), a = t.childNodes;
            a[e] && t.removeChild(a[e]), a.length ? t.insertBefore(o, a[e]) : t.appendChild(o)
        }
    }
}