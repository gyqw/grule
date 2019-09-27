var func208 = function (t, e, n) {
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
    }();

    // todo
    n(47);
    h(n(46));
    c = l(n(34));
    f = l(n(19));
    u = h(n(206));


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
            return n.state = {title: "选择资源"}, n
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
                f.eventEmitter.on(f.OPEN_KNOWLEDGE_TREE_DIALOG, function (e) {
                    t._config = e, t.callback = e.callback, c.loadResourceTreeData({
                        project: e.project,
                        forLib: e.forLib,
                        fileType: e.fileType
                    }, function (t) {
                        this.setState({
                            data: t,
                            fileType: e.fileType
                        }), $("#_knowledge_tree_dialog_container").children(".modal").modal("show")
                    }.bind(t))
                }), f.eventEmitter.on(f.HIDE_KNOWLEDGE_TREE_DIALOG, function () {
                    $("#_knowledge_tree_dialog_container").children(".modal").modal("hide")
                }), f.eventEmitter.on(f.TREE_NODE_CLICK, function (e) {
                    t.currentNodeData = e
                }), f.eventEmitter.on(f.TREE_DIR_NODE_CLICK, function (e) {
                    t.currentNodeData = e
                })
            }
        }, {
            key: "search", value: function () {
                var t = $(".resSearchText").val(), e = this._config;
                c.loadResourceTreeData({
                    project: e.project,
                    forLib: e.forLib,
                    fileType: e.fileType,
                    searchFileName: t
                }, function (t) {
                    this.setState({data: t, fileType: e.fileType})
                }.bind(this))
            }
        }, {
            key: "componentWillUnmount", value: function () {
                f.eventEmitter.removeAllListeners(f.OPEN_KNOWLEDGE_TREE_DIALOG), f.eventEmitter.removeAllListeners(f.HIDE_KNOWLEDGE_TREE_DIALOG), f.eventEmitter.removeAllListeners(f.TREE_NODE_CLICK)
            }
        }, {
            key: "render", value: function () {
                var t = o.default.createElement("div", {
                    className: "tree",
                    style: {marginLeft: "10px"}
                }, o.default.createElement("div", null, o.default.createElement("input", {
                    type: "text",
                    className: "form-control resSearchText",
                    placeholder: "请输入要查询的文件名...",
                    style: {display: "inline-block", width: "220px"}
                }), o.default.createElement("a", {
                    href: "###",
                    onClick: this.search.bind(this),
                    style: {margin: "6px", fontSize: "16px"}
                }, o.default.createElement("i", {className: "glyphicon glyphicon-search"}))), o.default.createElement(s.default, {
                    data: this.state.data,
                    selectDir: this.props.selectDir
                })), e = (this.state.fileType, [{
                    name: "确定",
                    className: "btn btn-danger",
                    icon: "glyphicon glyphicon-floppy-saved",
                    click: function () {
                        this.currentNodeData ? (this.callback(this.currentNodeData.fullPath, "LATEST"), f.eventEmitter.emit(f.HIDE_KNOWLEDGE_TREE_DIALOG)) : bootbox.alert("请先选择一个文件")
                    }.bind(this)
                }]);
                return e.push({
                    name: "选择版本",
                    className: "btn btn-primary",
                    icon: "glyphicon glyphicon-hand-up",
                    click: function () {
                        this.currentNodeData ? f.eventEmitter.emit(f.OPEN_VERSION_SELECT_DIALOG, {
                            file: this.currentNodeData.fullPath,
                            callback: this.callback
                        }) : bootbox.alert("请先选择一个文件")
                    }.bind(this)
                }), o.default.createElement("div", null, o.default.createElement(u.default, null), o.default.createElement("div", {id: "_knowledge_tree_dialog_container"}, o.default.createElement(a.default, {
                    title: this.state.title,
                    body: t,
                    buttons: e
                })))
            }
        }]), e
    }();
    e.default = d
}