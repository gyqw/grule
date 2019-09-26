var func347 = function (t, e, n) {
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
            }(this, t), this.complexTable = e.complexTable, this.id = e.complexTable.nextId(), this.init(e)
        }

        return r(t, [{
            key: "init", value: function (t) {
                var e = t.complexTable, n = !0, r = !1, i = void 0;
                try {
                    for (var o, a = e.contentRows[Symbol.iterator](); !(n = (o = a.next()).done); n = !0) o.value.addNewConditionCell(t, this)
                } catch (t) {
                    r = !0, i = t
                } finally {
                    try {
                        !n && a.return && a.return()
                    } finally {
                        if (r) throw i
                    }
                }
                e.headerRow.addConditionHeader(t, this)
            }
        }, {
            key: "refreshConditionCellVariableMenus", value: function () {
                var t = this.complexTable.contentRows, e = !0, n = !1, r = void 0;
                try {
                    for (var i, o = t[Symbol.iterator](); !(e = (i = o.next()).done); e = !0) {
                        var a = i.value, s = !0, c = !1, f = void 0;
                        try {
                            for (var u, l = a.conditionCells[Symbol.iterator](); !(s = (u = l.next()).done); s = !0) {
                                var h = u.value;
                                h.conditionCol === this && h.refreshVariableMenus()
                            }
                        } catch (t) {
                            c = !0, f = t
                        } finally {
                            try {
                                !s && l.return && l.return()
                            } finally {
                                if (c) throw f
                            }
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
        }]), t
    }();
    e.default = i
}