var func15 = function (t, e) {
    function n() {
        this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
    }

    function r(t) {
        return "function" == typeof t
    }

    function i(t) {
        return "object" == typeof t && null !== t
    }

    function o(t) {
        return void 0 === t
    }

    t.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function (t) {
        if ("number" != typeof t || t < 0 || isNaN(t)) throw TypeError("n must be a positive number");
        return this._maxListeners = t, this
    }, n.prototype.emit = function (t) {
        var e, n, a, s, c, f;
        if (this._events || (this._events = {}), "error" === t && (!this._events.error || i(this._events.error) && !this._events.error.length)) {
            if ((e = arguments[1]) instanceof Error) throw e;
            var u = new Error('Uncaught, unspecified "error" event. (' + e + ")");
            throw u.context = e, u
        }
        if (o(n = this._events[t])) return !1;
        if (r(n)) switch (arguments.length) {
            case 1:
                n.call(this);
                break;
            case 2:
                n.call(this, arguments[1]);
                break;
            case 3:
                n.call(this, arguments[1], arguments[2]);
                break;
            default:
                s = Array.prototype.slice.call(arguments, 1), n.apply(this, s)
        } else if (i(n)) for (s = Array.prototype.slice.call(arguments, 1), a = (f = n.slice()).length, c = 0; c < a; c++) f[c].apply(this, s);
        return !0
    }, n.prototype.addListener = function (t, e) {
        var a;
        if (!r(e)) throw TypeError("listener must be a function");
        return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, r(e.listener) ? e.listener : e), this._events[t] ? i(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, i(this._events[t]) && !this._events[t].warned && (a = o(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && a > 0 && this._events[t].length > a && (this._events[t].warned = !0, console.trace), this
    }, n.prototype.on = n.prototype.addListener, n.prototype.once = function (t, e) {
        if (!r(e)) throw TypeError("listener must be a function");
        var n = !1;

        function i() {
            this.removeListener(t, i), n || (n = !0, e.apply(this, arguments))
        }

        return i.listener = e, this.on(t, i), this
    }, n.prototype.removeListener = function (t, e) {
        var n, o, a, s;
        if (!r(e)) throw TypeError("listener must be a function");
        if (!this._events || !this._events[t]) return this;
        if (a = (n = this._events[t]).length, o = -1, n === e || r(n.listener) && n.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e); else if (i(n)) {
            for (s = a; s-- > 0;) if (n[s] === e || n[s].listener && n[s].listener === e) {
                o = s;
                break
            }
            if (o < 0) return this;
            1 === n.length ? (n.length = 0, delete this._events[t]) : n.splice(o, 1), this._events.removeListener && this.emit("removeListener", t, e)
        }
        return this
    }, n.prototype.removeAllListeners = function (t) {
        var e, n;
        if (!this._events) return this;
        if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
        if (0 === arguments.length) {
            for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
            return this.removeAllListeners("removeListener"), this._events = {}, this
        }
        if (r(n = this._events[t])) this.removeListener(t, n); else if (n) for (; n.length;) this.removeListener(t, n[n.length - 1]);
        return delete this._events[t], this
    }, n.prototype.listeners = function (t) {
        return this._events && this._events[t] ? r(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
    }, n.prototype.listenerCount = function (t) {
        if (this._events) {
            var e = this._events[t];
            if (r(e)) return 1;
            if (e) return e.length
        }
        return 0
    }, n.listenerCount = function (t, e) {
        return t.listenerCount(e)
    }
}