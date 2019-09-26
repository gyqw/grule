var func46 = function (t, e, n) {
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
    }(), i = n(5), o = s(i), a = s(n(7));

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
            key: "componentDidMount", value: function () {
                var t = $(a.default.findDOMNode(this));
                t.on("show.bs.modal", function () {
                    var e = 1050;
                    $(document).find(".modal").each(function (t, n) {
                        var r = $(n).css("z-index");
                        if (r && "" !== r && !isNaN(r)) {
                            var i = parseInt(r);
                            i > e && (e = i)
                        }
                    }), t.css("z-index", e + 1)
                })
            }
        }, {
            key: "render", value: function () {
                var t = this, e = [];
                this.props.buttons.forEach(function (n, r) {
                    e.push(o.default.createElement("button", {
                        type: "button",
                        key: r,
                        className: n.className,
                        onClick: function (e) {
                            n.click(t.props.dispatch)
                        }
                    }, o.default.createElement("i", {className: n.icon}), " ", n.name))
                });
                var n = "modal-dialog" + (this.props.large ? " modal-lg" : "");
                return o.default.createElement("div", {
                    className: "modal fade",
                    tabIndex: "-1",
                    role: "dialog",
                    "aria-hidden": "true",
                    style: {overflow: "auto"}
                }, o.default.createElement("div", {className: n}, o.default.createElement("div", {className: "modal-content"}, o.default.createElement("div", {className: "modal-header"}, o.default.createElement("button", {
                    type: "button",
                    className: "close",
                    "data-dismiss": "modal",
                    "aria-hidden": "true"
                }, "×"), o.default.createElement("h3", {
                    className: "modal-title",
                    id: "myModalLabel",
                    style: {wordWrap: "break-word"}
                }, this.props.title, o.default.createElement("div", {
                    className: "text-danger",
                    style: {fontSize: "12pt"}
                }, this.props.info ? this.props.info : null))), o.default.createElement("div", {
                    className: "modal-body",
                    style: {padding: "10px"}
                }, this.props.body), o.default.createElement("div", {className: "modal-footer"}, e))))
            }
        }]), e
    }();
    e.default = c
}