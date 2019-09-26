var func53 = function (t, e, n) {
    var r = n(0), i = n(2).Buffer, o = n(21), a = o.base, s = o.constants.der;

    function c(t) {
        this.enc = "der", this.name = t.name, this.entity = t, this.tree = new f, this.tree._init(t.body)
    }

    function f(t) {
        a.Node.call(this, "der", t)
    }

    function u(t) {
        return t < 10 ? "0" + t : t
    }

    t.exports = c, c.prototype.encode = function (t, e) {
        return this.tree._encode(t, e).join()
    }, r(f, a.Node), f.prototype._encodeComposite = function (t, e, n, r) {
        var o, a = function (t, e, n, r) {
            var i;
            if ("seqof" === t ? t = "seq" : "setof" === t && (t = "set"), s.tagByName.hasOwnProperty(t)) i = s.tagByName[t]; else {
                if ("number" != typeof t || (0 | t) !== t) return r.error("Unknown tag: " + t);
                i = t
            }
            return i >= 31 ? r.error("Multi-octet tag encoding unsupported") : (e || (i |= 32), i | s.tagClassByName[n || "universal"] << 6)
        }(t, e, n, this.reporter);
        if (r.length < 128) return (o = new i(2))[0] = a, o[1] = r.length, this._createEncoderBuffer([o, r]);
        for (var c = 1, f = r.length; f >= 256; f >>= 8) c++;
        (o = new i(2 + c))[0] = a, o[1] = 128 | c, f = 1 + c;
        for (var u = r.length; u > 0; f--, u >>= 8) o[f] = 255 & u;
        return this._createEncoderBuffer([o, r])
    }, f.prototype._encodeStr = function (t, e) {
        if ("bitstr" === e) return this._createEncoderBuffer([0 | t.unused, t.data]);
        if ("bmpstr" === e) {
            for (var n = new i(2 * t.length), r = 0; r < t.length; r++) n.writeUInt16BE(t.charCodeAt(r), 2 * r);
            return this._createEncoderBuffer(n)
        }
        return "numstr" === e ? this._isNumstr(t) ? this._createEncoderBuffer(t) : this.reporter.error("Encoding of string type: numstr supports only digits and space") : "printstr" === e ? this._isPrintstr(t) ? this._createEncoderBuffer(t) : this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark") : /str$/.test(e) ? this._createEncoderBuffer(t) : "objDesc" === e ? this._createEncoderBuffer(t) : this.reporter.error("Encoding of string type: " + e + " unsupported")
    }, f.prototype._encodeObjid = function (t, e, n) {
        if ("string" == typeof t) {
            if (!e) return this.reporter.error("string objid given, but no values map found");
            if (!e.hasOwnProperty(t)) return this.reporter.error("objid not found in values map");
            t = e[t].split(/[\s\.]+/g);
            for (var r = 0; r < t.length; r++) t[r] |= 0
        } else if (Array.isArray(t)) for (t = t.slice(), r = 0; r < t.length; r++) t[r] |= 0;
        if (!Array.isArray(t)) return this.reporter.error("objid() should be either array or string, got: " + JSON.stringify(t));
        if (!n) {
            if (t[1] >= 40) return this.reporter.error("Second objid identifier OOB");
            t.splice(0, 2, 40 * t[0] + t[1])
        }
        var o = 0;
        for (r = 0; r < t.length; r++) {
            var a = t[r];
            for (o++; a >= 128; a >>= 7) o++
        }
        var s = new i(o), c = s.length - 1;
        for (r = t.length - 1; r >= 0; r--) for (a = t[r], s[c--] = 127 & a; (a >>= 7) > 0;) s[c--] = 128 | 127 & a;
        return this._createEncoderBuffer(s)
    }, f.prototype._encodeTime = function (t, e) {
        var n, r = new Date(t);
        return "gentime" === e ? n = [u(r.getFullYear()), u(r.getUTCMonth() + 1), u(r.getUTCDate()), u(r.getUTCHours()), u(r.getUTCMinutes()), u(r.getUTCSeconds()), "Z"].join("") : "utctime" === e ? n = [u(r.getFullYear() % 100), u(r.getUTCMonth() + 1), u(r.getUTCDate()), u(r.getUTCHours()), u(r.getUTCMinutes()), u(r.getUTCSeconds()), "Z"].join("") : this.reporter.error("Encoding " + e + " time is not supported yet"), this._encodeStr(n, "octstr")
    }, f.prototype._encodeNull = function () {
        return this._createEncoderBuffer("")
    }, f.prototype._encodeInt = function (t, e) {
        if ("string" == typeof t) {
            if (!e) return this.reporter.error("String int or enum given, but no values map");
            if (!e.hasOwnProperty(t)) return this.reporter.error("Values map doesn't contain: " + JSON.stringify(t));
            t = e[t]
        }
        if ("number" != typeof t && !i.isBuffer(t)) {
            var n = t.toArray();
            !t.sign && 128 & n[0] && n.unshift(0), t = new i(n)
        }
        if (i.isBuffer(t)) {
            var r = t.length;
            0 === t.length && r++;
            var o = new i(r);
            return t.copy(o), 0 === t.length && (o[0] = 0), this._createEncoderBuffer(o)
        }
        if (t < 128) return this._createEncoderBuffer(t);
        if (t < 256) return this._createEncoderBuffer([0, t]);
        r = 1;
        for (var a = t; a >= 256; a >>= 8) r++;
        for (a = (o = new Array(r)).length - 1; a >= 0; a--) o[a] = 255 & t, t >>= 8;
        return 128 & o[0] && o.unshift(0), this._createEncoderBuffer(new i(o))
    }, f.prototype._encodeBool = function (t) {
        return this._createEncoderBuffer(t ? 255 : 0)
    }, f.prototype._use = function (t, e) {
        return "function" == typeof t && (t = t(e)), t._getEncoder("der").tree
    }, f.prototype._skipDefault = function (t, e, n) {
        var r, i = this._baseState;
        if (null === i.default) return !1;
        var o = t.join();
        if (void 0 === i.defaultBuffer && (i.defaultBuffer = this._encodeValue(i.default, e, n).join()), o.length !== i.defaultBuffer.length) return !1;
        for (r = 0; r < o.length; r++) if (o[r] !== i.defaultBuffer[r]) return !1;
        return !0
    }
}