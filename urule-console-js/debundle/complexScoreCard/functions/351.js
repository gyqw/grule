var func351 = function (t, e, n) {
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
    }(), i = s(n(319)), o = s(n(281)), a = n(27);

    function s(t) {
        return t && t.__esModule ? t : {default: t}
    }

    var c = function (t) {
        function e(t, n, r) {
            !function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var i = function (t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
            return i.complexTable = t, i.actionCol = r, r.actionHeaderCell = i, i.actionCol.width = 150, i.variableCategoryList = [], i.parameterList = [], i.init(t, n), i
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
            key: "init", value: function (t, e) {
                this.td.css("width", "150px");
                var n = $("<div></div>");
                this.td.append(n), this.actionType = e, 1 === e ? (n.append("<span></span>"), this.labelContainer = $('<span><span style="color: #ff7734;"><strong>分值</strong></span></span>'), n.append(this.labelContainer)) : 2 === e && (this.labelContainer = $('<span style="color: #31708f;"></span>'), n.append(this.labelContainer)), this.buildMenu()
            }
        }, {
            key: "insertActionColumn", value: function (t, e) {
                var n = this;
                bootbox.prompt("请输入自定义列名称：", function (r) {
                    if (r) {
                        var i = new o.default(t);
                        i.setCustomActionHeaderLabel(r), i.setActionType(e), i.setRefHeaderCell(n), t.addActionColumn(i), window._setDirty()
                    } else bootbox.alert("自定义列名不能为空！")
                })
            }
        }, {
            key: "deleteColumn", value: function (t) {
                var e = t.headerRow.actionHeaders.indexOf(this);
                t.headerRow.actionHeaders.splice(e, 1), this.td.remove();
                var n = !0, r = !1, i = void 0;
                try {
                    for (var o, a = t.contentRows[Symbol.iterator](); !(n = (o = a.next()).done); n = !0) {
                        var s = o.value, c = s.actionCells[e];
                        s.actionCells.splice(e, 1), c.td.remove()
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
                e = t.actionColumns.indexOf(this.actionCol), t.actionColumns.splice(e, 1), 0 === e && t.rebuildBorder(), window._setDirty()
            }
        }, {
            key: "updateLabel", value: function (t) {
                t ? (this.customLabel = t, this.labelContainer.html(t)) : this.labelContainer.html("")
            }
        }, {
            key: "buildMenu", value: function () {
                var t = this, e = this.complexTable, n = {
                    menuItems: [{
                        label: "插入自定义列", icon: "glyphicon glyphicon-tasks", onClick: function () {
                            t.insertActionColumn(e, 2)
                        }
                    }]
                };
                2 === this.actionType && n.menuItems.push({
                    label: "删除当前自定义列",
                    icon: "glyphicon glyphicon-minus-sign",
                    onClick: function () {
                        a.MsgBox.confirm("真的要删除当前列？", function () {
                            t.deleteColumn(e)
                        })
                    }
                });
                var r = new URule.menu.Menu(n);
                this.td.contextmenu(function (t) {
                    r.show(t)
                })
            }
        }]), e
    }();
    e.default = c
}