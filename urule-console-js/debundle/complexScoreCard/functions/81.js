var func81 = function (t, e, n) {
    "use strict";
    (function (e, r) {
        var i = n(32);
        t.exports = v;
        var o, a = n(82);
        v.ReadableState = m, n(15).EventEmitter;
        var s = function (t, e) {
            return t.listeners(e).length
        }, c = n(80), f = n(1).Buffer, u = e.Uint8Array || function () {
        }, l = n(25);
        l.inherits = n(24);
        var h = n(175), d = void 0;
        d = h && h.debuglog ? h.debuglog("stream") : function () {
        };
        var p, b = n(174), g = n(79);
        l.inherits(v, c);
        var y = ["error", "close", "destroy", "pause", "resume"];

        function m(t, e) {
            o = o || n(12), t = t || {};
            var r = e instanceof o;
            this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.readableObjectMode);
            var i = t.highWaterMark, a = t.readableHighWaterMark, s = this.objectMode ? 16 : 16384;
            this.highWaterMark = i || 0 === i ? i : r && (a || 0 === a) ? a : s, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new b, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (p || (p = n(42).StringDecoder), this.decoder = new p(t.encoding), this.encoding = t.encoding)
        }

        function v(t) {
            if (o = o || n(12), !(this instanceof v)) return new v(t);
            this._readableState = new m(t, this), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), c.call(this)
        }

        function A(t, e, n, r, i) {
            var o, a = t._readableState;
            return null === e ? (a.reading = !1, function (t, e) {
                if (!e.ended) {
                    if (e.decoder) {
                        var n = e.decoder.end();
                        n && n.length && (e.buffer.push(n), e.length += e.objectMode ? 1 : n.length)
                    }
                    e.ended = !0, x(t)
                }
            }(t, a)) : (i || (o = function (t, e) {
                var n, r;
                return r = e, f.isBuffer(r) || r instanceof u || "string" == typeof e || void 0 === e || t.objectMode || (n = new TypeError("Invalid non-string/buffer chunk")), n
            }(a, e)), o ? t.emit("error", o) : a.objectMode || e && e.length > 0 ? ("string" == typeof e || a.objectMode || Object.getPrototypeOf(e) === f.prototype || (e = function (t) {
                return f.from(t)
            }(e)), r ? a.endEmitted ? t.emit("error", new Error("stream.unshift() after end event")) : w(t, a, e, !0) : a.ended ? t.emit("error", new Error("stream.push() after EOF")) : (a.reading = !1, a.decoder && !n ? (e = a.decoder.write(e), a.objectMode || 0 !== e.length ? w(t, a, e, !1) : B(t, a)) : w(t, a, e, !1))) : r || (a.reading = !1)), function (t) {
                return !t.ended && (t.needReadable || t.length < t.highWaterMark || 0 === t.length)
            }(a)
        }

        function w(t, e, n, r) {
            e.flowing && 0 === e.length && !e.sync ? (t.emit("data", n), t.read(0)) : (e.length += e.objectMode ? 1 : n.length, r ? e.buffer.unshift(n) : e.buffer.push(n), e.needReadable && x(t)), B(t, e)
        }

        Object.defineProperty(v.prototype, "destroyed", {
            get: function () {
                return void 0 !== this._readableState && this._readableState.destroyed
            }, set: function (t) {
                this._readableState && (this._readableState.destroyed = t)
            }
        }), v.prototype.destroy = g.destroy, v.prototype._undestroy = g.undestroy, v.prototype._destroy = function (t, e) {
            this.push(null), e(t)
        }, v.prototype.push = function (t, e) {
            var n, r = this._readableState;
            return r.objectMode ? n = !0 : "string" == typeof t && ((e = e || r.defaultEncoding) !== r.encoding && (t = f.from(t, e), e = ""), n = !0), A(this, t, e, !1, n)
        }, v.prototype.unshift = function (t) {
            return A(this, t, null, !0, !1)
        }, v.prototype.isPaused = function () {
            return !1 === this._readableState.flowing
        }, v.prototype.setEncoding = function (t) {
            return p || (p = n(42).StringDecoder), this._readableState.decoder = new p(t), this._readableState.encoding = t, this
        };
        var _ = 8388608;

        function E(t, e) {
            return t <= 0 || 0 === e.length && e.ended ? 0 : e.objectMode ? 1 : t != t ? e.flowing && e.length ? e.buffer.head.data.length : e.length : (t > e.highWaterMark && (e.highWaterMark = function (t) {
                return t >= _ ? t = _ : (t--, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t++), t
            }(t)), t <= e.length ? t : e.ended ? e.length : (e.needReadable = !0, 0))
        }

        function x(t) {
            var e = t._readableState;
            e.needReadable = !1, e.emittedReadable || (d("emitReadable", e.flowing), e.emittedReadable = !0, e.sync ? i.nextTick(C, t) : C(t))
        }

        function C(t) {
            d("emit readable"), t.emit("readable"), M(t)
        }

        function B(t, e) {
            e.readingMore || (e.readingMore = !0, i.nextTick(S, t, e))
        }

        function S(t, e) {
            for (var n = e.length; !e.reading && !e.flowing && !e.ended && e.length < e.highWaterMark && (d("maybeReadMore read 0"), t.read(0), n !== e.length);) n = e.length;
            e.readingMore = !1
        }

        function k(t) {
            d("readable nexttick read 0"), t.read(0)
        }

        function I(t, e) {
            e.reading || (d("resume read 0"), t.read(0)), e.resumeScheduled = !1, e.awaitDrain = 0, t.emit("resume"), M(t), e.flowing && !e.reading && t.read(0)
        }

        function M(t) {
            var e = t._readableState;
            for (d("flow", e.flowing); e.flowing && null !== t.read();) ;
        }

        function T(t, e) {
            return 0 === e.length ? null : (e.objectMode ? n = e.buffer.shift() : !t || t >= e.length ? (n = e.decoder ? e.buffer.join("") : 1 === e.buffer.length ? e.buffer.head.data : e.buffer.concat(e.length), e.buffer.clear()) : n = function (t, e, n) {
                var r;
                return t < e.head.data.length ? (r = e.head.data.slice(0, t), e.head.data = e.head.data.slice(t)) : r = t === e.head.data.length ? e.shift() : n ? function (t, e) {
                    var n = e.head, r = 1, i = n.data;
                    for (t -= i.length; n = n.next;) {
                        var o = n.data, a = t > o.length ? o.length : t;
                        if (a === o.length ? i += o : i += o.slice(0, t), 0 == (t -= a)) {
                            a === o.length ? (++r, n.next ? e.head = n.next : e.head = e.tail = null) : (e.head = n, n.data = o.slice(a));
                            break
                        }
                        ++r
                    }
                    return e.length -= r, i
                }(t, e) : function (t, e) {
                    var n = f.allocUnsafe(t), r = e.head, i = 1;
                    for (r.data.copy(n), t -= r.data.length; r = r.next;) {
                        var o = r.data, a = t > o.length ? o.length : t;
                        if (o.copy(n, n.length - t, 0, a), 0 == (t -= a)) {
                            a === o.length ? (++i, r.next ? e.head = r.next : e.head = e.tail = null) : (e.head = r, r.data = o.slice(a));
                            break
                        }
                        ++i
                    }
                    return e.length -= i, n
                }(t, e), r
            }(t, e.buffer, e.decoder), n);
            var n
        }

        function R(t) {
            var e = t._readableState;
            if (e.length > 0) throw new Error('"endReadable()" called on non-empty stream');
            e.endEmitted || (e.ended = !0, i.nextTick(D, e, t))
        }

        function D(t, e) {
            t.endEmitted || 0 !== t.length || (t.endEmitted = !0, e.readable = !1, e.emit("end"))
        }

        function O(t, e) {
            for (var n = 0, r = t.length; n < r; n++) if (t[n] === e) return n;
            return -1
        }

        v.prototype.read = function (t) {
            d("read", t), t = parseInt(t, 10);
            var e = this._readableState, n = t;
            if (0 !== t && (e.emittedReadable = !1), 0 === t && e.needReadable && (e.length >= e.highWaterMark || e.ended)) return d("read: emitReadable", e.length, e.ended), 0 === e.length && e.ended ? R(this) : x(this), null;
            if (0 === (t = E(t, e)) && e.ended) return 0 === e.length && R(this), null;
            var r, i = e.needReadable;
            return d("need readable", i), (0 === e.length || e.length - t < e.highWaterMark) && d("length less than watermark", i = !0), e.ended || e.reading ? d("reading or ended", i = !1) : i && (d("do read"), e.reading = !0, e.sync = !0, 0 === e.length && (e.needReadable = !0), this._read(e.highWaterMark), e.sync = !1, e.reading || (t = E(n, e))), null === (r = t > 0 ? T(t, e) : null) ? (e.needReadable = !0, t = 0) : e.length -= t, 0 === e.length && (e.ended || (e.needReadable = !0), n !== t && e.ended && R(this)), null !== r && this.emit("data", r), r
        }, v.prototype._read = function (t) {
            this.emit("error", new Error("_read() is not implemented"))
        }, v.prototype.pipe = function (t, e) {
            var n = this, o = this._readableState;
            switch (o.pipesCount) {
                case 0:
                    o.pipes = t;
                    break;
                case 1:
                    o.pipes = [o.pipes, t];
                    break;
                default:
                    o.pipes.push(t)
            }
            o.pipesCount += 1, d("pipe count=%d opts=%j", o.pipesCount, e);
            var c = e && !1 === e.end || t === r.stdout || t === r.stderr ? m : f;

            function f() {
                d("onend"), t.end()
            }

            o.endEmitted ? i.nextTick(c) : n.once("end", c), t.on("unpipe", function e(r, i) {
                d("onunpipe"), r === n && i && !1 === i.hasUnpiped && (i.hasUnpiped = !0, d("cleanup"), t.removeListener("close", g), t.removeListener("finish", y), t.removeListener("drain", u), t.removeListener("error", b), t.removeListener("unpipe", e), n.removeListener("end", f), n.removeListener("end", m), n.removeListener("data", p), l = !0, !o.awaitDrain || t._writableState && !t._writableState.needDrain || u())
            });
            var u = function (t) {
                return function () {
                    var e = t._readableState;
                    d("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, 0 === e.awaitDrain && s(t, "data") && (e.flowing = !0, M(t))
                }
            }(n);
            t.on("drain", u);
            var l = !1, h = !1;

            function p(e) {
                d("ondata"), h = !1, !1 !== t.write(e) || h || ((1 === o.pipesCount && o.pipes === t || o.pipesCount > 1 && -1 !== O(o.pipes, t)) && !l && (d("false write response, pause", n._readableState.awaitDrain), n._readableState.awaitDrain++, h = !0), n.pause())
            }

            function b(e) {
                d("onerror", e), m(), t.removeListener("error", b), 0 === s(t, "error") && t.emit("error", e)
            }

            function g() {
                t.removeListener("finish", y), m()
            }

            function y() {
                d("onfinish"), t.removeListener("close", g), m()
            }

            function m() {
                d("unpipe"), n.unpipe(t)
            }

            return n.on("data", p), function (t, e, n) {
                if ("function" == typeof t.prependListener) return t.prependListener(e, n);
                t._events && t._events[e] ? a(t._events[e]) ? t._events[e].unshift(n) : t._events[e] = [n, t._events[e]] : t.on(e, n)
            }(t, "error", b), t.once("close", g), t.once("finish", y), t.emit("pipe", n), o.flowing || (d("pipe resume"), n.resume()), t
        }, v.prototype.unpipe = function (t) {
            var e = this._readableState, n = {hasUnpiped: !1};
            if (0 === e.pipesCount) return this;
            if (1 === e.pipesCount) return t && t !== e.pipes ? this : (t || (t = e.pipes), e.pipes = null, e.pipesCount = 0, e.flowing = !1, t && t.emit("unpipe", this, n), this);
            if (!t) {
                var r = e.pipes, i = e.pipesCount;
                e.pipes = null, e.pipesCount = 0, e.flowing = !1;
                for (var o = 0; o < i; o++) r[o].emit("unpipe", this, n);
                return this
            }
            var a = O(e.pipes, t);
            return -1 === a ? this : (e.pipes.splice(a, 1), e.pipesCount -= 1, 1 === e.pipesCount && (e.pipes = e.pipes[0]), t.emit("unpipe", this, n), this)
        }, v.prototype.on = function (t, e) {
            var n = c.prototype.on.call(this, t, e);
            if ("data" === t) !1 !== this._readableState.flowing && this.resume(); else if ("readable" === t) {
                var r = this._readableState;
                r.endEmitted || r.readableListening || (r.readableListening = r.needReadable = !0, r.emittedReadable = !1, r.reading ? r.length && x(this) : i.nextTick(k, this))
            }
            return n
        }, v.prototype.addListener = v.prototype.on, v.prototype.resume = function () {
            var t = this._readableState;
            return t.flowing || (d("resume"), t.flowing = !0, function (t, e) {
                e.resumeScheduled || (e.resumeScheduled = !0, i.nextTick(I, t, e))
            }(this, t)), this
        }, v.prototype.pause = function () {
            return d("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (d("pause"), this._readableState.flowing = !1, this.emit("pause")), this
        }, v.prototype.wrap = function (t) {
            var e = this, n = this._readableState, r = !1;
            for (var i in t.on("end", function () {
                if (d("wrapped end"), n.decoder && !n.ended) {
                    var t = n.decoder.end();
                    t && t.length && e.push(t)
                }
                e.push(null)
            }), t.on("data", function (i) {
                d("wrapped data"), n.decoder && (i = n.decoder.write(i)), (!n.objectMode || null !== i && void 0 !== i) && (n.objectMode || i && i.length) && (e.push(i) || (r = !0, t.pause()))
            }), t) void 0 === this[i] && "function" == typeof t[i] && (this[i] = function (e) {
                return function () {
                    return t[e].apply(t, arguments)
                }
            }(i));
            for (var o = 0; o < y.length; o++) t.on(y[o], this.emit.bind(this, y[o]));
            return this._read = function (e) {
                d("wrapped _read", e), r && (r = !1, t.resume())
            }, this
        }, Object.defineProperty(v.prototype, "readableHighWaterMark", {
            enumerable: !1, get: function () {
                return this._readableState.highWaterMark
            }
        }), v._fromList = T
    }).call(this, n(8), n(11))
}