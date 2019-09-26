var func353 = function (t, e, n) {
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
    }(), i = s(n(320)), o = s(n(352)), a = s(n(351));

    function s(t) {
        return t && t.__esModule ? t : {default: t}
    }

    var c = function (t) {
        function e(t) {
            !function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var n = function (t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
            return n.tr.css("background", "#f1f1f1"), n.conditionHeaders = [], n.actionHeaders = [], n
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
        }(e, i.default), r(e, [{
            key: "addConditionHeader", value: function (t, e) {
                var n = t.complexTable, r = new o.default(n, e);
                t.width && (e.width = t.width, r.td.css("width", t.width + "px"));
                var i = t.refHeaderCell;
                if (i) {
                    var a = n.headerRow.conditionHeaders.indexOf(i), s = i.td;
                    t.before ? (s.before(r.td), this.conditionHeaders.splice(a, 0, r)) : (s.after(r.td), this.conditionHeaders.splice(a + 1, 0, r))
                } else this.tr.append(r.td), this.conditionHeaders.push(r)
            }
        }, {
            key: "addActionHeader", value: function (t, e) {
                var n = t.complexTable, r = t.actionType, i = new a.default(n, r, e);
                t.width && (e.width = t.width, i.td.css("width", t.width + "px")), t.customActionHeaderLabel && i.updateLabel(t.customActionHeaderLabel);
                var o = t.refHeaderCell;
                if (o) {
                    var s = n.headerRow.actionHeaders.indexOf(o), c = o.td;
                    t.before ? (c.before(i.td), 0 === s && this.actionHeaders[0].td.css("border-left", "inherit"), this.actionHeaders.splice(s, 0, i)) : (c.after(i.td), this.actionHeaders.splice(s + 1, 0, i))
                } else this.tr.append(i.td), this.actionHeaders.push(i)
            }
        }]), e
    }();
    e.default = c
}