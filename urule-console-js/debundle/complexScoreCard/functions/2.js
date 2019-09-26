var func2 = function (t, e, n) {
    "use strict";
    (function (t) {
        var r = n(179), i = n(178), o = n(82);

        function a() {
            return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }

        function s(t, e) {
            if (a() < e) throw new RangeError("Invalid typed array length");
            return c.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = c.prototype : (null === t && (t = new c(e)), t.length = e), t
        }

        function c(t, e, n) {
            if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(t, e, n);
            if ("number" == typeof t) {
                if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                return l(this, t)
            }
            return f(this, t, e, n)
        }

        function f(t, e, n, r) {
            if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function (t, e, n, r) {
                if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
                if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
                return e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r), c.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = c.prototype : t = h(t, e), t
            }(t, e, n, r) : "string" == typeof e ? function (t, e, n) {
                if ("string" == typeof n && "" !== n || (n = "utf8"), !c.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                var r = 0 | p(e, n), i = (t = s(t, r)).write(e, n);
                return i !== r && (t = t.slice(0, i)), t
            }(t, e, n) : function (t, e) {
                if (c.isBuffer(e)) {
                    var n = 0 | d(e.length);
                    return 0 === (t = s(t, n)).length ? t : (e.copy(t, 0, 0, n), t)
                }
                if (e) {
                    if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? s(t, 0) : h(t, e);
                    if ("Buffer" === e.type && o(e.data)) return h(t, e.data)
                }
                var r;
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }(t, e)
        }

        function u(t) {
            if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
            if (t < 0) throw new RangeError('"size" argument must not be negative')
        }

        function l(t, e) {
            if (u(e), t = s(t, e < 0 ? 0 : 0 | d(e)), !c.TYPED_ARRAY_SUPPORT) for (var n = 0; n < e; ++n) t[n] = 0;
            return t
        }

        function h(t, e) {
            var n = e.length < 0 ? 0 : 0 | d(e.length);
            t = s(t, n);
            for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
            return t
        }

        function d(t) {
            if (t >= a()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
            return 0 | t
        }

        function p(t, e) {
            if (c.isBuffer(t)) return t.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
            "string" != typeof t && (t = "" + t);
            var n = t.length;
            if (0 === n) return 0;
            for (var r = !1; ;) switch (e) {
                case"ascii":
                case"latin1":
                case"binary":
                    return n;
                case"utf8":
                case"utf-8":
                case void 0:
                    return U(t).length;
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    return 2 * n;
                case"hex":
                    return n >>> 1;
                case"base64":
                    return F(t).length;
                default:
                    if (r) return U(t).length;
                    e = ("" + e).toLowerCase(), r = !0
            }
        }

        function b(t, e, n) {
            var r = t[e];
            t[e] = t[n], t[n] = r
        }

        function g(t, e, n, r, i) {
            if (0 === t.length) return -1;
            if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = i ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                if (i) return -1;
                n = t.length - 1
            } else if (n < 0) {
                if (!i) return -1;
                n = 0
            }
            if ("string" == typeof e && (e = c.from(e, r)), c.isBuffer(e)) return 0 === e.length ? -1 : y(t, e, n, r, i);
            if ("number" == typeof e) return e &= 255, c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : y(t, [e], n, r, i);
            throw new TypeError("val must be string, number or Buffer")
        }

        function y(t, e, n, r, i) {
            var o, a = 1, s = t.length, c = e.length;
            if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                if (t.length < 2 || e.length < 2) return -1;
                a = 2, s /= 2, c /= 2, n /= 2
            }

            function f(t, e) {
                return 1 === a ? t[e] : t.readUInt16BE(e * a)
            }

            if (i) {
                var u = -1;
                for (o = n; o < s; o++) if (f(t, o) === f(e, -1 === u ? 0 : o - u)) {
                    if (-1 === u && (u = o), o - u + 1 === c) return u * a
                } else -1 !== u && (o -= o - u), u = -1
            } else for (n + c > s && (n = s - c), o = n; o >= 0; o--) {
                for (var l = !0, h = 0; h < c; h++) if (f(t, o + h) !== f(e, h)) {
                    l = !1;
                    break
                }
                if (l) return o
            }
            return -1
        }

        function m(t, e, n, r) {
            n = Number(n) || 0;
            var i = t.length - n;
            r ? (r = Number(r)) > i && (r = i) : r = i;
            var o = e.length;
            if (o % 2 != 0) throw new TypeError("Invalid hex string");
            r > o / 2 && (r = o / 2);
            for (var a = 0; a < r; ++a) {
                var s = parseInt(e.substr(2 * a, 2), 16);
                if (isNaN(s)) return a;
                t[n + a] = s
            }
            return a
        }

        function v(t, e, n, r) {
            return Y(U(e, t.length - n), t, n, r)
        }

        function A(t, e, n, r) {
            return Y(function (t) {
                for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
                return e
            }(e), t, n, r)
        }

        function w(t, e, n, r) {
            return A(t, e, n, r)
        }

        function _(t, e, n, r) {
            return Y(F(e), t, n, r)
        }

        function E(t, e, n, r) {
            return Y(function (t, e) {
                for (var n, r, i, o = [], a = 0; a < t.length && !((e -= 2) < 0); ++a) r = (n = t.charCodeAt(a)) >> 8, i = n % 256, o.push(i), o.push(r);
                return o
            }(e, t.length - n), t, n, r)
        }

        function x(t, e, n) {
            return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n))
        }

        function C(t, e, n) {
            n = Math.min(t.length, n);
            for (var r = [], i = e; i < n;) {
                var o, a, s, c, f = t[i], u = null, l = f > 239 ? 4 : f > 223 ? 3 : f > 191 ? 2 : 1;
                if (i + l <= n) switch (l) {
                    case 1:
                        f < 128 && (u = f);
                        break;
                    case 2:
                        128 == (192 & (o = t[i + 1])) && (c = (31 & f) << 6 | 63 & o) > 127 && (u = c);
                        break;
                    case 3:
                        o = t[i + 1], a = t[i + 2], 128 == (192 & o) && 128 == (192 & a) && (c = (15 & f) << 12 | (63 & o) << 6 | 63 & a) > 2047 && (c < 55296 || c > 57343) && (u = c);
                        break;
                    case 4:
                        o = t[i + 1], a = t[i + 2], s = t[i + 3], 128 == (192 & o) && 128 == (192 & a) && 128 == (192 & s) && (c = (15 & f) << 18 | (63 & o) << 12 | (63 & a) << 6 | 63 & s) > 65535 && c < 1114112 && (u = c)
                }
                null === u ? (u = 65533, l = 1) : u > 65535 && (u -= 65536, r.push(u >>> 10 & 1023 | 55296), u = 56320 | 1023 & u), r.push(u), i += l
            }
            return function (t) {
                var e = t.length;
                if (e <= B) return String.fromCharCode.apply(String, t);
                for (var n = "", r = 0; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += B));
                return n
            }(r)
        }

        e.Buffer = c, e.SlowBuffer = function (t) {
            return +t != t && (t = 0), c.alloc(+t)
        }, e.INSPECT_MAX_BYTES = 50, c.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function () {
            try {
                var t = new Uint8Array(1);
                return t.__proto__ = {
                    __proto__: Uint8Array.prototype, foo: function () {
                        return 42
                    }
                }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
            } catch (t) {
                return !1
            }
        }(), e.kMaxLength = a(), c.poolSize = 8192, c._augment = function (t) {
            return t.__proto__ = c.prototype, t
        }, c.from = function (t, e, n) {
            return f(null, t, e, n)
        }, c.TYPED_ARRAY_SUPPORT && (c.prototype.__proto__ = Uint8Array.prototype, c.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, {
            value: null,
            configurable: !0
        })), c.alloc = function (t, e, n) {
            return function (t, e, n, r) {
                return u(e), e <= 0 ? s(t, e) : void 0 !== n ? "string" == typeof r ? s(t, e).fill(n, r) : s(t, e).fill(n) : s(t, e)
            }(null, t, e, n)
        }, c.allocUnsafe = function (t) {
            return l(null, t)
        }, c.allocUnsafeSlow = function (t) {
            return l(null, t)
        }, c.isBuffer = function (t) {
            return !(null == t || !t._isBuffer)
        }, c.compare = function (t, e) {
            if (!c.isBuffer(t) || !c.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
            if (t === e) return 0;
            for (var n = t.length, r = e.length, i = 0, o = Math.min(n, r); i < o; ++i) if (t[i] !== e[i]) {
                n = t[i], r = e[i];
                break
            }
            return n < r ? -1 : r < n ? 1 : 0
        }, c.isEncoding = function (t) {
            switch (String(t).toLowerCase()) {
                case"hex":
                case"utf8":
                case"utf-8":
                case"ascii":
                case"latin1":
                case"binary":
                case"base64":
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    return !0;
                default:
                    return !1
            }
        }, c.concat = function (t, e) {
            if (!o(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length) return c.alloc(0);
            var n;
            if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
            var r = c.allocUnsafe(e), i = 0;
            for (n = 0; n < t.length; ++n) {
                var a = t[n];
                if (!c.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
                a.copy(r, i), i += a.length
            }
            return r
        }, c.byteLength = p, c.prototype._isBuffer = !0, c.prototype.swap16 = function () {
            var t = this.length;
            if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var e = 0; e < t; e += 2) b(this, e, e + 1);
            return this
        }, c.prototype.swap32 = function () {
            var t = this.length;
            if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var e = 0; e < t; e += 4) b(this, e, e + 3), b(this, e + 1, e + 2);
            return this
        }, c.prototype.swap64 = function () {
            var t = this.length;
            if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var e = 0; e < t; e += 8) b(this, e, e + 7), b(this, e + 1, e + 6), b(this, e + 2, e + 5), b(this, e + 3, e + 4);
            return this
        }, c.prototype.toString = function () {
            var t = 0 | this.length;
            return 0 === t ? "" : 0 === arguments.length ? C(this, 0, t) : function (t, e, n) {
                var r = !1;
                if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                if ((n >>>= 0) <= (e >>>= 0)) return "";
                for (t || (t = "utf8"); ;) switch (t) {
                    case"hex":
                        return I(this, e, n);
                    case"utf8":
                    case"utf-8":
                        return C(this, e, n);
                    case"ascii":
                        return S(this, e, n);
                    case"latin1":
                    case"binary":
                        return k(this, e, n);
                    case"base64":
                        return x(this, e, n);
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return M(this, e, n);
                    default:
                        if (r) throw new TypeError("Unknown encoding: " + t);
                        t = (t + "").toLowerCase(), r = !0
                }
            }.apply(this, arguments)
        }, c.prototype.equals = function (t) {
            if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === c.compare(this, t)
        }, c.prototype.inspect = function () {
            var t = "", n = e.INSPECT_MAX_BYTES;
            return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">"
        }, c.prototype.compare = function (t, e, n, r, i) {
            if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), e < 0 || n > t.length || r < 0 || i > this.length) throw new RangeError("out of range index");
            if (r >= i && e >= n) return 0;
            if (r >= i) return -1;
            if (e >= n) return 1;
            if (e >>>= 0, n >>>= 0, r >>>= 0, i >>>= 0, this === t) return 0;
            for (var o = i - r, a = n - e, s = Math.min(o, a), f = this.slice(r, i), u = t.slice(e, n), l = 0; l < s; ++l) if (f[l] !== u[l]) {
                o = f[l], a = u[l];
                break
            }
            return o < a ? -1 : a < o ? 1 : 0
        }, c.prototype.includes = function (t, e, n) {
            return -1 !== this.indexOf(t, e, n)
        }, c.prototype.indexOf = function (t, e, n) {
            return g(this, t, e, n, !0)
        }, c.prototype.lastIndexOf = function (t, e, n) {
            return g(this, t, e, n, !1)
        }, c.prototype.write = function (t, e, n, r) {
            if (void 0 === e) r = "utf8", n = this.length, e = 0; else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0; else {
                if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
            }
            var i = this.length - e;
            if ((void 0 === n || n > i) && (n = i), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            r || (r = "utf8");
            for (var o = !1; ;) switch (r) {
                case"hex":
                    return m(this, t, e, n);
                case"utf8":
                case"utf-8":
                    return v(this, t, e, n);
                case"ascii":
                    return A(this, t, e, n);
                case"latin1":
                case"binary":
                    return w(this, t, e, n);
                case"base64":
                    return _(this, t, e, n);
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    return E(this, t, e, n);
                default:
                    if (o) throw new TypeError("Unknown encoding: " + r);
                    r = ("" + r).toLowerCase(), o = !0
            }
        }, c.prototype.toJSON = function () {
            return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
        };
        var B = 4096;

        function S(t, e, n) {
            var r = "";
            n = Math.min(t.length, n);
            for (var i = e; i < n; ++i) r += String.fromCharCode(127 & t[i]);
            return r
        }

        function k(t, e, n) {
            var r = "";
            n = Math.min(t.length, n);
            for (var i = e; i < n; ++i) r += String.fromCharCode(t[i]);
            return r
        }

        function I(t, e, n) {
            var r = t.length;
            (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
            for (var i = "", o = e; o < n; ++o) i += Q(t[o]);
            return i
        }

        function M(t, e, n) {
            for (var r = t.slice(e, n), i = "", o = 0; o < r.length; o += 2) i += String.fromCharCode(r[o] + 256 * r[o + 1]);
            return i
        }

        function T(t, e, n) {
            if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
            if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
        }

        function R(t, e, n, r, i, o) {
            if (!c.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
            if (n + r > t.length) throw new RangeError("Index out of range")
        }

        function D(t, e, n, r) {
            e < 0 && (e = 65535 + e + 1);
            for (var i = 0, o = Math.min(t.length - n, 2); i < o; ++i) t[n + i] = (e & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
        }

        function O(t, e, n, r) {
            e < 0 && (e = 4294967295 + e + 1);
            for (var i = 0, o = Math.min(t.length - n, 4); i < o; ++i) t[n + i] = e >>> 8 * (r ? i : 3 - i) & 255
        }

        function P(t, e, n, r, i, o) {
            if (n + r > t.length) throw new RangeError("Index out of range");
            if (n < 0) throw new RangeError("Index out of range")
        }

        function N(t, e, n, r, o) {
            return o || P(t, 0, n, 4), i.write(t, e, n, r, 23, 4), n + 4
        }

        function j(t, e, n, r, o) {
            return o || P(t, 0, n, 8), i.write(t, e, n, r, 52, 8), n + 8
        }

        c.prototype.slice = function (t, e) {
            var n, r = this.length;
            if (t = ~~t, e = void 0 === e ? r : ~~e, t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), c.TYPED_ARRAY_SUPPORT) (n = this.subarray(t, e)).__proto__ = c.prototype; else {
                var i = e - t;
                n = new c(i, void 0);
                for (var o = 0; o < i; ++o) n[o] = this[o + t]
            }
            return n
        }, c.prototype.readUIntLE = function (t, e, n) {
            t |= 0, e |= 0, n || T(t, e, this.length);
            for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
            return r
        }, c.prototype.readUIntBE = function (t, e, n) {
            t |= 0, e |= 0, n || T(t, e, this.length);
            for (var r = this[t + --e], i = 1; e > 0 && (i *= 256);) r += this[t + --e] * i;
            return r
        }, c.prototype.readUInt8 = function (t, e) {
            return e || T(t, 1, this.length), this[t]
        }, c.prototype.readUInt16LE = function (t, e) {
            return e || T(t, 2, this.length), this[t] | this[t + 1] << 8
        }, c.prototype.readUInt16BE = function (t, e) {
            return e || T(t, 2, this.length), this[t] << 8 | this[t + 1]
        }, c.prototype.readUInt32LE = function (t, e) {
            return e || T(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }, c.prototype.readUInt32BE = function (t, e) {
            return e || T(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }, c.prototype.readIntLE = function (t, e, n) {
            t |= 0, e |= 0, n || T(t, e, this.length);
            for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
            return r >= (i *= 128) && (r -= Math.pow(2, 8 * e)), r
        }, c.prototype.readIntBE = function (t, e, n) {
            t |= 0, e |= 0, n || T(t, e, this.length);
            for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256);) o += this[t + --r] * i;
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o
        }, c.prototype.readInt8 = function (t, e) {
            return e || T(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        }, c.prototype.readInt16LE = function (t, e) {
            e || T(t, 2, this.length);
            var n = this[t] | this[t + 1] << 8;
            return 32768 & n ? 4294901760 | n : n
        }, c.prototype.readInt16BE = function (t, e) {
            e || T(t, 2, this.length);
            var n = this[t + 1] | this[t] << 8;
            return 32768 & n ? 4294901760 | n : n
        }, c.prototype.readInt32LE = function (t, e) {
            return e || T(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }, c.prototype.readInt32BE = function (t, e) {
            return e || T(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }, c.prototype.readFloatLE = function (t, e) {
            return e || T(t, 4, this.length), i.read(this, t, !0, 23, 4)
        }, c.prototype.readFloatBE = function (t, e) {
            return e || T(t, 4, this.length), i.read(this, t, !1, 23, 4)
        }, c.prototype.readDoubleLE = function (t, e) {
            return e || T(t, 8, this.length), i.read(this, t, !0, 52, 8)
        }, c.prototype.readDoubleBE = function (t, e) {
            return e || T(t, 8, this.length), i.read(this, t, !1, 52, 8)
        }, c.prototype.writeUIntLE = function (t, e, n, r) {
            t = +t, e |= 0, n |= 0, r || R(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
            var i = 1, o = 0;
            for (this[e] = 255 & t; ++o < n && (i *= 256);) this[e + o] = t / i & 255;
            return e + n
        }, c.prototype.writeUIntBE = function (t, e, n, r) {
            t = +t, e |= 0, n |= 0, r || R(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
            var i = n - 1, o = 1;
            for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) this[e + i] = t / o & 255;
            return e + n
        }, c.prototype.writeUInt8 = function (t, e, n) {
            return t = +t, e |= 0, n || R(this, t, e, 1, 255, 0), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
        }, c.prototype.writeUInt16LE = function (t, e, n) {
            return t = +t, e |= 0, n || R(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : D(this, t, e, !0), e + 2
        }, c.prototype.writeUInt16BE = function (t, e, n) {
            return t = +t, e |= 0, n || R(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : D(this, t, e, !1), e + 2
        }, c.prototype.writeUInt32LE = function (t, e, n) {
            return t = +t, e |= 0, n || R(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : O(this, t, e, !0), e + 4
        }, c.prototype.writeUInt32BE = function (t, e, n) {
            return t = +t, e |= 0, n || R(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : O(this, t, e, !1), e + 4
        }, c.prototype.writeIntLE = function (t, e, n, r) {
            if (t = +t, e |= 0, !r) {
                var i = Math.pow(2, 8 * n - 1);
                R(this, t, e, n, i - 1, -i)
            }
            var o = 0, a = 1, s = 0;
            for (this[e] = 255 & t; ++o < n && (a *= 256);) t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1), this[e + o] = (t / a >> 0) - s & 255;
            return e + n
        }, c.prototype.writeIntBE = function (t, e, n, r) {
            if (t = +t, e |= 0, !r) {
                var i = Math.pow(2, 8 * n - 1);
                R(this, t, e, n, i - 1, -i)
            }
            var o = n - 1, a = 1, s = 0;
            for (this[e + o] = 255 & t; --o >= 0 && (a *= 256);) t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1), this[e + o] = (t / a >> 0) - s & 255;
            return e + n
        }, c.prototype.writeInt8 = function (t, e, n) {
            return t = +t, e |= 0, n || R(this, t, e, 1, 127, -128), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
        }, c.prototype.writeInt16LE = function (t, e, n) {
            return t = +t, e |= 0, n || R(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : D(this, t, e, !0), e + 2
        }, c.prototype.writeInt16BE = function (t, e, n) {
            return t = +t, e |= 0, n || R(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : D(this, t, e, !1), e + 2
        }, c.prototype.writeInt32LE = function (t, e, n) {
            return t = +t, e |= 0, n || R(this, t, e, 4, 2147483647, -2147483648), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : O(this, t, e, !0), e + 4
        }, c.prototype.writeInt32BE = function (t, e, n) {
            return t = +t, e |= 0, n || R(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : O(this, t, e, !1), e + 4
        }, c.prototype.writeFloatLE = function (t, e, n) {
            return N(this, t, e, !0, n)
        }, c.prototype.writeFloatBE = function (t, e, n) {
            return N(this, t, e, !1, n)
        }, c.prototype.writeDoubleLE = function (t, e, n) {
            return j(this, t, e, !0, n)
        }, c.prototype.writeDoubleBE = function (t, e, n) {
            return j(this, t, e, !1, n)
        }, c.prototype.copy = function (t, e, n, r) {
            if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (e < 0) throw new RangeError("targetStart out of bounds");
            if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
            if (r < 0) throw new RangeError("sourceEnd out of bounds");
            r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
            var i, o = r - n;
            if (this === t && n < e && e < r) for (i = o - 1; i >= 0; --i) t[i + e] = this[i + n]; else if (o < 1e3 || !c.TYPED_ARRAY_SUPPORT) for (i = 0; i < o; ++i) t[i + e] = this[i + n]; else Uint8Array.prototype.set.call(t, this.subarray(n, n + o), e);
            return o
        }, c.prototype.fill = function (t, e, n, r) {
            if ("string" == typeof t) {
                if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
                    var i = t.charCodeAt(0);
                    i < 256 && (t = i)
                }
                if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                if ("string" == typeof r && !c.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
            } else "number" == typeof t && (t &= 255);
            if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
            if (n <= e) return this;
            var o;
            if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t) for (o = e; o < n; ++o) this[o] = t; else {
                var a = c.isBuffer(t) ? t : U(new c(t, r).toString()), s = a.length;
                for (o = 0; o < n - e; ++o) this[o + e] = a[o % s]
            }
            return this
        };
        var L = /[^+\/0-9A-Za-z-_]/g;

        function Q(t) {
            return t < 16 ? "0" + t.toString(16) : t.toString(16)
        }

        function U(t, e) {
            var n;
            e = e || 1 / 0;
            for (var r = t.length, i = null, o = [], a = 0; a < r; ++a) {
                if ((n = t.charCodeAt(a)) > 55295 && n < 57344) {
                    if (!i) {
                        if (n > 56319) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        if (a + 1 === r) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        i = n;
                        continue
                    }
                    if (n < 56320) {
                        (e -= 3) > -1 && o.push(239, 191, 189), i = n;
                        continue
                    }
                    n = 65536 + (i - 55296 << 10 | n - 56320)
                } else i && (e -= 3) > -1 && o.push(239, 191, 189);
                if (i = null, n < 128) {
                    if ((e -= 1) < 0) break;
                    o.push(n)
                } else if (n < 2048) {
                    if ((e -= 2) < 0) break;
                    o.push(n >> 6 | 192, 63 & n | 128)
                } else if (n < 65536) {
                    if ((e -= 3) < 0) break;
                    o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                } else {
                    if (!(n < 1114112)) throw new Error("Invalid code point");
                    if ((e -= 4) < 0) break;
                    o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                }
            }
            return o
        }

        function F(t) {
            return r.toByteArray(function (t) {
                if ((t = function (t) {
                    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                }(t).replace(L, "")).length < 2) return "";
                for (; t.length % 4 != 0;) t += "=";
                return t
            }(t))
        }

        function Y(t, e, n, r) {
            for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); ++i) e[i + n] = t[i];
            return i
        }
    }).call(this, n(8))
}