var func54 = function (t, e, n) {
    var r = n(0), i = n(21), o = i.base, a = i.bignum, s = i.constants.der;

    function c(t) {
        this.enc = "der", this.name = t.name, this.entity = t, this.tree = new f, this.tree._init(t.body)
    }

    function f(t) {
        o.Node.call(this, "der", t)
    }

    function u(t, e) {
        var n = t.readUInt8(e);
        if (t.isError(n)) return n;
        var r = s.tagClass[n >> 6], i = 0 == (32 & n);
        if (31 == (31 & n)) {
            var o = n;
            for (n = 0; 128 == (128 & o);) {
                if (o = t.readUInt8(e), t.isError(o)) return o;
                n <<= 7, n |= 127 & o
            }
        } else n &= 31;
        return {cls: r, primitive: i, tag: n, tagStr: s.tag[n]}
    }

    function l(t, e, n) {
        var r = t.readUInt8(n);
        if (t.isError(r)) return r;
        if (!e && 128 === r) return null;
        if (0 == (128 & r)) return r;
        var i = 127 & r;
        if (i > 4) return t.error("length octect is too long");
        r = 0;
        for (var o = 0; o < i; o++) {
            r <<= 8;
            var a = t.readUInt8(n);
            if (t.isError(a)) return a;
            r |= a
        }
        return r
    }

    t.exports = c, c.prototype.decode = function (t, e) {
        return t instanceof o.DecoderBuffer || (t = new o.DecoderBuffer(t, e)), this.tree._decode(t, e)
    }, r(f, o.Node), f.prototype._peekTag = function (t, e, n) {
        if (t.isEmpty()) return !1;
        var r = t.save(), i = u(t, 'Failed to peek tag: "' + e + '"');
        return t.isError(i) ? i : (t.restore(r), i.tag === e || i.tagStr === e || i.tagStr + "of" === e || n)
    }, f.prototype._decodeTag = function (t, e, n) {
        var r = u(t, 'Failed to decode tag of "' + e + '"');
        if (t.isError(r)) return r;
        var i = l(t, r.primitive, 'Failed to get length of "' + e + '"');
        if (t.isError(i)) return i;
        if (!n && r.tag !== e && r.tagStr !== e && r.tagStr + "of" !== e) return t.error('Failed to match tag: "' + e + '"');
        if (r.primitive || null !== i) return t.skip(i, 'Failed to match body of: "' + e + '"');
        var o = t.save(), a = this._skipUntilEnd(t, 'Failed to skip indefinite length body: "' + this.tag + '"');
        return t.isError(a) ? a : (i = t.offset - o.offset, t.restore(o), t.skip(i, 'Failed to match body of: "' + e + '"'))
    }, f.prototype._skipUntilEnd = function (t, e) {
        for (; ;) {
            var n = u(t, e);
            if (t.isError(n)) return n;
            var r, i = l(t, n.primitive, e);
            if (t.isError(i)) return i;
            if (r = n.primitive || null !== i ? t.skip(i) : this._skipUntilEnd(t, e), t.isError(r)) return r;
            if ("end" === n.tagStr) break
        }
    }, f.prototype._decodeList = function (t, e, n, r) {
        for (var i = []; !t.isEmpty();) {
            var o = this._peekTag(t, "end");
            if (t.isError(o)) return o;
            var a = n.decode(t, "der", r);
            if (t.isError(a) && o) break;
            i.push(a)
        }
        return i
    }, f.prototype._decodeStr = function (t, e) {
        if ("bitstr" === e) {
            var n = t.readUInt8();
            return t.isError(n) ? n : {unused: n, data: t.raw()}
        }
        if ("bmpstr" === e) {
            var r = t.raw();
            if (r.length % 2 == 1) return t.error("Decoding of string type: bmpstr length mismatch");
            for (var i = "", o = 0; o < r.length / 2; o++) i += String.fromCharCode(r.readUInt16BE(2 * o));
            return i
        }
        if ("numstr" === e) {
            var a = t.raw().toString("ascii");
            return this._isNumstr(a) ? a : t.error("Decoding of string type: numstr unsupported characters")
        }
        if ("octstr" === e) return t.raw();
        if ("objDesc" === e) return t.raw();
        if ("printstr" === e) {
            var s = t.raw().toString("ascii");
            return this._isPrintstr(s) ? s : t.error("Decoding of string type: printstr unsupported characters")
        }
        return /str$/.test(e) ? t.raw().toString() : t.error("Decoding of string type: " + e + " unsupported")
    }, f.prototype._decodeObjid = function (t, e, n) {
        for (var r, i = [], o = 0; !t.isEmpty();) {
            var a = t.readUInt8();
            o <<= 7, o |= 127 & a, 0 == (128 & a) && (i.push(o), o = 0)
        }
        128 & a && i.push(o);
        var s = i[0] / 40 | 0, c = i[0] % 40;
        if (r = n ? i : [s, c].concat(i.slice(1)), e) {
            var f = e[r.join(" ")];
            void 0 === f && (f = e[r.join(".")]), void 0 !== f && (r = f)
        }
        return r
    }, f.prototype._decodeTime = function (t, e) {
        var n = t.raw().toString();
        if ("gentime" === e) var r = 0 | n.slice(0, 4), i = 0 | n.slice(4, 6), o = 0 | n.slice(6, 8),
            a = 0 | n.slice(8, 10), s = 0 | n.slice(10, 12), c = 0 | n.slice(12, 14); else {
            if ("utctime" !== e) return t.error("Decoding " + e + " time is not supported yet");
            r = 0 | n.slice(0, 2), i = 0 | n.slice(2, 4), o = 0 | n.slice(4, 6), a = 0 | n.slice(6, 8), s = 0 | n.slice(8, 10), c = 0 | n.slice(10, 12), r = r < 70 ? 2e3 + r : 1900 + r
        }
        return Date.UTC(r, i - 1, o, a, s, c, 0)
    }, f.prototype._decodeNull = function (t) {
        return null
    }, f.prototype._decodeBool = function (t) {
        var e = t.readUInt8();
        return t.isError(e) ? e : 0 !== e
    }, f.prototype._decodeInt = function (t, e) {
        var n = t.raw(), r = new a(n);
        return e && (r = e[r.toString(10)] || r), r
    }, f.prototype._use = function (t, e) {
        return "function" == typeof t && (t = t(e)), t._getDecoder("der").tree
    }
}