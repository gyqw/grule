var func89 = function (t, e, n) {
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
    }(), i = n(5), o = c(i), a = c(n(7)), s = function (t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t, e
    }(n(48));

    function c(t) {
        return t && t.__esModule ? t : {default: t}
    }

    var f = function (t) {
        function e(t) {
            !function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var n = function (t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
            return n.state = {display: "none"}, n
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
                var t = this;
                s.eventEmitter.on(s.SHOW_CELL_EDITOR, function (e) {
                    var n = t.props.header;
                    if (e.colId === n.id) {
                        var r = $(e.targetDiv), i = r.parent(), o = $(a.default.findDOMNode(t));
                        i.append(o);
                        var s = e.rowData;
                        o.val(s[n.name]), t.setState({$targetDiv: r, rowData: s, display: ""})
                    }
                })
            }
        }, {
            key: "componentWillUnmount", value: function () {
                s.eventEmitter.removeAllListeners(s.SHOW_CELL_EDITOR)
            }
        }, {
            key: "blur", value: function () {
                var t = this.state.$targetDiv;
                if (t) {
                    t.css({display: ""});
                    var e = a.default.findDOMNode(this).value;
                    t.html(e);
                    var n = this.props.header;
                    this.state.rowData[n.name] = e, this.setState({display: "none"})
                }
            }
        }, {
            key: "componentDidUpdate", value: function () {
                "" === this.state.display && a.default.findDOMNode(this).focus()
            }
        }, {
            key: "render", value: function () {
                var t = {display: this.state.display, height: "31px", padding: "0px 5px"}, e = this.props.header,
                    n = e.editorType, r = e.selectData;
                switch (n) {
                    case"select":
                        return o.default.createElement("select", {
                            style: t,
                            onBlur: this.blur.bind(this),
                            className: "form-control"
                        }, r.map(function (t, e) {
                            return o.default.createElement("option", {key: e}, t)
                        }));
                    case"boolean":
                        return o.default.createElement("select", {
                            onBlur: this.blur.bind(this),
                            className: "form-control"
                        }, o.default.createElement("option", {value: "true"}, "true"), o.default.createElement("option", {
                            value: "false",
                            selected: "selected"
                        }, "false"));
                    case"date":
                        return o.default.createElement("input", {
                            style: t,
                            onBlur: this.blur.bind(this),
                            type: "date",
                            className: "form-control"
                        });
                    case"number":
                        return o.default.createElement("input", {
                            style: t,
                            onBlur: this.blur.bind(this),
                            type: "number",
                            className: "form-control"
                        });
                    default:
                        return o.default.createElement("input", {
                            style: t,
                            onBlur: this.blur.bind(this),
                            type: "text",
                            className: "form-control"
                        })
                }
            }
        }]), e
    }();
    e.default = f
}