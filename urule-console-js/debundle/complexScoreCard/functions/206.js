var func206 = function (t, e, n) {
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
    }(), i = n(5), o = h(i), a = h(n(7)), s = h(n(83)), c = h(n(46)), f = l(n(19)), u = l(n(34));

    function l(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t, e
    }

    function h(t) {
        return t && t.__esModule ? t : {default: t}
    }

    var d = function (t) {
        function e(t) {
            !function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var n = function (t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
            return n.state = {title: ""}, n
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
                f.eventEmitter.on(f.OPEN_VERSION_SELECT_DIALOG, function (e) {
                    var n = e.file;
                    t.callback = e.callback, t.file = n, u.loadFileVersions(n, function (t) {
                        $(a.default.findDOMNode(this)).modal("show"), this.setState({
                            data: t,
                            title: "选择文件[" + n + "]的版本"
                        })
                    }.bind(t))
                }), f.eventEmitter.on(f.HIDE_VERSION_SELECT_DIALOG, function () {
                    $(a.default.findDOMNode(t)).modal("hide")
                }), $(a.default.findDOMNode(this)).modal("hide")
            }
        }, {
            key: "componentWillUnmount", value: function () {
                f.eventEmitter.removeAllListeners(f.OPEN_VERSION_SELECT_DIALOG), f.eventEmitter.removeAllListeners(f.HIDE_VERSION_SELECT_DIALOG)
            }
        }, {
            key: "render", value: function () {
                var t = {
                    width: "75px",
                    operations: [{
                        label: "选择该版本",
                        icon: "rf rf-select",
                        style: {fontSize: "18px", color: "#337ab7", padding: "0px 4px", cursor: "pointer"},
                        click: function (t, e) {
                            this.callback(this.file, e.name), f.eventEmitter.emit(f.HIDE_VERSION_SELECT_DIALOG), f.eventEmitter.emit(f.HIDE_KNOWLEDGE_TREE_DIALOG)
                        }.bind(this)
                    }]
                }, e = o.default.createElement(s.default, {
                    headers: [{
                        id: "v-name",
                        name: "name",
                        label: "版本名称",
                        filterable: !0,
                        width: "100px"
                    }, {id: "v-comment", name: "comment", label: "版本描述"}, {
                        id: "v-createUser",
                        name: "createUser",
                        label: "创建人",
                        filterable: !0,
                        width: "140px"
                    }, {
                        id: "v-createDate",
                        name: "createDate",
                        label: "创建日期",
                        width: "140px",
                        dateFormat: "yyyy-MM-dd HH:mm:ss"
                    }], operationConfig: t, rows: this.state.data || []
                });
                return o.default.createElement(c.default, {title: this.state.title, body: e, buttons: [], large: !0})
            }
        }]), e
    }();
    e.default = d
}