var func33 = function (t, e, n) {
    t.exports = i;
    var r = n(15).EventEmitter;

    function i() {
        r.call(this)
    }

    n(0)(i, r), i.Readable = n(44), i.Writable = n(168), i.Duplex = n(167), i.Transform = n(166), i.PassThrough = n(165), i.Stream = i, i.prototype.pipe = function (t, e) {
        var n = this;

        function i(e) {
            t.writable && !1 === t.write(e) && n.pause && n.pause()
        }

        function o() {
            n.readable && n.resume && n.resume()
        }

        n.on("data", i), t.on("drain", o), t._isStdio || e && !1 === e.end || (n.on("end", s), n.on("close", c));
        var a = !1;

        function s() {
            a || (a = !0, t.end())
        }

        function c() {
            a || (a = !0, "function" == typeof t.destroy && t.destroy())
        }

        function f(t) {
            if (u(), 0 === r.listenerCount(this, "error")) throw t
        }

        function u() {
            n.removeListener("data", i), t.removeListener("drain", o), n.removeListener("end", s), n.removeListener("close", c), n.removeListener("error", f), t.removeListener("error", f), n.removeListener("end", u), n.removeListener("close", u), t.removeListener("close", u)
        }

        return n.on("error", f), t.on("error", f), n.on("end", u), n.on("close", u), t.on("close", u), t.emit("pipe", n), t
    }
}