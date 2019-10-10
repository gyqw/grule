var func354 = function (t, e, n) {
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
        }(),


        i = d(n(353)), o = d(n(350)), a = d(n(347)), s = d(n(346)), c = d(n(281)), f = n(16), u = n(88), l = n(27),
        h = d(n(291));

    function d(t) {
        return t && t.__esModule ? t : {default: t}
    }

    var p = function () {
        function t(e) {
            !function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t),
                this.id = 0, this.conditionColumns = [], this.actionColumns = [], this.contentRows = [], this.properties = [], this.cells = [], this.init(e)
        }

        return r(t, [{
            key: "init", value: function (t) {
                var e = this;
                t.append('<nav class="navbar navbar-default" style="margin: 5px">\n\t\t\t<div>\n\t\t\t\t<div>\n\t\t\t\t\t<div class="btn-group btn-group-sm navbar-btn" style="margin-top:5px;margin-bottom: 0px;margin-left: 5px" >\n\t\t\t\t\t<button id="saveButton" type="button" class="btn btn-default btn-sm" ><i class="rf rf-save" style="font-size: 14px"></i> 保存</button>\n\t\t\t\t\t\t\t\t<button id="saveButtonNewVersion" type="button" class="btn btn-default btn-sm" ><i class="rf rf-savenewversion" style="font-size: 14px"></i> 保存新版本</button>\n\t\t\t\t\t\t\t\n\t\t\t\t\t<div class="btn-group btn-group-sm navbar-btn" style="margin-top:3px;margin-bottom: 0px;margin-left: 5px" >\n\t\t\t\t\t <button id="addCriteriaButton" type="button" class="btn btn-default btn-sm"><i class="glyphicon glyphicon-plus" style="font-size: 16px"></i> 添加条件行</button>\n\t\t\t\t\t <button id="deleteCriteriaButton" type="button" class="btn btn-default btn-sm"><i class="glyphicon glyphicon-minus" style="font-size: 16px"></i> 删除条件行</button>\n\t\t\t\t\t </div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="btn-group btn-group-sm navbar-btn" style="margin-top:5px;margin-bottom: 0px">\n\t\t\t\t\t\t<button id="configVarButton" type="button" class="btn btn-default btn-sm"><i class="rf rf-variable" style="font-size: 13px"></i> 变量库</button>\n\t\t\t\t\t\t<button id="configConstantsButton" type="button" class="btn btn-default btn-sm"><i class="rf rf-constant" style="font-size: 13px"></i> 常量库</button>\n\t\t\t\t\t\t<button id="configActionButton" type="button" class="btn btn-default btn-sm"><i class="rf rf-action" style="font-size: 13px"></i> 动作库</button>\n\t\t\t\t\t\t<button id="configParameterButton" type="button" class="btn btn-default btn-sm"><i class="rf rf-parameter" style="font-size: 13px"></i> 参数库</button>\n\t\t\t\t\t</div>\n\t\t        </div>\n\t\t\t</div>\n\t\t</nav>');
                var n = $("<div style='margin:5px 5px 5px 15px'></div>");
                t.append(n), this.remark = new Remark(n);
                var r = $("<div style='margin:5px 5px 5px 15px;'></div>");
                t.append(r), this.propertyContainer = $("<span>"), this.propertyContainer.css({padding: "10px"});
                var o = $("<button type='button' class='rule-add-property btn btn-link'>添加属性</button>");
                r.append(o), r.append(this.propertyContainer);
                var a = function (t) {
                    var n = new urule.RuleProperty(e, t.name, t.defaultValue, t.editorType);
                    e.propertyContainer.append(n.getContainer()), e.properties.push(n), window._setDirty()
                };

                function s(t) {
                    if ($("#saveButton").hasClass("disabled")) return !1;
                    var n = (0, f.getParameter)("file"), r = null;
                    try {
                        r = e.toXml()
                    } catch (t) {
                        return void bootbox.alert(t)
                    }
                    var i = {content: r = encodeURIComponent(r), file: n, newVersion: t},
                        o = window._server + "/common/saveFile";
                    t ? bootbox.prompt("请输入新版本描述.", function (t) {
                        t && (i.versionComment = t, (0, f.ajaxSave)(o, i, function () {
                            e.resetState()
                        }))
                    }) : (0, f.ajaxSave)(o, i, function () {
                        e.resetState()
                    })
                }

                if (e.menu = new URule.menu.Menu({
                    menuItems: [{
                        label: "优先级",
                        name: "salience",
                        defaultValue: "10",
                        editorType: 1,
                        onClick: a
                    }, {
                        label: "生效日期",
                        name: "effective-date",
                        defaultValue: "",
                        editorType: 2,
                        onClick: a
                    }, {
                        label: "失效日期",
                        name: "expires-date",
                        defaultValue: "",
                        editorType: 2,
                        onClick: a
                    }, {
                        label: "是否启用",
                        name: "enabled",
                        defaultValue: !0,
                        editorType: 3,
                        onClick: a
                    }, {label: "允许调试信息输出", name: "debug", defaultValue: !0, editorType: 3, onClick: a}]
                }), o.click(function (t) {
                    e.menu.show(t)
                }), $("#addCriteriaButton").click(function () {
                    var t = new c.default(e);
                    t.setRefConditionCell(window._currentConditionCell), e.addRow(t)
                }), $("#deleteCriteriaButton").click(function () {
                    window._currentConditionCell || bootbox.alert("请先选中目标行的一个条件单元格"), l.MsgBox.confirm("真的要删除当前单元格所在的所有行？", function () {
                        window._currentConditionCell.deleteRow(e), window._currentConditionCell = null
                    })
                }), $("#configVarButton").click(function () {
                    e.configVarDialog || (e.configVarDialog = new urule.ConfigVariableDialog(e)), e.configVarDialog.open()
                }), $("#configConstantsButton").click(function () {
                    e.configConstantDialog || (e.configConstantDialog = new urule.ConfigConstantDialog(e)), e.configConstantDialog.open()
                }), $("#configActionButton").click(function () {
                    e.configActionDialog || (e.configActionDialog = new urule.ConfigActionDialog(e)), e.configActionDialog.open()
                }), $("#configParameterButton").click(function () {
                    e.configParameterDialog || (e.configParameterDialog = new urule.ConfigParameterDialog(e)), e.configParameterDialog.open()
                }), $("#saveButton").click(function () {
                    s(!1)
                }), $("#saveButtonNewVersion").click(function () {
                    s(!0)
                }), 1 === Math.floor(10 * Math.random())) {
                    var d = "您当前正在使用的", p = window._core_version;
                    p ? (p = (0, u.encrypt)(p)) !== window._lis_ && (d += "是URule Pro试用版", bootbox.alert(unescape(d))) : (d += "是URule Pro试用版", bootbox.alert(unescape(d)))
                }
                this.table = $('<table class="table table-bordered" style="width: max-content;max-width: none;margin-left: 15px"/>'), t.append(this.table), this.tbody = $("<tbody></tbody>"), this.table.append(this.tbody), this.headerRow = new i.default(this), this.table.append(this.headerRow.tr), new c.default(this), this.loadFile(this._buildLoadDataFunction());
                var b = $('<div style="padding-left:10px"></div>');
                t.append(b), this.tableAction = new h.default(b, !0)
            }
        }, {
            key: "resetState", value: function () {
                window.cancelDirty()
            }
        }, {
            key: "_buildLoadDataFunction", value: function () {
                var t = this, e = new c.default(this);
                return function (n) {
                    t.tableAction.initData(n);
                    var r = !0, i = !1, o = void 0;
                    try {
                        for (var a, s = n.columns[Symbol.iterator](); !(r = (a = s.next()).done); r = !0) {
                            var c = a.value, f = c.type;
                            if (e.setWidth(c.width), "Criteria" === f) {
                                var u = t.addConditionColumn(e);
                                t._findHeaderCell(u, !1).updateLabel(c)
                            } else "Score" === f ? (e.setActionType(1), t.addActionColumn(e)) : "Custom" === f && (e.setActionType(2), e.setCustomActionHeaderLabel(c.customLabel), t.addActionColumn(e))
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
                    var l = 0, h = !0, d = !1, p = void 0;
                    try {
                        for (var b, g = n.rows[Symbol.iterator](); !(h = (b = g.next()).done); h = !0) {
                            b.value;
                            var y = t._findRowCells(l, n.cellMap);
                            e.setRowCells(y), t.addRow(e), l++
                        }
                    } catch (t) {
                        d = !0, p = t
                    } finally {
                        try {
                            !h && g.return && g.return()
                        } finally {
                            if (d) throw p
                        }
                    }
                    window._VariableValueArray.push(t), window._ParameterValueArray.push(t), window.cancelDirty()
                }
            }
        }, {
            key: "initMenu", value: function (t) {
                var e = !0, n = !1, r = void 0;
                try {
                    for (var i, o = this.conditionColumns[Symbol.iterator](); !(e = (i = o.next()).done); e = !0) {
                        var a = i.value;
                        if (!a.variables) {
                            var s = a.variableCategory;
                            a.variables = this._findVariables(s), a.refreshConditionCellVariableMenus()
                        }
                    }
                } catch (t) {
                    n = !0, r = t
                } finally {
                    try {
                        !e && o.return && o.return()
                    } finally {
                        if (n) throw r
                    }
                }
            }
        }, {
            key: "_findVariables", value: function (t) {
                if ("参数" === t) {
                    var e = [], n = !0, r = !1, i = void 0;
                    try {
                        for (var o, a = window._uruleEditorParameterLibraries[Symbol.iterator](); !(n = (o = a.next()).done); n = !0) {
                            var s = o.value;
                            e = e.concat(s)
                        }
                    } catch (t) {
                        r = !0, i = t
                    } finally {
                        try {
                            !n && a.return && a.return()
                        } finally {
                            if (r) throw i
                        }
                    }
                    return e
                }
                if (window._uruleEditorVariableLibraries) {
                    var c = !0, f = !1, u = void 0;
                    try {
                        for (var l, h = window._uruleEditorVariableLibraries[Symbol.iterator](); !(c = (l = h.next()).done); c = !0) {
                            var d = l.value, p = !0, b = !1, g = void 0;
                            try {
                                for (var y, m = d[Symbol.iterator](); !(p = (y = m.next()).done); p = !0) {
                                    var v = y.value;
                                    if (v.name === t) return v.variables
                                }
                            } catch (t) {
                                b = !0, g = t
                            } finally {
                                try {
                                    !p && m.return && m.return()
                                } finally {
                                    if (b) throw g
                                }
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
                }
            }
        }, {
            key: "_findHeaderCell", value: function (t, e) {
                var n = this.headerRow.conditionHeaders;
                e && (n = this.headerRow.actionHeaders);
                var r = null, i = !0, o = !1, a = void 0;
                try {
                    for (var s, c = n[Symbol.iterator](); !(i = (s = c.next()).done); i = !0) {
                        var f = s.value;
                        if (e) {
                            if (f.actionCol === t) {
                                r = f;
                                break
                            }
                        } else if (f.conditionCol === t) {
                            r = f;
                            break
                        }
                    }
                } catch (t) {
                    o = !0, a = t
                } finally {
                    try {
                        !i && c.return && c.return()
                    } finally {
                        if (o) throw a
                    }
                }
                return r
            }
        }, {
            key: "_findRowCells", value: function (t, e) {
                var n = [];
                for (var r in e) {
                    var i = e[r];
                    i.row === t && n.push(i)
                }
                return n
            }
        }, {
            key: "loadFile", value: function (t) {
                var e = this, n = (0, f.getParameter)("file"),
                    r = ((0, f.getParameter)("version"), window._server + "/common/loadXml"),
                    i = (0, f.getParameter)("doImport");
                i && i.length > 1 && (r += "?doImport=true"), $.ajax({
                    url: r,
                    type: "POST",
                    data: {files: n},
                    error: function (t) {
                        $(window.document.body).empty(), (0, f.handleError)(t)
                    },
                    success: function (n) {
                        var r = n[0];
                        e.remark.setData(r.remark);
                        var i = r.salience;
                        i && e.addProperty(new urule.RuleProperty(e, "salience", i, 1));
                        var o = r.loop;
                        null != o && e.addProperty(new urule.RuleProperty(e, "loop", o, 3));
                        var a = r.effectiveDate;
                        a && e.addProperty(new urule.RuleProperty(e, "effective-date", a, 2));
                        var s = r.expiresDate;
                        s && e.addProperty(new urule.RuleProperty(e, "expires-date", s, 2));
                        var c = r.enabled;
                        null != c && e.addProperty(new urule.RuleProperty(e, "enabled", c, 3));
                        var f = r.debug;
                        null != f && e.addProperty(new urule.RuleProperty(e, "debug", f, 3));
                        var u = r.libraries || [];
                        $.each(u, function (t, e) {
                            var n, r;
                            switch (n = e.type, r = e.path, n) {
                                case"Constant":
                                    constantLibraries.push(r);
                                    break;
                                case"Action":
                                    actionLibraries.push(r);
                                    break;
                                case"Variable":
                                    variableLibraries.push(r);
                                    break;
                                case"Parameter":
                                    parameterLibraries.push(r)
                            }
                        }), refreshActionLibraries(), refreshConstantLibraries(), refreshVariableLibraries(), refreshParameterLibraries(), refreshFunctionLibraries(), t && t(r)
                    }
                })
            }
        }, {
            key: "addProperty", value: function (t) {
                this.propertyContainer.append(t.getContainer()), this.properties.push(t), window._setDirty()
            }
        }, {
            key: "addRow", value: function (t) {
                var e = new o.default(t), n = t.refConditionCell;
                if (n) {
                    var r = n.contentRow, i = this.contentRows.indexOf(r), a = n.td.prop("rowspan");
                    a && (i = i + a - 1), (r = this.contentRows[i]).tr.after(e.tr), this.contentRows.splice(i + 1, 0, e)
                } else this.tbody.append(e.tr), this.contentRows.push(e);
                this.rebuildBorder(), window._setDirty()
            }
        }, {
            key: "addConditionColumn", value: function (t) {
                var e = new a.default(t);
                if (t.refHeaderCell) {
                    var n = t.refHeaderCellIndex;
                    t.before ? this.conditionColumns.splice(n, 0, e) : this.conditionColumns.splice(n + 1, 0, e)
                } else this.conditionColumns.push(e);
                return this.rebuildBorder(), e
            }
        }, {
            key: "addActionColumn", value: function (t) {
                var e = new s.default(t);
                if (t.refHeaderCell) {
                    var n = t.refHeaderCellIndex;
                    t.before ? this.actionColumns.splice(n, 0, e) : this.actionColumns.splice(n + 1, 0, e)
                } else this.actionColumns.push(e);
                return this.rebuildBorder(), e
            }
        }, {
            key: "rebuildBorder", value: function () {
                if (0 != this.headerRow.actionHeaders.length) {
                    this.headerRow.actionHeaders[0].td.css("border-left", "solid 3px #9d9d9d");
                    var t = !0, e = !1, n = void 0;
                    try {
                        for (var r, i = this.contentRows[Symbol.iterator](); !(t = (r = i.next()).done); t = !0) r.value.actionCells[0].td.css("border-left", "solid 3px #9d9d9d")
                    } catch (t) {
                        e = !0, n = t
                    } finally {
                        try {
                            !t && i.return && i.return()
                        } finally {
                            if (e) throw n
                        }
                    }
                }
            }
        }, {
            key: "getHighlightDiv", value: function () {
                if (this.highlightDiv) {
                    var t = this.highlightDiv.currentTD;
                    t && t.off("DOMSubtreeModified")
                } else this.highlightDiv = $('<div style="border:2px solid rgb(82, 146, 247);position:absolute;left: 0;top: 0;"></div>');
                return this.highlightDiv
            }
        }, {
            key: "nextId", value: function () {
                return this.id++
            }
        }, {
            key: "toXml", value: function () {
                var t = '<?xml version="1.0" encoding="UTF-8"?>';
                t += "<complex-scorecard " + this.tableAction.toXml();
                for (var e = 0; e < this.properties.length; e++) {
                    var n = this.properties[e];
                    t += " " + n.toXml()
                }
                t += ">", t += this.remark.toXml();
                var r = this._buildLibraries(), i = !0, o = !1, a = void 0;
                try {
                    for (var s, c = r[Symbol.iterator](); !(i = (s = c.next()).done); i = !0) {
                        var f = s.value, u = f.type, l = f.path;
                        "Variable" == u ? t += '<import-variable-library path="' + l + '"/>' : "Constant" == u ? t += '<import-constant-library path="' + l + '"/>' : "Action" == u ? t += '<import-action-library path="' + l + '"/>' : "Parameter" == u && (t += '<import-parameter-library path="' + l + '"/>')
                    }
                } catch (t) {
                    o = !0, a = t
                } finally {
                    try {
                        !i && c.return && c.return()
                    } finally {
                        if (o) throw a
                    }
                }
                var h = [];
                $.each(this.contentRows, function (e, n) {
                    n.num = e, t += '<row num="' + n.num + '" height="30"/>', h = (h = h.concat(n.conditionCells)).concat(n.actionCells)
                }), $.each(this.conditionColumns, function (e, n) {
                    if (n.num = e, !n.variableCategory) throw"第[" + (n.num + 1) + "]条件列未定义具体变量或参数！";
                    t += '<col num="' + n.num + '" width="' + n.width + '" type="Criteria" var-category="' + ("parameter" == n.variableCategory ? "参数" : n.variableCategory) + '"/>'
                });
                var d = this.conditionColumns.length;
                return $.each(this.actionColumns, function (e, n) {
                    n.num = d + e;
                    var r = n.variableName, i = n.actionType, o = "Criteria";
                    1 === i ? o = "Score" : 2 === i && (o = "Custom"), t += r ? '<col num="' + n.num + '" width="' + n.width + '" type="' + o + '" var-category="' + ("parameter" == n.variableCategory ? "参数" : n.variableCategory) + '"/>' : 2 === i ? '<col num="' + n.num + '" width="' + n.width + '" type="' + o + '" custom-label="' + n.actionHeaderCell.customLabel + '"/>' : '<col num="' + n.num + '" width="' + n.width + '" type="' + o + '"/>'
                }), $.each(h, function (e, n) {
                    var r = n.td.prop("rowspan");
                    if (n.conditionCol) {
                        if (!n.variableLabel) throw"请选择条件条件格[" + (n.contentRow.num + 1) + "," + (n.conditionCol.num + 1) + "]对应的对象属性！";
                        t += '<cell row="' + n.contentRow.num + '" col="' + n.conditionCol.num + '" rowspan="' + r + '" var-label="' + n.variableLabel + '" var="' + n.variableName + '" datatype="' + n.datatype + '">'
                    } else t += '<cell row="' + n.contentRow.num + '" col="' + n.actionCol.num + '" rowspan="' + r + '">';
                    t += n.toXml(), t += "</cell>"
                }), t += "</complex-scorecard>"
            }
        }, {
            key: "_buildLibraries", value: function () {
                var t = [];
                return $.each(constantLibraries, function (e, n) {
                    t.push({type: "Constant", path: n})
                }), $.each(actionLibraries, function (e, n) {
                    t.push({type: "Action", path: n})
                }), $.each(variableLibraries, function (e, n) {
                    t.push({type: "Variable", path: n})
                }), $.each(parameterLibraries, function (e, n) {
                    t.push({type: "Parameter", path: n})
                }), t
            }
        }]), t
    }();
    e.default = p
};