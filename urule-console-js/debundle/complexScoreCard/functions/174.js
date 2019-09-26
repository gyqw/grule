var func174 = function (t, e, n) {
    "use strict";
    var r = n(1).Buffer, i = n(173);
    t.exports = function () {
        function t() {
            !function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.head = null, this.tail = null, this.length = 0
        }

        return t.prototype.push = function (t) {
            var e = {data: t, next: null};
            this.length > 0 ? this.tail.next = e : this.head = e, this.tail = e, ++this.length
        }, t.prototype.unshift = function (t) {
            var e = {data: t, next: this.head};
            0 === this.length && (this.tail = e), this.head = e, ++this.length
        }, t.prototype.shift = function () {
            if (0 !== this.length) {
                var t = this.head.data;
                return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, t
            }
        }, t.prototype.clear = function () {
            this.head = this.tail = null, this.length = 0
        }, t.prototype.join = function (t) {
            if (0 === this.length) return "";
            for (var e = this.head, n = "" + e.data; e = e.next;) n += t + e.data;
            return n
        }, t.prototype.concat = function (t) {
            if (0 === this.length) return r.alloc(0);
            if (1 === this.length) return this.head.data;
            for (var e, n, i = r.allocUnsafe(t >>> 0), o = this.head, a = 0; o;) e = i, n = a, o.data.copy(e, n), a += o.data.length, o = o.next;
            return i
        }, t
    }(), i && i.inspect && i.inspect.custom && (t.exports.prototype[i.inspect.custom] = function () {
        var t = i.inspect({length: this.length});
        return this.constructor.name + " " + t
    })
}