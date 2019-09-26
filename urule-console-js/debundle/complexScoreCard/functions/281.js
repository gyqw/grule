var func281 = function (t, e, n) {
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
    }(), i = function () {
        function t(e) {
            !function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.complexTable = e, this.actionType = 0
        }

        return r(t, [{
            key: "fetchConditionCell", value: function (t, e) {
                var n = this._findConditionCell(t, e);
                if (n) return n;
                for (var r = this.complexTable.contentRows, i = r.indexOf(t) - 1; i >= 0; i--) {
                    var o = r[i];
                    if (n = this._findConditionCell(o, e)) break
                }
                return n
            }
        }, {
            key: "_findConditionCell", value: function (t, e) {
                var n = null, r = t.conditionCells, i = !0, o = !1, a = void 0;
                try {
                    for (var s, c = r[Symbol.iterator](); !(i = (s = c.next()).done); i = !0) {
                        var f = s.value;
                        if (f.conditionCol === e) {
                            n = f;
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
                return n
            }
        }, {
            key: "fetchActionCell", value: function (t, e) {
                var n = this._findActionCell(t, e);
                if (n) return n;
                for (var r = this.complexTable.contentRows, i = r.indexOf(t) - 1; i >= 0; i--) {
                    var o = r[i];
                    if (n = this._findActionCell(o, e)) break
                }
                return n
            }
        }, {
            key: "_findActionCell", value: function (t, e) {
                var n = null, r = t.actionCells, i = !0, o = !1, a = void 0;
                try {
                    for (var s, c = r[Symbol.iterator](); !(i = (s = c.next()).done); i = !0) {
                        var f = s.value;
                        if (f.contentRow === t && f.actionCol === e) {
                            n = f;
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
                return n
            }
        }, {
            key: "setRefHeaderCell", value: function (t) {
                this.refHeaderCell = t, this.refHeaderCellIndex = this.complexTable.headerRow.conditionHeaders.indexOf(t), -1 === this.refHeaderCellIndex && (this.refHeaderCellIndex = this.complexTable.headerRow.actionHeaders.indexOf(t))
            }
        }, {
            key: "setBefore", value: function (t) {
                this.before = t
            }
        }, {
            key: "setRefConditionCell", value: function (t) {
                this.refConditionCell = t
            }
        }, {
            key: "setActionType", value: function (t) {
                this.actionType = t
            }
        }, {
            key: "setRowCells", value: function (t) {
                this.rowCells = t
            }
        }, {
            key: "setWidth", value: function (t) {
                this.width = t
            }
        }, {
            key: "setCustomActionHeaderLabel", value: function (t) {
                this.customActionHeaderLabel = t
            }
        }]), t
    }();
    e.default = i
}