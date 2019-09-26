var func104 = function (t, e, n) {
    var r = n(20).Reporter, i = n(20).EncoderBuffer, o = n(20).DecoderBuffer, a = n(6),
        s = ["seq", "seqof", "set", "setof", "objid", "bool", "gentime", "utctime", "null_", "enum", "int", "objDesc", "bitstr", "bmpstr", "charstr", "genstr", "graphstr", "ia5str", "iso646str", "numstr", "octstr", "printstr", "t61str", "unistr", "utf8str", "videostr"],
        c = ["key", "obj", "use", "optional", "explicit", "implicit", "def", "choice", "any", "contains"].concat(s);

    function f(t, e) {
        var n = {};
        this._baseState = n, n.enc = t, n.parent = e || null, n.children = null, n.tag = null, n.args = null, n.reverseArgs = null, n.choice = null, n.optional = !1, n.any = !1, n.obj = !1, n.use = null, n.useDecoder = null, n.key = null, n.default = null, n.explicit = null, n.implicit = null, n.contains = null, n.parent || (n.children = [], this._wrap())
    }

    t.exports = f;
    var u = ["enc", "parent", "children", "tag", "args", "reverseArgs", "choice", "optional", "any", "obj", "use", "alteredUse", "key", "default", "explicit", "implicit", "contains"];
    f.prototype.clone = function () {
        var t = this._baseState, e = {};
        u.forEach(function (n) {
            e[n] = t[n]
        });
        var n = new this.constructor(e.parent);
        return n._baseState = e, n
    }, f.prototype._wrap = function () {
        var t = this._baseState;
        c.forEach(function (e) {
            this[e] = function () {
                var n = new this.constructor(this);
                return t.children.push(n), n[e].apply(n, arguments)
            }
        }, this)
    }, f.prototype._init = function (t) {
        var e = this._baseState;
        a(null === e.parent), t.call(this), e.children = e.children.filter(function (t) {
            return t._baseState.parent === this
        }, this), a.equal(e.children.length, 1, "Root node can have only one child")
    }, f.prototype._useArgs = function (t) {
        var e = this._baseState, n = t.filter(function (t) {
            return t instanceof this.constructor
        }, this);
        t = t.filter(function (t) {
            return !(t instanceof this.constructor)
        }, this), 0 !== n.length && (a(null === e.children), e.children = n, n.forEach(function (t) {
            t._baseState.parent = this
        }, this)), 0 !== t.length && (a(null === e.args), e.args = t, e.reverseArgs = t.map(function (t) {
            if ("object" != typeof t || t.constructor !== Object) return t;
            var e = {};
            return Object.keys(t).forEach(function (n) {
                n == (0 | n) && (n |= 0);
                var r = t[n];
                e[r] = n
            }), e
        }))
    }, ["_peekTag", "_decodeTag", "_use", "_decodeStr", "_decodeObjid", "_decodeTime", "_decodeNull", "_decodeInt", "_decodeBool", "_decodeList", "_encodeComposite", "_encodeStr", "_encodeObjid", "_encodeTime", "_encodeNull", "_encodeInt", "_encodeBool"].forEach(function (t) {
        f.prototype[t] = function () {
            var e = this._baseState;
            throw new Error(t + " not implemented for encoding: " + e.enc)
        }
    }), s.forEach(function (t) {
        f.prototype[t] = function () {
            var e = this._baseState, n = Array.prototype.slice.call(arguments);
            return a(null === e.tag), e.tag = t, this._useArgs(n), this
        }
    }), f.prototype.use = function (t) {
        a(t);
        var e = this._baseState;
        return a(null === e.use), e.use = t, this
    }, f.prototype.optional = function () {
        return this._baseState.optional = !0, this
    }, f.prototype.def = function (t) {
        var e = this._baseState;
        return a(null === e.default), e.default = t, e.optional = !0, this
    }, f.prototype.explicit = function (t) {
        var e = this._baseState;
        return a(null === e.explicit && null === e.implicit), e.explicit = t, this
    }, f.prototype.implicit = function (t) {
        var e = this._baseState;
        return a(null === e.explicit && null === e.implicit), e.implicit = t, this
    }, f.prototype.obj = function () {
        var t = this._baseState, e = Array.prototype.slice.call(arguments);
        return t.obj = !0, 0 !== e.length && this._useArgs(e), this
    }, f.prototype.key = function (t) {
        var e = this._baseState;
        return a(null === e.key), e.key = t, this
    }, f.prototype.any = function () {
        return this._baseState.any = !0, this
    }, f.prototype.choice = function (t) {
        var e = this._baseState;
        return a(null === e.choice), e.choice = t, this._useArgs(Object.keys(t).map(function (e) {
            return t[e]
        })), this
    }, f.prototype.contains = function (t) {
        var e = this._baseState;
        return a(null === e.use), e.contains = t, this
    }, f.prototype._decode = function (t, e) {
        var n = this._baseState;
        if (null === n.parent) return t.wrapResult(n.children[0]._decode(t, e));
        var r, i = n.default, a = !0, s = null;
        if (null !== n.key && (s = t.enterKey(n.key)), n.optional) {
            var c = null;
            if (null !== n.explicit ? c = n.explicit : null !== n.implicit ? c = n.implicit : null !== n.tag && (c = n.tag), null !== c || n.any) {
                if (a = this._peekTag(t, c, n.any), t.isError(a)) return a
            } else {
                var f = t.save();
                try {
                    null === n.choice ? this._decodeGeneric(n.tag, t, e) : this._decodeChoice(t, e), a = !0
                } catch (t) {
                    a = !1
                }
                t.restore(f)
            }
        }
        if (n.obj && a && (r = t.enterObject()), a) {
            if (null !== n.explicit) {
                var u = this._decodeTag(t, n.explicit);
                if (t.isError(u)) return u;
                t = u
            }
            var l = t.offset;
            if (null === n.use && null === n.choice) {
                n.any && (f = t.save());
                var h = this._decodeTag(t, null !== n.implicit ? n.implicit : n.tag, n.any);
                if (t.isError(h)) return h;
                n.any ? i = t.raw(f) : t = h
            }
            if (e && e.track && null !== n.tag && e.track(t.path(), l, t.length, "tagged"), e && e.track && null !== n.tag && e.track(t.path(), t.offset, t.length, "content"), i = n.any ? i : null === n.choice ? this._decodeGeneric(n.tag, t, e) : this._decodeChoice(t, e), t.isError(i)) return i;
            if (n.any || null !== n.choice || null === n.children || n.children.forEach(function (n) {
                n._decode(t, e)
            }), n.contains && ("octstr" === n.tag || "bitstr" === n.tag)) {
                var d = new o(i);
                i = this._getUse(n.contains, t._reporterState.obj)._decode(d, e)
            }
        }
        return n.obj && a && (i = t.leaveObject(r)), null === n.key || null === i && !0 !== a ? null !== s && t.exitKey(s) : t.leaveKey(s, n.key, i), i
    }, f.prototype._decodeGeneric = function (t, e, n) {
        var r = this._baseState;
        return "seq" === t || "set" === t ? null : "seqof" === t || "setof" === t ? this._decodeList(e, t, r.args[0], n) : /str$/.test(t) ? this._decodeStr(e, t, n) : "objid" === t && r.args ? this._decodeObjid(e, r.args[0], r.args[1], n) : "objid" === t ? this._decodeObjid(e, null, null, n) : "gentime" === t || "utctime" === t ? this._decodeTime(e, t, n) : "null_" === t ? this._decodeNull(e, n) : "bool" === t ? this._decodeBool(e, n) : "objDesc" === t ? this._decodeStr(e, t, n) : "int" === t || "enum" === t ? this._decodeInt(e, r.args && r.args[0], n) : null !== r.use ? this._getUse(r.use, e._reporterState.obj)._decode(e, n) : e.error("unknown tag: " + t)
    }, f.prototype._getUse = function (t, e) {
        var n = this._baseState;
        return n.useDecoder = this._use(t, e), a(null === n.useDecoder._baseState.parent), n.useDecoder = n.useDecoder._baseState.children[0], n.implicit !== n.useDecoder._baseState.implicit && (n.useDecoder = n.useDecoder.clone(), n.useDecoder._baseState.implicit = n.implicit), n.useDecoder
    }, f.prototype._decodeChoice = function (t, e) {
        var n = this._baseState, r = null, i = !1;
        return Object.keys(n.choice).some(function (o) {
            var a = t.save(), s = n.choice[o];
            try {
                var c = s._decode(t, e);
                if (t.isError(c)) return !1;
                r = {type: o, value: c}, i = !0
            } catch (e) {
                return t.restore(a), !1
            }
            return !0
        }, this), i ? r : t.error("Choice not matched")
    }, f.prototype._createEncoderBuffer = function (t) {
        return new i(t, this.reporter)
    }, f.prototype._encode = function (t, e, n) {
        var r = this._baseState;
        if (null === r.default || r.default !== t) {
            var i = this._encodeValue(t, e, n);
            if (void 0 !== i && !this._skipDefault(i, e, n)) return i
        }
    }, f.prototype._encodeValue = function (t, e, n) {
        var i = this._baseState;
        if (null === i.parent) return i.children[0]._encode(t, e || new r);
        var o = null;
        if (this.reporter = e, i.optional && void 0 === t) {
            if (null === i.default) return;
            t = i.default
        }
        var a = null, s = !1;
        if (i.any) o = this._createEncoderBuffer(t); else if (i.choice) o = this._encodeChoice(t, e); else if (i.contains) a = this._getUse(i.contains, n)._encode(t, e), s = !0; else if (i.children) a = i.children.map(function (n) {
            if ("null_" === n._baseState.tag) return n._encode(null, e, t);
            if (null === n._baseState.key) return e.error("Child should have a key");
            var r = e.enterKey(n._baseState.key);
            if ("object" != typeof t) return e.error("Child expected, but input is not object");
            var i = n._encode(t[n._baseState.key], e, t);
            return e.leaveKey(r), i
        }, this).filter(function (t) {
            return t
        }), a = this._createEncoderBuffer(a); else if ("seqof" === i.tag || "setof" === i.tag) {
            if (!i.args || 1 !== i.args.length) return e.error("Too many args for : " + i.tag);
            if (!Array.isArray(t)) return e.error("seqof/setof, but data is not Array");
            var c = this.clone();
            c._baseState.implicit = null, a = this._createEncoderBuffer(t.map(function (n) {
                var r = this._baseState;
                return this._getUse(r.args[0], t)._encode(n, e)
            }, c))
        } else null !== i.use ? o = this._getUse(i.use, n)._encode(t, e) : (a = this._encodePrimitive(i.tag, t), s = !0);
        if (!i.any && null === i.choice) {
            var f = null !== i.implicit ? i.implicit : i.tag, u = null === i.implicit ? "universal" : "context";
            null === f ? null === i.use && e.error("Tag could be omitted only for .use()") : null === i.use && (o = this._encodeComposite(f, s, u, a))
        }
        return null !== i.explicit && (o = this._encodeComposite(i.explicit, !1, "context", o)), o
    }, f.prototype._encodeChoice = function (t, e) {
        var n = this._baseState, r = n.choice[t.type];
        return r || a(!1, t.type + " not found in " + JSON.stringify(Object.keys(n.choice))), r._encode(t.value, e)
    }, f.prototype._encodePrimitive = function (t, e) {
        var n = this._baseState;
        if (/str$/.test(t)) return this._encodeStr(e, t);
        if ("objid" === t && n.args) return this._encodeObjid(e, n.reverseArgs[0], n.args[1]);
        if ("objid" === t) return this._encodeObjid(e, null, null);
        if ("gentime" === t || "utctime" === t) return this._encodeTime(e, t);
        if ("null_" === t) return this._encodeNull();
        if ("int" === t || "enum" === t) return this._encodeInt(e, n.args && n.reverseArgs[0]);
        if ("bool" === t) return this._encodeBool(e);
        if ("objDesc" === t) return this._encodeStr(e, t);
        throw new Error("Unsupported tag: " + t)
    }, f.prototype._isNumstr = function (t) {
        return /^[0-9 ]*$/.test(t)
    }, f.prototype._isPrintstr = function (t) {
        return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(t)
    }
}