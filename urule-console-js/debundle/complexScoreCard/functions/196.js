var func196 = function (t, e, n) {
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
    }(), i = n(5), o = u(i), a = u(n(7)), s = u(n(201)), c = u(n(199)), f = function (t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t, e
    }(n(19));

    function u(t) {
        return t && t.__esModule ? t : {default: t}
    }

    var l = function (t) {
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
                var t = $(a.default.findDOMNode(this)), e = t.children("span"), n = this.props, r = n.data;
                if (n.dispatch, e.click(function (e) {
                    var n = $(this);
                    if (t.hasClass("parent_li")) {
                        var r = n.parent("li.parent_li").find(" > ul > li");
                        r.is(":visible") ? (r.hide("fast"), n.children("i:first").addClass("rf-plus").removeClass("rf-minus")) : (r.show("fast"), n.children("i:first").addClass("rf-minus").removeClass("rf-plus")), e.stopPropagation()
                    }
                }), t.hasClass("parent_li")) {
                    var i = this.props.expandLevel;
                    r._level >= i ? (e.parent("li.parent_li").find(" > ul > li").hide(), e.children("i:first").addClass("rf-plus").removeClass("rf-minus")) : e.children("i:first").addClass("rf-minus").removeClass("rf-plus")
                }
                this._bindContextMenu(r)
            }
        }, {
            key: "isFile", value: function () {
                var t = this.props.data.name, e = !1;
                return (t.indexOf(".") > -1 || "ul" === t || "知识包" === t) && (e = !0), e
            }
        }, {
            key: "componentWillUnmount", value: function () {
                var t = this.props.data, e = t.contextMenu;
                e && 0 !== e.length && $("#node-" + t.id).contextmenu("destroy")
            }
        }, {
            key: "componentDidUpdate", value: function () {
                this._bindContextMenu(this.props.data)
            }
        }, {
            key: "_bindContextMenu", value: function (t) {
                var e = $("#node-" + t.id);
                e.contextmenu("destroy");
                var n = t.contextMenu;
                if (n && 0 !== n.length) {
                    var r = "treenodemenu" + t.id;
                    e.contextmenu({target: "#" + r})
                }
            }
        }, {
            key: "render", value: function () {
                var t = this.props, e = t.data, n = t.dispatch, r = e.children, i = "node-" + e.id,
                    a = "treenodemenu" + e.id, u = [];
                if (e.contextMenu && u.push(o.default.createElement(c.default, {
                    items: e.contextMenu,
                    key: e.id,
                    data: e,
                    dispatch: n,
                    menuId: a
                })), r && r.length > 0) return o.default.createElement("li", {className: "parent_li"}, o.default.createElement("span", {id: i}, o.default.createElement("i", {
                    className: "rf rf-minus",
                    style: {marginRight: "2px"}
                }), o.default.createElement("i", {
                    className: e._icon,
                    style: e._style
                }), " ", o.default.createElement("a", {
                    href: "###",
                    style: e._style
                }, " ", e.name), o.default.createElement("sup", null, o.default.createElement("i", {
                    title: e.lock ? e.lockInfo : "",
                    className: e.lock ? "rf rf-lock" : ""
                }))), u, o.default.createElement(s.default, {
                    dispatch: n,
                    children: r,
                    expandLevel: this.props.expandLevel
                }));
                var l = this.isFile();
                return o.default.createElement("li", null, o.default.createElement("span", {
                    id: i,
                    onClick: function (t) {
                        if (l) {
                            var n = window._server + e.editorPath + "?file=" + e.fullPath;
                            f.eventEmitter.emit(f.TREE_NODE_CLICK, {
                                id: e.id,
                                name: e.name,
                                fullPath: e.fullPath,
                                path: n,
                                active: !0
                            }), $(".tree").find(".tree-active").removeClass("tree-active"), $("#" + i).addClass("tree-active")
                        }
                    }
                }, o.default.createElement("i", {
                    className: e._icon,
                    style: e._style
                }), " ", o.default.createElement("a", {
                    href: "###",
                    style: e._style
                }, " ", e.name), o.default.createElement("sup", null, o.default.createElement("i", {
                    title: e.lock ? e.lockInfo : "",
                    className: e.lock ? "rf rf-lock" : ""
                }))), u)
            }
        }]), e
    }();
    e.default = l
}