var func319 = function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0});
    var r, i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(), o = (r = n(318)) && r.__esModule ? r : {default: r}, a = function (t) {
        function e(t) {
            !function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var n = function (t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
            return n.td.css("padding-right", "0"), n.td.append(n.buildColResizeTrigger()), n.bindColResize(t), n
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
        }(e, o.default), i(e, [{
            key: "buildColResizeTrigger", value: function () {
                return this.resizeTrigger = $('<span style="cursor: col-resize;width: 3px;height: 20px;float: right;border: solid 2px transparent;">&nbsp;</span>'), this.resizeTrigger
            }
        }, {
            key: "bindColResize", value: function (t) {
                var e = !1, n = void 0, r = void 0, i = void 0, o = this;
                this.resizeTrigger.mouseover(function () {
                    $(this).css("border", "solid 2px #999")
                }), this.resizeTrigger.mouseout(function () {
                    $(this).css("border", "solid 2px transparent")
                }), this.resizeTrigger.mousedown(function (t) {
                    n = $(this).parent(), e = !0, r = t.pageX, i = n.width(), t.preventDefault()
                }), $(document).mousemove(function (a) {
                    if (e) {
                        var s = i + (a.pageX - r);
                        o.actionCol ? o.actionCol.width = s : o.conditionCol.width = s, n.width(s), o._rebuildHighLightDiv(t), a.preventDefault()
                    }
                }), $(document).mouseup(function (t) {
                    e = !1, window._setDirty()
                })
            }
        }, {
            key: "_rebuildHighLightDiv", value: function (t) {
                var e = t.getHighlightDiv(), n = e.currentTD;
                if (n) {
                    var r = n.get(0).clientWidth, i = n.get(0).clientHeight;
                    e.css({width: r + "px", height: i + "px"})
                }
            }
        }]), e
    }();
    e.default = a
}