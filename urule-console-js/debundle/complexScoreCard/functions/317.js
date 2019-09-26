var func317 = function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0});
    var r, i = (r = n(318)) && r.__esModule ? r : {default: r}, o = function (t) {
        function e(t) {
            !function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var n = function (t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)), r = function (e) {
                var n = $(this), r = n.get(0).clientWidth, i = n.get(0).clientHeight,
                    o = t.complexTable.getHighlightDiv();
                o.css({
                    width: r + "px",
                    height: i + "px"
                }), n.prepend(o), o.currentTD = n, n.on("DOMSubtreeModified", function () {
                    var t = n.get(0).clientWidth, e = n.get(0).clientHeight;
                    o.css({width: t + "px", height: e + "px"})
                })
            };
            return n.td.click(r), n.td.contextmenu(r), n
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
        }(e, i.default), e
    }();
    e.default = o
}