var func348 = function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0});
    var r, i = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(), o = (r = n(317)) && r.__esModule ? r : {default: r}, a = n(27), s = n(16), c = function (t) {
        function e(t, n, r) {
            !function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var i = function (t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
            return i.contentRow = n, i.actionCol = r, i.init(), i
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
        }(e, o.default), i(e, [{
            key: "init", value: function () {
                this.container = $('<div style="position: relative;"></div>'), this.td.append(this.container), this.td.click(function (t) {
                    window._currentConditionCell = null
                }), this.inputType = new urule.InputType(null, "无"), this.container.append(this.inputType.getContainer());
                var t = this, e = {
                    menuItems: [{
                        label: "清空", icon: "glyphicon glyphicon-trash", onClick: function () {
                            a.MsgBox.confirm("真的要清空当前单元格内容吗？", function () {
                                t.inputType.getContainer().remove(), t.inputType = new urule.InputType(null, "无"), t.container.append(t.inputType.getContainer()), window._setDirty()
                            })
                        }
                    }, {
                        label: "复制", icon: "glyphicon glyphicon-copy", onClick: function () {
                            var e = t.toXml();
                            e && "" !== e ? (0, s.copyCellData)("value", e) : bootbox.alert("当前没有内容可供复制!")
                        }
                    }, {
                        label: "粘贴", icon: "glyphicon glyphicon-paste", onClick: function () {
                            (0, s.pasteCellData)("value", function (e) {
                                t.inputType.getContainer().remove(), t.inputType = new urule.InputType(null, "无"), t.container.append(t.inputType.getContainer()), t.inputType.setValueType(e.valueType, e)
                            })
                        }
                    }]
                }, n = new URule.menu.Menu(e);
                this.td.contextmenu(function (t) {
                    n.show(t)
                })
            }
        }, {
            key: "toXml", value: function () {
                return this.inputType.toXml()
            }
        }, {
            key: "initData", value: function (t) {
                if (t && t.value) {
                    var e = t.value;
                    this.inputType.setValueType(e.valueType, e)
                }
            }
        }]), e
    }();
    e.default = c
}