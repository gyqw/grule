var func346 = function (t, e, n) {
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
            }(this, t), this.actionType = e.actionType, this.id = e.complexTable.nextId(), this.init(e)
        }

        return r(t, [{
            key: "init", value: function (t) {
                var e = t.complexTable, n = !0, r = !1, i = void 0;
                try {
                    for (var o, a = e.contentRows[Symbol.iterator](); !(n = (o = a.next()).done); n = !0) o.value.addNewActionCell(t, this)
                } catch (t) {
                    r = !0, i = t
                } finally {
                    try {
                        !n && a.return && a.return()
                    } finally {
                        if (r) throw i
                    }
                }
                e.headerRow.addActionHeader(t, this)
            }
        }]), t
    }();
    e.default = i
}