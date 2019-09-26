var func201 = function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0});
    var r = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(), i = n(5), o = s(i), a = s(n(196));

    function s(t) {
        return t && t.__esModule ? t : {default: t}
    }

    var c = function (t) {
        function e() {
            return function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e), function (t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
        }

        return function (t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, i.Component), r(e, [{
            key: "render", value: function () {
                var t = this, e = this.props, n = e.children, r = e.dispatch, i = e.selectDir, s = [];
                return n.forEach(function (e, n) {
                    s.push(o.default.createElement(a.default, {
                        data: e,
                        key: n,
                        dispatch: r,
                        selectDir: i,
                        expandLevel: t.props.expandLevel
                    }))
                }), o.default.createElement("ul", {style: {marginLeft: "-18px"}}, s)
            }
        }]), e
    }();
    e.default = c
}