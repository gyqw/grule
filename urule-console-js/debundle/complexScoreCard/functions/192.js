var func192 = function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0});
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(), o = n(5), a = l(o), s = l(n(7)), c = function (t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t, e
    }(n(48)), f = n(16), u = n(27);

    function l(t) {
        return t && t.__esModule ? t : {default: t}
    }

    var h = function (t) {
        function e(t) {
            return function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e), function (t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t))
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
        }(e, o.Component), i(e, [{
            key: "_storeData", value: function () {
            }
        }, {
            key: "_showEditor", value: function (t) {
                var e = this.props.rowData, n = $(s.default.findDOMNode(this));
                if (!this.cellEditor) {
                    switch (this.cellEditor = null, e._editorType) {
                        case"number":
                            this.cellEditor = $('<input type="number" class="form-control" style="height:31px">');
                            break;
                        case"date":
                            this.cellEditor = $('<input type="date" class="form-control" style="height:31px">');
                            break;
                        case"boolean":
                            this.cellEditor = $('<select class="form-control" style="height:31px"><option value="true">true</option><option value="false" selected="selected">false</option></select>');
                            break;
                        case"list":
                            this.cellEditor = $('<input type="text" class="form-control" style="height:31px" title="双击打开窗口编辑列表值">'), this.cellEditor.dblclick(function () {
                                var r = e[t];
                                r && "" !== r || (r = "{}");
                                var i = JSON.parse(r) || {}, o = i.rows || [], a = i.type, s = function (r) {
                                    var i = {type: a, rows: r}, o = JSON.stringify(i);
                                    e[t] = o, n.find("div").html(o)
                                };
                                if (a) {
                                    var f = null, l = !0, h = !1, d = void 0;
                                    try {
                                        for (var p, b = simulatorCategoryData[Symbol.iterator](); !(l = (p = b.next()).done); l = !0) {
                                            var g = p.value;
                                            if (a === g.clazz) {
                                                f = g;
                                                break
                                            }
                                        }
                                    } catch (t) {
                                        h = !0, d = t
                                    } finally {
                                        try {
                                            !l && b.return && b.return()
                                        } finally {
                                            if (h) throw d
                                        }
                                    }
                                    f || (f = {variables: [{name: "value", label: a + "具体值"}]});
                                    var y = f.variables || [];
                                    c.eventEmitter.emit(c.SHOW_CHILD_LIST_DIALOG, {variables: y, rows: o, callback: s})
                                } else {
                                    var m = window.simulatorCategoryData || [],
                                        v = $('<select class="form-control"></select>'), A = !0, w = !1, _ = void 0;
                                    try {
                                        for (var E, x = m[Symbol.iterator](); !(A = (E = x.next()).done); A = !0) {
                                            var C = E.value;
                                            v.append('<option value="' + C.clazz + '">' + C.name + "</option>")
                                        }
                                    } catch (t) {
                                        w = !0, _ = t
                                    } finally {
                                        try {
                                            !A && x.return && x.return()
                                        } finally {
                                            if (w) throw _
                                        }
                                    }
                                    v.append('<option value="Integer">Integer</option>'), v.append('<option value="Double">Double</option>'), v.append('<option value="Float">Float</option>'), v.append('<option value="String">String</option>'), v.append('<option value="" selected></option>'), u.MsgBox.dialog("选择子对象类型", v, function () {
                                        if ((a = v.val()) && "" !== a) {
                                            var t = null;
                                            if ("Integer" !== a && "Double" !== a && "String" !== a && "Float" !== a) {
                                                var e = !0, n = !1, r = void 0;
                                                try {
                                                    for (var i, f = m[Symbol.iterator](); !(e = (i = f.next()).done); e = !0) {
                                                        var l = i.value;
                                                        if (a === l.clazz) {
                                                            t = l;
                                                            break
                                                        }
                                                    }
                                                } catch (t) {
                                                    n = !0, r = t
                                                } finally {
                                                    try {
                                                        !e && f.return && f.return()
                                                    } finally {
                                                        if (n) throw r
                                                    }
                                                }
                                            } else t = {variables: [{name: "value", label: a + "具体值"}]};
                                            var h = t.variables || [];
                                            c.eventEmitter.emit(c.SHOW_CHILD_LIST_DIALOG, {
                                                variables: h,
                                                rows: o,
                                                callback: s
                                            })
                                        } else u.MsgBox.alert("请先选择子对象类型!")
                                    })
                                }
                            });
                            break;
                        default:
                            this.cellEditor = $('<input type="text" class="form-control" style="height:31px">')
                    }
                    n.append(this.cellEditor), this.cellEditor.blur(function () {
                        e[t] = $(this).val();
                        var r = n.find("div");
                        r.html(e[t]), r.show(), $(this).hide()
                    })
                }
                this.cellEditor.val(e[t]), this.cellEditor.show(), this.cellEditor.focus()
            }
        }, {
            key: "render", value: function () {
                var t = this, e = this.props, n = e.rowData, i = e.header, o = i.dateFormat, s = n[i.name];
                if (o) {
                    var u = new Date(s);
                    s = (0, f.formatDate)(u, o)
                }
                return s && "object" === (void 0 === s ? "undefined" : r(s)) && (s = JSON.stringify(s)), a.default.createElement("td", {style: {padding: "1px 5px"}}, a.default.createElement("div", {
                    style: {
                        marginTop: "5px",
                        minHeight: "26px",
                        wordBreak: "break-all"
                    }, onClick: function (e) {
                        if (i.editable) {
                            var r = e.target;
                            $(r).css({display: "none"}), n._editorType ? t._showEditor(i.name) : c.eventEmitter.emit(c.SHOW_CELL_EDITOR, {
                                targetDiv: r,
                                rowData: n,
                                colId: i.id
                            })
                        }
                    }
                }, s))
            }
        }]), e
    }();
    e.default = h
}