var func350 = function (t, e, n) {
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
    }(), i = s(n(320)), o = s(n(349)), a = s(n(348));

    function s(t) {
        return t && t.__esModule ? t : {default: t}
    }

    var c = function (t) {
        function e(t) {
            !function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var n = function (t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
            return n.id = t.complexTable.nextId(), n.conditionCells = [], n.actionCells = [], n.init(t), n
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
                this.tr = $("<tr></tr>"), this.initNewConditionCell(t), this.initNewActionCell(t)
            }
        }, {
            key: "initNewConditionCell", value: function (t) {
                var e = t.complexTable, n = t.refConditionCell;
                if (n) for (var r = n.contentRow, i = n.conditionCol, a = e.conditionColumns.indexOf(i), s = 0; s < e.conditionColumns.length; s++) {
                    var c = e.conditionColumns[s];
                    if (s < a) t.fetchConditionCell(r, c).increaseRowSpan(); else {
                        var f = new o.default(t, this, c);
                        this.conditionCells.push(f), this.tr.append(f.td)
                    }
                } else {
                    var u = t.rowCells, l = 0, h = !0, d = !1, p = void 0;
                    try {
                        for (var b, g = e.conditionColumns[Symbol.iterator](); !(h = (b = g.next()).done); h = !0) {
                            var y = b.value;
                            if (u) {
                                var m = this.findCell(u, l);
                                if (m) {
                                    var v = new o.default(t, this, y);
                                    this.conditionCells.push(v), this.tr.append(v.td), v.initData(m);
                                    var A = m.rowspan;
                                    v.td.prop("rowspan", A)
                                }
                            } else {
                                var w = new o.default(t, this, y);
                                this.conditionCells.push(w), this.tr.append(w.td)
                            }
                            l++
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
                }
            }
        }, {
            key: "findCell", value: function (t, e) {
                var n = void 0, r = !0, i = !1, o = void 0;
                try {
                    for (var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done); r = !0) {
                        var c = a.value;
                        if (c.col === e) {
                            n = c;
                            break
                        }
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
                return n
            }
        }, {
            key: "initNewActionCell", value: function (t) {
                var e = t.rowCells, n = t.complexTable, r = n.conditionColumns.length, i = !0, o = !1, s = void 0;
                try {
                    for (var c, f = n.actionColumns[Symbol.iterator](); !(i = (c = f.next()).done); i = !0) {
                        var u = c.value, l = new a.default(t, this, u);
                        if (this.actionCells.push(l), this.tr.append(l.td), e) {
                            var h = this.findCell(e, r);
                            h && l.initData(h)
                        }
                        r++
                    }
                } catch (t) {
                    o = !0, s = t
                } finally {
                    try {
                        !i && f.return && f.return()
                    } finally {
                        if (o) throw s
                    }
                }
            }
        }, {
            key: "addNewConditionCell", value: function (t, e) {
                if (!t.before && t.refHeaderCellIndex === t.complexTable.headerRow.conditionHeaders.length - 1) {
                    var n = new o.default(t, this, e), r = this.conditionCells.length;
                    return 0 === r ? this.tr.children(":first-child").before(n.td) : this.conditionCells[r - 1].td.after(n.td), void this.conditionCells.push(n)
                }
                for (var i = t.refHeaderCell.conditionCol, a = null, s = -1, c = 0; c < this.conditionCells.length; c++) {
                    var f = this.conditionCells[c];
                    if (f.conditionCol === i) {
                        a = f, s = c;
                        break
                    }
                }
                if (a) {
                    var u = new o.default(t, this, e), l = a.td.prop("rowspan");
                    l && u.td.prop("rowspan", l), t.before ? (a.td.before(u.td), this.conditionCells.splice(s, 0, u)) : (a.td.after(u.td), this.conditionCells.splice(s + 1, 0, u))
                }
            }
        }, {
            key: "addNewActionCell", value: function (t, e) {
                var n = t.complexTable, r = t.refHeaderCell, i = new a.default(t, this, e),
                    o = n.headerRow.actionHeaders.indexOf(r), s = this.actionCells[o];
                t.before ? (s.td.before(i.td), 0 === o && this.actionCells[0].td.css("border-left", "inherit"), this.actionCells.splice(o, 0, i)) : (s.td.after(i.td), this.actionCells.splice(o + 1, 0, i))
            }
        }]), e
    }();
    e.default = c
}