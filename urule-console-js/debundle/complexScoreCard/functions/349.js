var func349 = function (t, e, n) {
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
    }(), i = c(n(317)), o = c(n(281)), a = n(27), s = n(16);

    function c(t) {
        return t && t.__esModule ? t : {default: t}
    }

    var f = function (t) {
        function e(t, n, r) {
            !function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var i = function (t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
            return i.contentRow = n, i.conditionCol = r, i.init(t), i
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
            key: "init", value: function (t) {
                var e = this;
                this.propContainer = generateContainer(), URule.setDomContent(this.propContainer, "请选择属性"), this.td.append(this.propContainer), this.propContainer.css({
                    color: "#999",
                    position: "relative"
                }), this.refreshVariableMenus(), this.container = $("<div>无</div>"), this.td.append(this.container), this.td.click(function () {
                    window._currentConditionCell = e
                });
                var n = {
                    menuItems: [{
                        label: "配置条件", icon: "glyphicon glyphicon-cog", onClick: function () {
                            e.configCondition(e.container)
                        }
                    }, {
                        label: "添加条件行", icon: "glyphicon glyphicon-plus-sign", onClick: function () {
                            e.insertRow(t.complexTable)
                        }
                    }, {
                        label: "删除条件行", icon: "glyphicon glyphicon-minus-sign", onClick: function () {
                            a.MsgBox.confirm("真的要当前删除条件行？", function () {
                                e.deleteRow(t.complexTable)
                            })
                        }
                    }, {
                        label: "清空条件", icon: "glyphicon glyphicon-trash", onClick: function () {
                            a.MsgBox.confirm("真的要清空当前单元格内容？", function () {
                                e.cellCondition && (e.cellCondition.clean(), e.container.html("无"), e.container.css("color", "gray")), window._setDirty()
                            })
                        }
                    }, {
                        label: "复制", icon: "glyphicon glyphicon-copy", onClick: function () {
                            var t = e.toXml();
                            t && "" !== t ? (0, s.copyCellData)("condition", t) : bootbox.alert("当前没有内容可供复制!")
                        }
                    }, {
                        label: "粘贴", icon: "glyphicon glyphicon-paste", onClick: function (t) {
                            (0, s.pasteCellData)("condition", function (t) {
                                e.cellCondition && e.cellCondition.clean(), e.cellCondition = new urule.CellCondition("<div/>"), e.cellCondition.initData(t), e.container.empty(), e.container.append(e.cellCondition.getDisplayContainer())
                            })
                        }
                    }]
                }, r = new URule.menu.Menu(n);
                this.td.contextmenu(function (t) {
                    r.show(t)
                })
            }
        }, {
            key: "initData", value: function (t) {
                t.joint && (this.cellCondition = new urule.CellCondition("<div/>"), this.cellCondition.initData(t.joint), this.container.empty(), this.container.append(this.cellCondition.getDisplayContainer())), t.variableLabel && (this.variableLabel = t.variableLabel, this.variableName = t.variableName, this.datatype = t.datatype, URule.setDomContent(this.propContainer, this.variableLabel || this.variableName), this.propContainer.css("color", "#1d1d1d"))
            }
        }, {
            key: "refreshVariableMenus", value: function () {
                var t = this.conditionCol.variables || [], e = this.buildClickFunction(), n = [], r = !0, i = !1,
                    o = void 0;
                try {
                    for (var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done); r = !0) {
                        var c = a.value;
                        n.push({
                            icon: "glyphicon glyphicon-tasks",
                            name: c.name,
                            label: c.label,
                            datatype: c.type,
                            onClick: e
                        })
                    }
                } catch (t) {
                    i = !0, o = t
                } finally {
                    try {
                        !r && s.return && s.return()
                    } finally {
                        if (i) throw o
                    }
                }
                var f = this;
                this.propContainer.menu ? this.propContainer.menu.setConfig({menuItems: n}) : (this.propContainer.menu = new URule.menu.Menu({menuItems: n}), this.propContainer.click(function (t) {
                    f.propContainer.menu.show(t)
                }))
            }
        }, {
            key: "buildClickFunction", value: function () {
                var t = this;
                return function (e) {
                    t.variableLabel = e.label, t.variableName = e.name, t.datatype = e.datatype, t.propContainer.html(t.variableLabel), t.propContainer.css("color", "#1d1d1d")
                }
            }
        }, {
            key: "configCondition", value: function (t) {
                var e = $("<div/>");
                this.cellCondition || (this.cellCondition = new urule.CellCondition("<div/>"));
                var n = this;
                this.cellCondition.renderTo(e), a.MsgBox.showDialog("配置条件", e, [], [{
                    name: "hide.bs.modal",
                    callback: function () {
                        t.empty(), t.append(n.cellCondition.getDisplayContainer())
                    }
                }], !0)
            }
        }, {
            key: "increaseRowSpan", value: function () {
                var t = this.td.prop("rowspan");
                t || (t = 1), t++, this.rowSpan = t, this.td.prop("rowspan", t)
            }
        }, {
            key: "insertRow", value: function (t) {
                var e = new o.default(t);
                e.setRefConditionCell(this), t.addRow(e)
            }
        }, {
            key: "deleteRow", value: function (t) {
                var e = this.td.prop("rowspan"), n = e;
                if (e !== t.contentRows.length) {
                    e || (e = 1);
                    for (var r = new o.default(t), i = t.contentRows.indexOf(this.contentRow), a = i + e, s = i; s < a; s++) {
                        for (var c = t.contentRows[s], f = t.conditionColumns.length - 1; f >= 0; f--) {
                            var u = t.conditionColumns[f], l = r._findConditionCell(c, u);
                            if (l) {
                                var h = l.td.prop("rowspan");
                                if (h > 1 && h > n) {
                                    h--, l.td.prop("rowspan", h);
                                    var d = t.conditionColumns[f + 1], p = this._findNextRowCellInfo(s + 1, t, d),
                                        b = p.targetRow;
                                    l.contentRow = b;
                                    var g = p.targetCell, y = p.targetRowConditionCellIndex;
                                    g.td.before(l.td), b.conditionCells.splice(y, 0, l)
                                }
                            } else {
                                var m = r.fetchConditionCell(c, u), v = m.td.prop("rowspan");
                                v--, m.td.prop("rowspan", v)
                            }
                        }
                        c.tr.remove()
                    }
                    t.contentRows.splice(i, e)
                } else bootbox.alert("条件行至少要保留一行!")
            }
        }, {
            key: "_findNextRowCellInfo", value: function (t, e, n) {
                for (var r = null, i = null, o = -1, a = t; a < e.contentRows.length; a++) {
                    o = -1;
                    var s = e.contentRows[a], c = !0, f = !1, u = void 0;
                    try {
                        for (var l, h = s.conditionCells[Symbol.iterator](); !(c = (l = h.next()).done); c = !0) {
                            var d = l.value;
                            if (d.conditionCol === n) {
                                r = d, i = s, o++;
                                break
                            }
                        }
                    } catch (t) {
                        f = !0, u = t
                    } finally {
                        try {
                            !c && h.return && h.return()
                        } finally {
                            if (f) throw u
                        }
                    }
                    if (r) break
                }
                return {targetCell: r, targetRow: i, targetRowConditionCellIndex: o}
            }
        }, {
            key: "toXml", value: function () {
                return this.cellCondition ? this.cellCondition.toXml() : ""
            }
        }]), e
    }();
    e.default = f
}