var func3 = function (t, e, n) {
    (function (t) {
        !function (t, e) {
            "use strict";

            function r(t, e) {
                if (!t) throw new Error(e || "Assertion failed")
            }

            function i(t, e) {
                t.super_ = e;
                var n = function () {
                };
                n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
            }

            function o(t, e, n) {
                if (o.isBN(t)) return t;
                this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ("le" !== e && "be" !== e || (n = e, e = 10), this._init(t || 0, e || 10, n || "be"))
            }

            var a;
            "object" == typeof t ? t.exports = o : e.BN = o, o.BN = o, o.wordSize = 26;
            try {
                a = n(137).Buffer
            } catch (t) {
            }

            function s(t, e, n) {
                for (var r = 0, i = Math.min(t.length, n), o = e; o < i; o++) {
                    var a = t.charCodeAt(o) - 48;
                    r <<= 4, r |= a >= 49 && a <= 54 ? a - 49 + 10 : a >= 17 && a <= 22 ? a - 17 + 10 : 15 & a
                }
                return r
            }

            function c(t, e, n, r) {
                for (var i = 0, o = Math.min(t.length, n), a = e; a < o; a++) {
                    var s = t.charCodeAt(a) - 48;
                    i *= r, i += s >= 49 ? s - 49 + 10 : s >= 17 ? s - 17 + 10 : s
                }
                return i
            }

            o.isBN = function (t) {
                return t instanceof o || null !== t && "object" == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words)
            }, o.max = function (t, e) {
                return t.cmp(e) > 0 ? t : e
            }, o.min = function (t, e) {
                return t.cmp(e) < 0 ? t : e
            }, o.prototype._init = function (t, e, n) {
                if ("number" == typeof t) return this._initNumber(t, e, n);
                if ("object" == typeof t) return this._initArray(t, e, n);
                "hex" === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36);
                var i = 0;
                "-" === (t = t.toString().replace(/\s+/g, ""))[0] && i++, 16 === e ? this._parseHex(t, i) : this._parseBase(t, e, i), "-" === t[0] && (this.negative = 1), this.strip(), "le" === n && this._initArray(this.toArray(), e, n)
            }, o.prototype._initNumber = function (t, e, n) {
                t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (r(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === n && this._initArray(this.toArray(), e, n)
            }, o.prototype._initArray = function (t, e, n) {
                if (r("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                for (var i = 0; i < this.length; i++) this.words[i] = 0;
                var o, a, s = 0;
                if ("be" === n) for (i = t.length - 1, o = 0; i >= 0; i -= 3) a = t[i] | t[i - 1] << 8 | t[i - 2] << 16, this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, o++); else if ("le" === n) for (i = 0, o = 0; i < t.length; i += 3) a = t[i] | t[i + 1] << 8 | t[i + 2] << 16, this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, o++);
                return this.strip()
            }, o.prototype._parseHex = function (t, e) {
                this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
                for (var n = 0; n < this.length; n++) this.words[n] = 0;
                var r, i, o = 0;
                for (n = t.length - 6, r = 0; n >= e; n -= 6) i = s(t, n, n + 6), this.words[r] |= i << o & 67108863, this.words[r + 1] |= i >>> 26 - o & 4194303, (o += 24) >= 26 && (o -= 26, r++);
                n + 6 !== e && (i = s(t, e, n + 6), this.words[r] |= i << o & 67108863, this.words[r + 1] |= i >>> 26 - o & 4194303), this.strip()
            }, o.prototype._parseBase = function (t, e, n) {
                this.words = [0], this.length = 1;
                for (var r = 0, i = 1; i <= 67108863; i *= e) r++;
                r--, i = i / e | 0;
                for (var o = t.length - n, a = o % r, s = Math.min(o, o - a) + n, f = 0, u = n; u < s; u += r) f = c(t, u, u + r, e), this.imuln(i), this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
                if (0 !== a) {
                    var l = 1;
                    for (f = c(t, u, t.length, e), u = 0; u < a; u++) l *= e;
                    this.imuln(l), this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f)
                }
            }, o.prototype.copy = function (t) {
                t.words = new Array(this.length);
                for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
                t.length = this.length, t.negative = this.negative, t.red = this.red
            }, o.prototype.clone = function () {
                var t = new o(null);
                return this.copy(t), t
            }, o.prototype._expand = function (t) {
                for (; this.length < t;) this.words[this.length++] = 0;
                return this
            }, o.prototype.strip = function () {
                for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                return this._normSign()
            }, o.prototype._normSign = function () {
                return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
            }, o.prototype.inspect = function () {
                return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
            };
            var f = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                u = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                l = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

            function h(t, e, n) {
                n.negative = e.negative ^ t.negative;
                var r = t.length + e.length | 0;
                n.length = r, r = r - 1 | 0;
                var i = 0 | t.words[0], o = 0 | e.words[0], a = i * o, s = 67108863 & a, c = a / 67108864 | 0;
                n.words[0] = s;
                for (var f = 1; f < r; f++) {
                    for (var u = c >>> 26, l = 67108863 & c, h = Math.min(f, e.length - 1), d = Math.max(0, f - t.length + 1); d <= h; d++) {
                        var p = f - d | 0;
                        u += (a = (i = 0 | t.words[p]) * (o = 0 | e.words[d]) + l) / 67108864 | 0, l = 67108863 & a
                    }
                    n.words[f] = 0 | l, c = 0 | u
                }
                return 0 !== c ? n.words[f] = 0 | c : n.length--, n.strip()
            }

            o.prototype.toString = function (t, e) {
                var n;
                if (t = t || 10, e = 0 | e || 1, 16 === t || "hex" === t) {
                    n = "";
                    for (var i = 0, o = 0, a = 0; a < this.length; a++) {
                        var s = this.words[a], c = (16777215 & (s << i | o)).toString(16);
                        n = 0 != (o = s >>> 24 - i & 16777215) || a !== this.length - 1 ? f[6 - c.length] + c + n : c + n, (i += 2) >= 26 && (i -= 26, a--)
                    }
                    for (0 !== o && (n = o.toString(16) + n); n.length % e != 0;) n = "0" + n;
                    return 0 !== this.negative && (n = "-" + n), n
                }
                if (t === (0 | t) && t >= 2 && t <= 36) {
                    var h = u[t], d = l[t];
                    n = "";
                    var p = this.clone();
                    for (p.negative = 0; !p.isZero();) {
                        var b = p.modn(d).toString(t);
                        n = (p = p.idivn(d)).isZero() ? b + n : f[h - b.length] + b + n
                    }
                    for (this.isZero() && (n = "0" + n); n.length % e != 0;) n = "0" + n;
                    return 0 !== this.negative && (n = "-" + n), n
                }
                r(!1, "Base should be between 2 and 36")
            }, o.prototype.toNumber = function () {
                var t = this.words[0];
                return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
            }, o.prototype.toJSON = function () {
                return this.toString(16)
            }, o.prototype.toBuffer = function (t, e) {
                return r(void 0 !== a), this.toArrayLike(a, t, e)
            }, o.prototype.toArray = function (t, e) {
                return this.toArrayLike(Array, t, e)
            }, o.prototype.toArrayLike = function (t, e, n) {
                var i = this.byteLength(), o = n || Math.max(1, i);
                r(i <= o, "byte array longer than desired length"), r(o > 0, "Requested array length <= 0"), this.strip();
                var a, s, c = "le" === e, f = new t(o), u = this.clone();
                if (c) {
                    for (s = 0; !u.isZero(); s++) a = u.andln(255), u.iushrn(8), f[s] = a;
                    for (; s < o; s++) f[s] = 0
                } else {
                    for (s = 0; s < o - i; s++) f[s] = 0;
                    for (s = 0; !u.isZero(); s++) a = u.andln(255), u.iushrn(8), f[o - s - 1] = a
                }
                return f
            }, Math.clz32 ? o.prototype._countBits = function (t) {
                return 32 - Math.clz32(t)
            } : o.prototype._countBits = function (t) {
                var e = t, n = 0;
                return e >= 4096 && (n += 13, e >>>= 13), e >= 64 && (n += 7, e >>>= 7), e >= 8 && (n += 4, e >>>= 4), e >= 2 && (n += 2, e >>>= 2), n + e
            }, o.prototype._zeroBits = function (t) {
                if (0 === t) return 26;
                var e = t, n = 0;
                return 0 == (8191 & e) && (n += 13, e >>>= 13), 0 == (127 & e) && (n += 7, e >>>= 7), 0 == (15 & e) && (n += 4, e >>>= 4), 0 == (3 & e) && (n += 2, e >>>= 2), 0 == (1 & e) && n++, n
            }, o.prototype.bitLength = function () {
                var t = this.words[this.length - 1], e = this._countBits(t);
                return 26 * (this.length - 1) + e
            }, o.prototype.zeroBits = function () {
                if (this.isZero()) return 0;
                for (var t = 0, e = 0; e < this.length; e++) {
                    var n = this._zeroBits(this.words[e]);
                    if (t += n, 26 !== n) break
                }
                return t
            }, o.prototype.byteLength = function () {
                return Math.ceil(this.bitLength() / 8)
            }, o.prototype.toTwos = function (t) {
                return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
            }, o.prototype.fromTwos = function (t) {
                return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
            }, o.prototype.isNeg = function () {
                return 0 !== this.negative
            }, o.prototype.neg = function () {
                return this.clone().ineg()
            }, o.prototype.ineg = function () {
                return this.isZero() || (this.negative ^= 1), this
            }, o.prototype.iuor = function (t) {
                for (; this.length < t.length;) this.words[this.length++] = 0;
                for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
                return this.strip()
            }, o.prototype.ior = function (t) {
                return r(0 == (this.negative | t.negative)), this.iuor(t)
            }, o.prototype.or = function (t) {
                return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
            }, o.prototype.uor = function (t) {
                return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
            }, o.prototype.iuand = function (t) {
                var e;
                e = this.length > t.length ? t : this;
                for (var n = 0; n < e.length; n++) this.words[n] = this.words[n] & t.words[n];
                return this.length = e.length, this.strip()
            }, o.prototype.iand = function (t) {
                return r(0 == (this.negative | t.negative)), this.iuand(t)
            }, o.prototype.and = function (t) {
                return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
            }, o.prototype.uand = function (t) {
                return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
            }, o.prototype.iuxor = function (t) {
                var e, n;
                this.length > t.length ? (e = this, n = t) : (e = t, n = this);
                for (var r = 0; r < n.length; r++) this.words[r] = e.words[r] ^ n.words[r];
                if (this !== e) for (; r < e.length; r++) this.words[r] = e.words[r];
                return this.length = e.length, this.strip()
            }, o.prototype.ixor = function (t) {
                return r(0 == (this.negative | t.negative)), this.iuxor(t)
            }, o.prototype.xor = function (t) {
                return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
            }, o.prototype.uxor = function (t) {
                return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
            }, o.prototype.inotn = function (t) {
                r("number" == typeof t && t >= 0);
                var e = 0 | Math.ceil(t / 26), n = t % 26;
                this._expand(e), n > 0 && e--;
                for (var i = 0; i < e; i++) this.words[i] = 67108863 & ~this.words[i];
                return n > 0 && (this.words[i] = ~this.words[i] & 67108863 >> 26 - n), this.strip()
            }, o.prototype.notn = function (t) {
                return this.clone().inotn(t)
            }, o.prototype.setn = function (t, e) {
                r("number" == typeof t && t >= 0);
                var n = t / 26 | 0, i = t % 26;
                return this._expand(n + 1), this.words[n] = e ? this.words[n] | 1 << i : this.words[n] & ~(1 << i), this.strip()
            }, o.prototype.iadd = function (t) {
                var e, n, r;
                if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
                if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
                this.length > t.length ? (n = this, r = t) : (n = t, r = this);
                for (var i = 0, o = 0; o < r.length; o++) e = (0 | n.words[o]) + (0 | r.words[o]) + i, this.words[o] = 67108863 & e, i = e >>> 26;
                for (; 0 !== i && o < n.length; o++) e = (0 | n.words[o]) + i, this.words[o] = 67108863 & e, i = e >>> 26;
                if (this.length = n.length, 0 !== i) this.words[this.length] = i, this.length++; else if (n !== this) for (; o < n.length; o++) this.words[o] = n.words[o];
                return this
            }, o.prototype.add = function (t) {
                var e;
                return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
            }, o.prototype.isub = function (t) {
                if (0 !== t.negative) {
                    t.negative = 0;
                    var e = this.iadd(t);
                    return t.negative = 1, e._normSign()
                }
                if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                var n, r, i = this.cmp(t);
                if (0 === i) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                i > 0 ? (n = this, r = t) : (n = t, r = this);
                for (var o = 0, a = 0; a < r.length; a++) o = (e = (0 | n.words[a]) - (0 | r.words[a]) + o) >> 26, this.words[a] = 67108863 & e;
                for (; 0 !== o && a < n.length; a++) o = (e = (0 | n.words[a]) + o) >> 26, this.words[a] = 67108863 & e;
                if (0 === o && a < n.length && n !== this) for (; a < n.length; a++) this.words[a] = n.words[a];
                return this.length = Math.max(this.length, a), n !== this && (this.negative = 1), this.strip()
            }, o.prototype.sub = function (t) {
                return this.clone().isub(t)
            };
            var d = function (t, e, n) {
                var r, i, o, a = t.words, s = e.words, c = n.words, f = 0, u = 0 | a[0], l = 8191 & u, h = u >>> 13,
                    d = 0 | a[1], p = 8191 & d, b = d >>> 13, g = 0 | a[2], y = 8191 & g, m = g >>> 13, v = 0 | a[3],
                    A = 8191 & v, w = v >>> 13, _ = 0 | a[4], E = 8191 & _, x = _ >>> 13, C = 0 | a[5], B = 8191 & C,
                    S = C >>> 13, k = 0 | a[6], I = 8191 & k, M = k >>> 13, T = 0 | a[7], R = 8191 & T, D = T >>> 13,
                    O = 0 | a[8], P = 8191 & O, N = O >>> 13, j = 0 | a[9], L = 8191 & j, Q = j >>> 13, U = 0 | s[0],
                    F = 8191 & U, Y = U >>> 13, H = 0 | s[1], z = 8191 & H, V = H >>> 13, $ = 0 | s[2], G = 8191 & $,
                    J = $ >>> 13, q = 0 | s[3], W = 8191 & q, X = q >>> 13, K = 0 | s[4], Z = 8191 & K, tt = K >>> 13,
                    et = 0 | s[5], nt = 8191 & et, rt = et >>> 13, it = 0 | s[6], ot = 8191 & it, at = it >>> 13,
                    st = 0 | s[7], ct = 8191 & st, ft = st >>> 13, ut = 0 | s[8], lt = 8191 & ut, ht = ut >>> 13,
                    dt = 0 | s[9], pt = 8191 & dt, bt = dt >>> 13;
                n.negative = t.negative ^ e.negative, n.length = 19;
                var gt = (f + (r = Math.imul(l, F)) | 0) + ((8191 & (i = (i = Math.imul(l, Y)) + Math.imul(h, F) | 0)) << 13) | 0;
                f = ((o = Math.imul(h, Y)) + (i >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, r = Math.imul(p, F), i = (i = Math.imul(p, Y)) + Math.imul(b, F) | 0, o = Math.imul(b, Y);
                var yt = (f + (r = r + Math.imul(l, z) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, V) | 0) + Math.imul(h, z) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(h, V) | 0) + (i >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, r = Math.imul(y, F), i = (i = Math.imul(y, Y)) + Math.imul(m, F) | 0, o = Math.imul(m, Y), r = r + Math.imul(p, z) | 0, i = (i = i + Math.imul(p, V) | 0) + Math.imul(b, z) | 0, o = o + Math.imul(b, V) | 0;
                var mt = (f + (r = r + Math.imul(l, G) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, J) | 0) + Math.imul(h, G) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(h, J) | 0) + (i >>> 13) | 0) + (mt >>> 26) | 0, mt &= 67108863, r = Math.imul(A, F), i = (i = Math.imul(A, Y)) + Math.imul(w, F) | 0, o = Math.imul(w, Y), r = r + Math.imul(y, z) | 0, i = (i = i + Math.imul(y, V) | 0) + Math.imul(m, z) | 0, o = o + Math.imul(m, V) | 0, r = r + Math.imul(p, G) | 0, i = (i = i + Math.imul(p, J) | 0) + Math.imul(b, G) | 0, o = o + Math.imul(b, J) | 0;
                var vt = (f + (r = r + Math.imul(l, W) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, X) | 0) + Math.imul(h, W) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(h, X) | 0) + (i >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, r = Math.imul(E, F), i = (i = Math.imul(E, Y)) + Math.imul(x, F) | 0, o = Math.imul(x, Y), r = r + Math.imul(A, z) | 0, i = (i = i + Math.imul(A, V) | 0) + Math.imul(w, z) | 0, o = o + Math.imul(w, V) | 0, r = r + Math.imul(y, G) | 0, i = (i = i + Math.imul(y, J) | 0) + Math.imul(m, G) | 0, o = o + Math.imul(m, J) | 0, r = r + Math.imul(p, W) | 0, i = (i = i + Math.imul(p, X) | 0) + Math.imul(b, W) | 0, o = o + Math.imul(b, X) | 0;
                var At = (f + (r = r + Math.imul(l, Z) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, tt) | 0) + Math.imul(h, Z) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(h, tt) | 0) + (i >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, r = Math.imul(B, F), i = (i = Math.imul(B, Y)) + Math.imul(S, F) | 0, o = Math.imul(S, Y), r = r + Math.imul(E, z) | 0, i = (i = i + Math.imul(E, V) | 0) + Math.imul(x, z) | 0, o = o + Math.imul(x, V) | 0, r = r + Math.imul(A, G) | 0, i = (i = i + Math.imul(A, J) | 0) + Math.imul(w, G) | 0, o = o + Math.imul(w, J) | 0, r = r + Math.imul(y, W) | 0, i = (i = i + Math.imul(y, X) | 0) + Math.imul(m, W) | 0, o = o + Math.imul(m, X) | 0, r = r + Math.imul(p, Z) | 0, i = (i = i + Math.imul(p, tt) | 0) + Math.imul(b, Z) | 0, o = o + Math.imul(b, tt) | 0;
                var wt = (f + (r = r + Math.imul(l, nt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, rt) | 0) + Math.imul(h, nt) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(h, rt) | 0) + (i >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, r = Math.imul(I, F), i = (i = Math.imul(I, Y)) + Math.imul(M, F) | 0, o = Math.imul(M, Y), r = r + Math.imul(B, z) | 0, i = (i = i + Math.imul(B, V) | 0) + Math.imul(S, z) | 0, o = o + Math.imul(S, V) | 0, r = r + Math.imul(E, G) | 0, i = (i = i + Math.imul(E, J) | 0) + Math.imul(x, G) | 0, o = o + Math.imul(x, J) | 0, r = r + Math.imul(A, W) | 0, i = (i = i + Math.imul(A, X) | 0) + Math.imul(w, W) | 0, o = o + Math.imul(w, X) | 0, r = r + Math.imul(y, Z) | 0, i = (i = i + Math.imul(y, tt) | 0) + Math.imul(m, Z) | 0, o = o + Math.imul(m, tt) | 0, r = r + Math.imul(p, nt) | 0, i = (i = i + Math.imul(p, rt) | 0) + Math.imul(b, nt) | 0, o = o + Math.imul(b, rt) | 0;
                var _t = (f + (r = r + Math.imul(l, ot) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, at) | 0) + Math.imul(h, ot) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(h, at) | 0) + (i >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, r = Math.imul(R, F), i = (i = Math.imul(R, Y)) + Math.imul(D, F) | 0, o = Math.imul(D, Y), r = r + Math.imul(I, z) | 0, i = (i = i + Math.imul(I, V) | 0) + Math.imul(M, z) | 0, o = o + Math.imul(M, V) | 0, r = r + Math.imul(B, G) | 0, i = (i = i + Math.imul(B, J) | 0) + Math.imul(S, G) | 0, o = o + Math.imul(S, J) | 0, r = r + Math.imul(E, W) | 0, i = (i = i + Math.imul(E, X) | 0) + Math.imul(x, W) | 0, o = o + Math.imul(x, X) | 0, r = r + Math.imul(A, Z) | 0, i = (i = i + Math.imul(A, tt) | 0) + Math.imul(w, Z) | 0, o = o + Math.imul(w, tt) | 0, r = r + Math.imul(y, nt) | 0, i = (i = i + Math.imul(y, rt) | 0) + Math.imul(m, nt) | 0, o = o + Math.imul(m, rt) | 0, r = r + Math.imul(p, ot) | 0, i = (i = i + Math.imul(p, at) | 0) + Math.imul(b, ot) | 0, o = o + Math.imul(b, at) | 0;
                var Et = (f + (r = r + Math.imul(l, ct) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, ft) | 0) + Math.imul(h, ct) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(h, ft) | 0) + (i >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, r = Math.imul(P, F), i = (i = Math.imul(P, Y)) + Math.imul(N, F) | 0, o = Math.imul(N, Y), r = r + Math.imul(R, z) | 0, i = (i = i + Math.imul(R, V) | 0) + Math.imul(D, z) | 0, o = o + Math.imul(D, V) | 0, r = r + Math.imul(I, G) | 0, i = (i = i + Math.imul(I, J) | 0) + Math.imul(M, G) | 0, o = o + Math.imul(M, J) | 0, r = r + Math.imul(B, W) | 0, i = (i = i + Math.imul(B, X) | 0) + Math.imul(S, W) | 0, o = o + Math.imul(S, X) | 0, r = r + Math.imul(E, Z) | 0, i = (i = i + Math.imul(E, tt) | 0) + Math.imul(x, Z) | 0, o = o + Math.imul(x, tt) | 0, r = r + Math.imul(A, nt) | 0, i = (i = i + Math.imul(A, rt) | 0) + Math.imul(w, nt) | 0, o = o + Math.imul(w, rt) | 0, r = r + Math.imul(y, ot) | 0, i = (i = i + Math.imul(y, at) | 0) + Math.imul(m, ot) | 0, o = o + Math.imul(m, at) | 0, r = r + Math.imul(p, ct) | 0, i = (i = i + Math.imul(p, ft) | 0) + Math.imul(b, ct) | 0, o = o + Math.imul(b, ft) | 0;
                var xt = (f + (r = r + Math.imul(l, lt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, ht) | 0) + Math.imul(h, lt) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(h, ht) | 0) + (i >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, r = Math.imul(L, F), i = (i = Math.imul(L, Y)) + Math.imul(Q, F) | 0, o = Math.imul(Q, Y), r = r + Math.imul(P, z) | 0, i = (i = i + Math.imul(P, V) | 0) + Math.imul(N, z) | 0, o = o + Math.imul(N, V) | 0, r = r + Math.imul(R, G) | 0, i = (i = i + Math.imul(R, J) | 0) + Math.imul(D, G) | 0, o = o + Math.imul(D, J) | 0, r = r + Math.imul(I, W) | 0, i = (i = i + Math.imul(I, X) | 0) + Math.imul(M, W) | 0, o = o + Math.imul(M, X) | 0, r = r + Math.imul(B, Z) | 0, i = (i = i + Math.imul(B, tt) | 0) + Math.imul(S, Z) | 0, o = o + Math.imul(S, tt) | 0, r = r + Math.imul(E, nt) | 0, i = (i = i + Math.imul(E, rt) | 0) + Math.imul(x, nt) | 0, o = o + Math.imul(x, rt) | 0, r = r + Math.imul(A, ot) | 0, i = (i = i + Math.imul(A, at) | 0) + Math.imul(w, ot) | 0, o = o + Math.imul(w, at) | 0, r = r + Math.imul(y, ct) | 0, i = (i = i + Math.imul(y, ft) | 0) + Math.imul(m, ct) | 0, o = o + Math.imul(m, ft) | 0, r = r + Math.imul(p, lt) | 0, i = (i = i + Math.imul(p, ht) | 0) + Math.imul(b, lt) | 0, o = o + Math.imul(b, ht) | 0;
                var Ct = (f + (r = r + Math.imul(l, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, bt) | 0) + Math.imul(h, pt) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(h, bt) | 0) + (i >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, r = Math.imul(L, z), i = (i = Math.imul(L, V)) + Math.imul(Q, z) | 0, o = Math.imul(Q, V), r = r + Math.imul(P, G) | 0, i = (i = i + Math.imul(P, J) | 0) + Math.imul(N, G) | 0, o = o + Math.imul(N, J) | 0, r = r + Math.imul(R, W) | 0, i = (i = i + Math.imul(R, X) | 0) + Math.imul(D, W) | 0, o = o + Math.imul(D, X) | 0, r = r + Math.imul(I, Z) | 0, i = (i = i + Math.imul(I, tt) | 0) + Math.imul(M, Z) | 0, o = o + Math.imul(M, tt) | 0, r = r + Math.imul(B, nt) | 0, i = (i = i + Math.imul(B, rt) | 0) + Math.imul(S, nt) | 0, o = o + Math.imul(S, rt) | 0, r = r + Math.imul(E, ot) | 0, i = (i = i + Math.imul(E, at) | 0) + Math.imul(x, ot) | 0, o = o + Math.imul(x, at) | 0, r = r + Math.imul(A, ct) | 0, i = (i = i + Math.imul(A, ft) | 0) + Math.imul(w, ct) | 0, o = o + Math.imul(w, ft) | 0, r = r + Math.imul(y, lt) | 0, i = (i = i + Math.imul(y, ht) | 0) + Math.imul(m, lt) | 0, o = o + Math.imul(m, ht) | 0;
                var Bt = (f + (r = r + Math.imul(p, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(p, bt) | 0) + Math.imul(b, pt) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(b, bt) | 0) + (i >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, r = Math.imul(L, G), i = (i = Math.imul(L, J)) + Math.imul(Q, G) | 0, o = Math.imul(Q, J), r = r + Math.imul(P, W) | 0, i = (i = i + Math.imul(P, X) | 0) + Math.imul(N, W) | 0, o = o + Math.imul(N, X) | 0, r = r + Math.imul(R, Z) | 0, i = (i = i + Math.imul(R, tt) | 0) + Math.imul(D, Z) | 0, o = o + Math.imul(D, tt) | 0, r = r + Math.imul(I, nt) | 0, i = (i = i + Math.imul(I, rt) | 0) + Math.imul(M, nt) | 0, o = o + Math.imul(M, rt) | 0, r = r + Math.imul(B, ot) | 0, i = (i = i + Math.imul(B, at) | 0) + Math.imul(S, ot) | 0, o = o + Math.imul(S, at) | 0, r = r + Math.imul(E, ct) | 0, i = (i = i + Math.imul(E, ft) | 0) + Math.imul(x, ct) | 0, o = o + Math.imul(x, ft) | 0, r = r + Math.imul(A, lt) | 0, i = (i = i + Math.imul(A, ht) | 0) + Math.imul(w, lt) | 0, o = o + Math.imul(w, ht) | 0;
                var St = (f + (r = r + Math.imul(y, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(y, bt) | 0) + Math.imul(m, pt) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(m, bt) | 0) + (i >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, r = Math.imul(L, W), i = (i = Math.imul(L, X)) + Math.imul(Q, W) | 0, o = Math.imul(Q, X), r = r + Math.imul(P, Z) | 0, i = (i = i + Math.imul(P, tt) | 0) + Math.imul(N, Z) | 0, o = o + Math.imul(N, tt) | 0, r = r + Math.imul(R, nt) | 0, i = (i = i + Math.imul(R, rt) | 0) + Math.imul(D, nt) | 0, o = o + Math.imul(D, rt) | 0, r = r + Math.imul(I, ot) | 0, i = (i = i + Math.imul(I, at) | 0) + Math.imul(M, ot) | 0, o = o + Math.imul(M, at) | 0, r = r + Math.imul(B, ct) | 0, i = (i = i + Math.imul(B, ft) | 0) + Math.imul(S, ct) | 0, o = o + Math.imul(S, ft) | 0, r = r + Math.imul(E, lt) | 0, i = (i = i + Math.imul(E, ht) | 0) + Math.imul(x, lt) | 0, o = o + Math.imul(x, ht) | 0;
                var kt = (f + (r = r + Math.imul(A, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(A, bt) | 0) + Math.imul(w, pt) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(w, bt) | 0) + (i >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, r = Math.imul(L, Z), i = (i = Math.imul(L, tt)) + Math.imul(Q, Z) | 0, o = Math.imul(Q, tt), r = r + Math.imul(P, nt) | 0, i = (i = i + Math.imul(P, rt) | 0) + Math.imul(N, nt) | 0, o = o + Math.imul(N, rt) | 0, r = r + Math.imul(R, ot) | 0, i = (i = i + Math.imul(R, at) | 0) + Math.imul(D, ot) | 0, o = o + Math.imul(D, at) | 0, r = r + Math.imul(I, ct) | 0, i = (i = i + Math.imul(I, ft) | 0) + Math.imul(M, ct) | 0, o = o + Math.imul(M, ft) | 0, r = r + Math.imul(B, lt) | 0, i = (i = i + Math.imul(B, ht) | 0) + Math.imul(S, lt) | 0, o = o + Math.imul(S, ht) | 0;
                var It = (f + (r = r + Math.imul(E, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(E, bt) | 0) + Math.imul(x, pt) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(x, bt) | 0) + (i >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, r = Math.imul(L, nt), i = (i = Math.imul(L, rt)) + Math.imul(Q, nt) | 0, o = Math.imul(Q, rt), r = r + Math.imul(P, ot) | 0, i = (i = i + Math.imul(P, at) | 0) + Math.imul(N, ot) | 0, o = o + Math.imul(N, at) | 0, r = r + Math.imul(R, ct) | 0, i = (i = i + Math.imul(R, ft) | 0) + Math.imul(D, ct) | 0, o = o + Math.imul(D, ft) | 0, r = r + Math.imul(I, lt) | 0, i = (i = i + Math.imul(I, ht) | 0) + Math.imul(M, lt) | 0, o = o + Math.imul(M, ht) | 0;
                var Mt = (f + (r = r + Math.imul(B, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(B, bt) | 0) + Math.imul(S, pt) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(S, bt) | 0) + (i >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, r = Math.imul(L, ot), i = (i = Math.imul(L, at)) + Math.imul(Q, ot) | 0, o = Math.imul(Q, at), r = r + Math.imul(P, ct) | 0, i = (i = i + Math.imul(P, ft) | 0) + Math.imul(N, ct) | 0, o = o + Math.imul(N, ft) | 0, r = r + Math.imul(R, lt) | 0, i = (i = i + Math.imul(R, ht) | 0) + Math.imul(D, lt) | 0, o = o + Math.imul(D, ht) | 0;
                var Tt = (f + (r = r + Math.imul(I, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(I, bt) | 0) + Math.imul(M, pt) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(M, bt) | 0) + (i >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, r = Math.imul(L, ct), i = (i = Math.imul(L, ft)) + Math.imul(Q, ct) | 0, o = Math.imul(Q, ft), r = r + Math.imul(P, lt) | 0, i = (i = i + Math.imul(P, ht) | 0) + Math.imul(N, lt) | 0, o = o + Math.imul(N, ht) | 0;
                var Rt = (f + (r = r + Math.imul(R, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(R, bt) | 0) + Math.imul(D, pt) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(D, bt) | 0) + (i >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863, r = Math.imul(L, lt), i = (i = Math.imul(L, ht)) + Math.imul(Q, lt) | 0, o = Math.imul(Q, ht);
                var Dt = (f + (r = r + Math.imul(P, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(P, bt) | 0) + Math.imul(N, pt) | 0)) << 13) | 0;
                f = ((o = o + Math.imul(N, bt) | 0) + (i >>> 13) | 0) + (Dt >>> 26) | 0, Dt &= 67108863;
                var Ot = (f + (r = Math.imul(L, pt)) | 0) + ((8191 & (i = (i = Math.imul(L, bt)) + Math.imul(Q, pt) | 0)) << 13) | 0;
                return f = ((o = Math.imul(Q, bt)) + (i >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, c[0] = gt, c[1] = yt, c[2] = mt, c[3] = vt, c[4] = At, c[5] = wt, c[6] = _t, c[7] = Et, c[8] = xt, c[9] = Ct, c[10] = Bt, c[11] = St, c[12] = kt, c[13] = It, c[14] = Mt, c[15] = Tt, c[16] = Rt, c[17] = Dt, c[18] = Ot, 0 !== f && (c[19] = f, n.length++), n
            };

            function p(t, e, n) {
                return (new b).mulp(t, e, n)
            }

            function b(t, e) {
                this.x = t, this.y = e
            }

            Math.imul || (d = h), o.prototype.mulTo = function (t, e) {
                var n = this.length + t.length;
                return 10 === this.length && 10 === t.length ? d(this, t, e) : n < 63 ? h(this, t, e) : n < 1024 ? function (t, e, n) {
                    n.negative = e.negative ^ t.negative, n.length = t.length + e.length;
                    for (var r = 0, i = 0, o = 0; o < n.length - 1; o++) {
                        var a = i;
                        i = 0;
                        for (var s = 67108863 & r, c = Math.min(o, e.length - 1), f = Math.max(0, o - t.length + 1); f <= c; f++) {
                            var u = o - f, l = (0 | t.words[u]) * (0 | e.words[f]), h = 67108863 & l;
                            s = 67108863 & (h = h + s | 0), i += (a = (a = a + (l / 67108864 | 0) | 0) + (h >>> 26) | 0) >>> 26, a &= 67108863
                        }
                        n.words[o] = s, r = a, a = i
                    }
                    return 0 !== r ? n.words[o] = r : n.length--, n.strip()
                }(this, t, e) : p(this, t, e)
            }, b.prototype.makeRBT = function (t) {
                for (var e = new Array(t), n = o.prototype._countBits(t) - 1, r = 0; r < t; r++) e[r] = this.revBin(r, n, t);
                return e
            }, b.prototype.revBin = function (t, e, n) {
                if (0 === t || t === n - 1) return t;
                for (var r = 0, i = 0; i < e; i++) r |= (1 & t) << e - i - 1, t >>= 1;
                return r
            }, b.prototype.permute = function (t, e, n, r, i, o) {
                for (var a = 0; a < o; a++) r[a] = e[t[a]], i[a] = n[t[a]]
            }, b.prototype.transform = function (t, e, n, r, i, o) {
                this.permute(o, t, e, n, r, i);
                for (var a = 1; a < i; a <<= 1) for (var s = a << 1, c = Math.cos(2 * Math.PI / s), f = Math.sin(2 * Math.PI / s), u = 0; u < i; u += s) for (var l = c, h = f, d = 0; d < a; d++) {
                    var p = n[u + d], b = r[u + d], g = n[u + d + a], y = r[u + d + a], m = l * g - h * y;
                    y = l * y + h * g, g = m, n[u + d] = p + g, r[u + d] = b + y, n[u + d + a] = p - g, r[u + d + a] = b - y, d !== s && (m = c * l - f * h, h = c * h + f * l, l = m)
                }
            }, b.prototype.guessLen13b = function (t, e) {
                var n = 1 | Math.max(e, t), r = 1 & n, i = 0;
                for (n = n / 2 | 0; n; n >>>= 1) i++;
                return 1 << i + 1 + r
            }, b.prototype.conjugate = function (t, e, n) {
                if (!(n <= 1)) for (var r = 0; r < n / 2; r++) {
                    var i = t[r];
                    t[r] = t[n - r - 1], t[n - r - 1] = i, i = e[r], e[r] = -e[n - r - 1], e[n - r - 1] = -i
                }
            }, b.prototype.normalize13b = function (t, e) {
                for (var n = 0, r = 0; r < e / 2; r++) {
                    var i = 8192 * Math.round(t[2 * r + 1] / e) + Math.round(t[2 * r] / e) + n;
                    t[r] = 67108863 & i, n = i < 67108864 ? 0 : i / 67108864 | 0
                }
                return t
            }, b.prototype.convert13b = function (t, e, n, i) {
                for (var o = 0, a = 0; a < e; a++) o += 0 | t[a], n[2 * a] = 8191 & o, o >>>= 13, n[2 * a + 1] = 8191 & o, o >>>= 13;
                for (a = 2 * e; a < i; ++a) n[a] = 0;
                r(0 === o), r(0 == (-8192 & o))
            }, b.prototype.stub = function (t) {
                for (var e = new Array(t), n = 0; n < t; n++) e[n] = 0;
                return e
            }, b.prototype.mulp = function (t, e, n) {
                var r = 2 * this.guessLen13b(t.length, e.length), i = this.makeRBT(r), o = this.stub(r),
                    a = new Array(r), s = new Array(r), c = new Array(r), f = new Array(r), u = new Array(r),
                    l = new Array(r), h = n.words;
                h.length = r, this.convert13b(t.words, t.length, a, r), this.convert13b(e.words, e.length, f, r), this.transform(a, o, s, c, r, i), this.transform(f, o, u, l, r, i);
                for (var d = 0; d < r; d++) {
                    var p = s[d] * u[d] - c[d] * l[d];
                    c[d] = s[d] * l[d] + c[d] * u[d], s[d] = p
                }
                return this.conjugate(s, c, r), this.transform(s, c, h, o, r, i), this.conjugate(h, o, r), this.normalize13b(h, r), n.negative = t.negative ^ e.negative, n.length = t.length + e.length, n.strip()
            }, o.prototype.mul = function (t) {
                var e = new o(null);
                return e.words = new Array(this.length + t.length), this.mulTo(t, e)
            }, o.prototype.mulf = function (t) {
                var e = new o(null);
                return e.words = new Array(this.length + t.length), p(this, t, e)
            }, o.prototype.imul = function (t) {
                return this.clone().mulTo(t, this)
            }, o.prototype.imuln = function (t) {
                r("number" == typeof t), r(t < 67108864);
                for (var e = 0, n = 0; n < this.length; n++) {
                    var i = (0 | this.words[n]) * t, o = (67108863 & i) + (67108863 & e);
                    e >>= 26, e += i / 67108864 | 0, e += o >>> 26, this.words[n] = 67108863 & o
                }
                return 0 !== e && (this.words[n] = e, this.length++), this
            }, o.prototype.muln = function (t) {
                return this.clone().imuln(t)
            }, o.prototype.sqr = function () {
                return this.mul(this)
            }, o.prototype.isqr = function () {
                return this.imul(this.clone())
            }, o.prototype.pow = function (t) {
                var e = function (t) {
                    for (var e = new Array(t.bitLength()), n = 0; n < e.length; n++) {
                        var r = n / 26 | 0, i = n % 26;
                        e[n] = (t.words[r] & 1 << i) >>> i
                    }
                    return e
                }(t);
                if (0 === e.length) return new o(1);
                for (var n = this, r = 0; r < e.length && 0 === e[r]; r++, n = n.sqr()) ;
                if (++r < e.length) for (var i = n.sqr(); r < e.length; r++, i = i.sqr()) 0 !== e[r] && (n = n.mul(i));
                return n
            }, o.prototype.iushln = function (t) {
                r("number" == typeof t && t >= 0);
                var e, n = t % 26, i = (t - n) / 26, o = 67108863 >>> 26 - n << 26 - n;
                if (0 !== n) {
                    var a = 0;
                    for (e = 0; e < this.length; e++) {
                        var s = this.words[e] & o, c = (0 | this.words[e]) - s << n;
                        this.words[e] = c | a, a = s >>> 26 - n
                    }
                    a && (this.words[e] = a, this.length++)
                }
                if (0 !== i) {
                    for (e = this.length - 1; e >= 0; e--) this.words[e + i] = this.words[e];
                    for (e = 0; e < i; e++) this.words[e] = 0;
                    this.length += i
                }
                return this.strip()
            }, o.prototype.ishln = function (t) {
                return r(0 === this.negative), this.iushln(t)
            }, o.prototype.iushrn = function (t, e, n) {
                var i;
                r("number" == typeof t && t >= 0), i = e ? (e - e % 26) / 26 : 0;
                var o = t % 26, a = Math.min((t - o) / 26, this.length), s = 67108863 ^ 67108863 >>> o << o, c = n;
                if (i -= a, i = Math.max(0, i), c) {
                    for (var f = 0; f < a; f++) c.words[f] = this.words[f];
                    c.length = a
                }
                if (0 === a) ; else if (this.length > a) for (this.length -= a, f = 0; f < this.length; f++) this.words[f] = this.words[f + a]; else this.words[0] = 0, this.length = 1;
                var u = 0;
                for (f = this.length - 1; f >= 0 && (0 !== u || f >= i); f--) {
                    var l = 0 | this.words[f];
                    this.words[f] = u << 26 - o | l >>> o, u = l & s
                }
                return c && 0 !== u && (c.words[c.length++] = u), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip()
            }, o.prototype.ishrn = function (t, e, n) {
                return r(0 === this.negative), this.iushrn(t, e, n)
            }, o.prototype.shln = function (t) {
                return this.clone().ishln(t)
            }, o.prototype.ushln = function (t) {
                return this.clone().iushln(t)
            }, o.prototype.shrn = function (t) {
                return this.clone().ishrn(t)
            }, o.prototype.ushrn = function (t) {
                return this.clone().iushrn(t)
            }, o.prototype.testn = function (t) {
                r("number" == typeof t && t >= 0);
                var e = t % 26, n = (t - e) / 26, i = 1 << e;
                return !(this.length <= n || !(this.words[n] & i))
            }, o.prototype.imaskn = function (t) {
                r("number" == typeof t && t >= 0);
                var e = t % 26, n = (t - e) / 26;
                if (r(0 === this.negative, "imaskn works only with positive numbers"), this.length <= n) return this;
                if (0 !== e && n++, this.length = Math.min(n, this.length), 0 !== e) {
                    var i = 67108863 ^ 67108863 >>> e << e;
                    this.words[this.length - 1] &= i
                }
                return this.strip()
            }, o.prototype.maskn = function (t) {
                return this.clone().imaskn(t)
            }, o.prototype.iaddn = function (t) {
                return r("number" == typeof t), r(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t)
            }, o.prototype._iaddn = function (t) {
                this.words[0] += t;
                for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                return this.length = Math.max(this.length, e + 1), this
            }, o.prototype.isubn = function (t) {
                if (r("number" == typeof t), r(t < 67108864), t < 0) return this.iaddn(-t);
                if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1; else for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, this.words[e + 1] -= 1;
                return this.strip()
            }, o.prototype.addn = function (t) {
                return this.clone().iaddn(t)
            }, o.prototype.subn = function (t) {
                return this.clone().isubn(t)
            }, o.prototype.iabs = function () {
                return this.negative = 0, this
            }, o.prototype.abs = function () {
                return this.clone().iabs()
            }, o.prototype._ishlnsubmul = function (t, e, n) {
                var i, o, a = t.length + n;
                this._expand(a);
                var s = 0;
                for (i = 0; i < t.length; i++) {
                    o = (0 | this.words[i + n]) + s;
                    var c = (0 | t.words[i]) * e;
                    s = ((o -= 67108863 & c) >> 26) - (c / 67108864 | 0), this.words[i + n] = 67108863 & o
                }
                for (; i < this.length - n; i++) s = (o = (0 | this.words[i + n]) + s) >> 26, this.words[i + n] = 67108863 & o;
                if (0 === s) return this.strip();
                for (r(-1 === s), s = 0, i = 0; i < this.length; i++) s = (o = -(0 | this.words[i]) + s) >> 26, this.words[i] = 67108863 & o;
                return this.negative = 1, this.strip()
            }, o.prototype._wordDiv = function (t, e) {
                var n = (this.length, t.length), r = this.clone(), i = t, a = 0 | i.words[i.length - 1];
                0 != (n = 26 - this._countBits(a)) && (i = i.ushln(n), r.iushln(n), a = 0 | i.words[i.length - 1]);
                var s, c = r.length - i.length;
                if ("mod" !== e) {
                    (s = new o(null)).length = c + 1, s.words = new Array(s.length);
                    for (var f = 0; f < s.length; f++) s.words[f] = 0
                }
                var u = r.clone()._ishlnsubmul(i, 1, c);
                0 === u.negative && (r = u, s && (s.words[c] = 1));
                for (var l = c - 1; l >= 0; l--) {
                    var h = 67108864 * (0 | r.words[i.length + l]) + (0 | r.words[i.length + l - 1]);
                    for (h = Math.min(h / a | 0, 67108863), r._ishlnsubmul(i, h, l); 0 !== r.negative;) h--, r.negative = 0, r._ishlnsubmul(i, 1, l), r.isZero() || (r.negative ^= 1);
                    s && (s.words[l] = h)
                }
                return s && s.strip(), r.strip(), "div" !== e && 0 !== n && r.iushrn(n), {div: s || null, mod: r}
            }, o.prototype.divmod = function (t, e, n) {
                return r(!t.isZero()), this.isZero() ? {
                    div: new o(0),
                    mod: new o(0)
                } : 0 !== this.negative && 0 === t.negative ? (s = this.neg().divmod(t, e), "mod" !== e && (i = s.div.neg()), "div" !== e && (a = s.mod.neg(), n && 0 !== a.negative && a.iadd(t)), {
                    div: i,
                    mod: a
                }) : 0 === this.negative && 0 !== t.negative ? (s = this.divmod(t.neg(), e), "mod" !== e && (i = s.div.neg()), {
                    div: i,
                    mod: s.mod
                }) : 0 != (this.negative & t.negative) ? (s = this.neg().divmod(t.neg(), e), "div" !== e && (a = s.mod.neg(), n && 0 !== a.negative && a.isub(t)), {
                    div: s.div,
                    mod: a
                }) : t.length > this.length || this.cmp(t) < 0 ? {
                    div: new o(0),
                    mod: this
                } : 1 === t.length ? "div" === e ? {div: this.divn(t.words[0]), mod: null} : "mod" === e ? {
                    div: null,
                    mod: new o(this.modn(t.words[0]))
                } : {div: this.divn(t.words[0]), mod: new o(this.modn(t.words[0]))} : this._wordDiv(t, e);
                var i, a, s
            }, o.prototype.div = function (t) {
                return this.divmod(t, "div", !1).div
            }, o.prototype.mod = function (t) {
                return this.divmod(t, "mod", !1).mod
            }, o.prototype.umod = function (t) {
                return this.divmod(t, "mod", !0).mod
            }, o.prototype.divRound = function (t) {
                var e = this.divmod(t);
                if (e.mod.isZero()) return e.div;
                var n = 0 !== e.div.negative ? e.mod.isub(t) : e.mod, r = t.ushrn(1), i = t.andln(1), o = n.cmp(r);
                return o < 0 || 1 === i && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
            }, o.prototype.modn = function (t) {
                r(t <= 67108863);
                for (var e = (1 << 26) % t, n = 0, i = this.length - 1; i >= 0; i--) n = (e * n + (0 | this.words[i])) % t;
                return n
            }, o.prototype.idivn = function (t) {
                r(t <= 67108863);
                for (var e = 0, n = this.length - 1; n >= 0; n--) {
                    var i = (0 | this.words[n]) + 67108864 * e;
                    this.words[n] = i / t | 0, e = i % t
                }
                return this.strip()
            }, o.prototype.divn = function (t) {
                return this.clone().idivn(t)
            }, o.prototype.egcd = function (t) {
                r(0 === t.negative), r(!t.isZero());
                var e = this, n = t.clone();
                e = 0 !== e.negative ? e.umod(t) : e.clone();
                for (var i = new o(1), a = new o(0), s = new o(0), c = new o(1), f = 0; e.isEven() && n.isEven();) e.iushrn(1), n.iushrn(1), ++f;
                for (var u = n.clone(), l = e.clone(); !e.isZero();) {
                    for (var h = 0, d = 1; 0 == (e.words[0] & d) && h < 26; ++h, d <<= 1) ;
                    if (h > 0) for (e.iushrn(h); h-- > 0;) (i.isOdd() || a.isOdd()) && (i.iadd(u), a.isub(l)), i.iushrn(1), a.iushrn(1);
                    for (var p = 0, b = 1; 0 == (n.words[0] & b) && p < 26; ++p, b <<= 1) ;
                    if (p > 0) for (n.iushrn(p); p-- > 0;) (s.isOdd() || c.isOdd()) && (s.iadd(u), c.isub(l)), s.iushrn(1), c.iushrn(1);
                    e.cmp(n) >= 0 ? (e.isub(n), i.isub(s), a.isub(c)) : (n.isub(e), s.isub(i), c.isub(a))
                }
                return {a: s, b: c, gcd: n.iushln(f)}
            }, o.prototype._invmp = function (t) {
                r(0 === t.negative), r(!t.isZero());
                var e = this, n = t.clone();
                e = 0 !== e.negative ? e.umod(t) : e.clone();
                for (var i, a = new o(1), s = new o(0), c = n.clone(); e.cmpn(1) > 0 && n.cmpn(1) > 0;) {
                    for (var f = 0, u = 1; 0 == (e.words[0] & u) && f < 26; ++f, u <<= 1) ;
                    if (f > 0) for (e.iushrn(f); f-- > 0;) a.isOdd() && a.iadd(c), a.iushrn(1);
                    for (var l = 0, h = 1; 0 == (n.words[0] & h) && l < 26; ++l, h <<= 1) ;
                    if (l > 0) for (n.iushrn(l); l-- > 0;) s.isOdd() && s.iadd(c), s.iushrn(1);
                    e.cmp(n) >= 0 ? (e.isub(n), a.isub(s)) : (n.isub(e), s.isub(a))
                }
                return (i = 0 === e.cmpn(1) ? a : s).cmpn(0) < 0 && i.iadd(t), i
            }, o.prototype.gcd = function (t) {
                if (this.isZero()) return t.abs();
                if (t.isZero()) return this.abs();
                var e = this.clone(), n = t.clone();
                e.negative = 0, n.negative = 0;
                for (var r = 0; e.isEven() && n.isEven(); r++) e.iushrn(1), n.iushrn(1);
                for (; ;) {
                    for (; e.isEven();) e.iushrn(1);
                    for (; n.isEven();) n.iushrn(1);
                    var i = e.cmp(n);
                    if (i < 0) {
                        var o = e;
                        e = n, n = o
                    } else if (0 === i || 0 === n.cmpn(1)) break;
                    e.isub(n)
                }
                return n.iushln(r)
            }, o.prototype.invm = function (t) {
                return this.egcd(t).a.umod(t)
            }, o.prototype.isEven = function () {
                return 0 == (1 & this.words[0])
            }, o.prototype.isOdd = function () {
                return 1 == (1 & this.words[0])
            }, o.prototype.andln = function (t) {
                return this.words[0] & t
            }, o.prototype.bincn = function (t) {
                r("number" == typeof t);
                var e = t % 26, n = (t - e) / 26, i = 1 << e;
                if (this.length <= n) return this._expand(n + 1), this.words[n] |= i, this;
                for (var o = i, a = n; 0 !== o && a < this.length; a++) {
                    var s = 0 | this.words[a];
                    o = (s += o) >>> 26, s &= 67108863, this.words[a] = s
                }
                return 0 !== o && (this.words[a] = o, this.length++), this
            }, o.prototype.isZero = function () {
                return 1 === this.length && 0 === this.words[0]
            }, o.prototype.cmpn = function (t) {
                var e, n = t < 0;
                if (0 !== this.negative && !n) return -1;
                if (0 === this.negative && n) return 1;
                if (this.strip(), this.length > 1) e = 1; else {
                    n && (t = -t), r(t <= 67108863, "Number is too big");
                    var i = 0 | this.words[0];
                    e = i === t ? 0 : i < t ? -1 : 1
                }
                return 0 !== this.negative ? 0 | -e : e
            }, o.prototype.cmp = function (t) {
                if (0 !== this.negative && 0 === t.negative) return -1;
                if (0 === this.negative && 0 !== t.negative) return 1;
                var e = this.ucmp(t);
                return 0 !== this.negative ? 0 | -e : e
            }, o.prototype.ucmp = function (t) {
                if (this.length > t.length) return 1;
                if (this.length < t.length) return -1;
                for (var e = 0, n = this.length - 1; n >= 0; n--) {
                    var r = 0 | this.words[n], i = 0 | t.words[n];
                    if (r !== i) {
                        r < i ? e = -1 : r > i && (e = 1);
                        break
                    }
                }
                return e
            }, o.prototype.gtn = function (t) {
                return 1 === this.cmpn(t)
            }, o.prototype.gt = function (t) {
                return 1 === this.cmp(t)
            }, o.prototype.gten = function (t) {
                return this.cmpn(t) >= 0
            }, o.prototype.gte = function (t) {
                return this.cmp(t) >= 0
            }, o.prototype.ltn = function (t) {
                return -1 === this.cmpn(t)
            }, o.prototype.lt = function (t) {
                return -1 === this.cmp(t)
            }, o.prototype.lten = function (t) {
                return this.cmpn(t) <= 0
            }, o.prototype.lte = function (t) {
                return this.cmp(t) <= 0
            }, o.prototype.eqn = function (t) {
                return 0 === this.cmpn(t)
            }, o.prototype.eq = function (t) {
                return 0 === this.cmp(t)
            }, o.red = function (t) {
                return new _(t)
            }, o.prototype.toRed = function (t) {
                return r(!this.red, "Already a number in reduction context"), r(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
            }, o.prototype.fromRed = function () {
                return r(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
            }, o.prototype._forceRed = function (t) {
                return this.red = t, this
            }, o.prototype.forceRed = function (t) {
                return r(!this.red, "Already a number in reduction context"), this._forceRed(t)
            }, o.prototype.redAdd = function (t) {
                return r(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
            }, o.prototype.redIAdd = function (t) {
                return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
            }, o.prototype.redSub = function (t) {
                return r(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
            }, o.prototype.redISub = function (t) {
                return r(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
            }, o.prototype.redShl = function (t) {
                return r(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
            }, o.prototype.redMul = function (t) {
                return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
            }, o.prototype.redIMul = function (t) {
                return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
            }, o.prototype.redSqr = function () {
                return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
            }, o.prototype.redISqr = function () {
                return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
            }, o.prototype.redSqrt = function () {
                return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
            }, o.prototype.redInvm = function () {
                return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
            }, o.prototype.redNeg = function () {
                return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
            }, o.prototype.redPow = function (t) {
                return r(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
            };
            var g = {k256: null, p224: null, p192: null, p25519: null};

            function y(t, e) {
                this.name = t, this.p = new o(e, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
            }

            function m() {
                y.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
            }

            function v() {
                y.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
            }

            function A() {
                y.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
            }

            function w() {
                y.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
            }

            function _(t) {
                if ("string" == typeof t) {
                    var e = o._prime(t);
                    this.m = e.p, this.prime = e
                } else r(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
            }

            function E(t) {
                _.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
            }

            y.prototype._tmp = function () {
                var t = new o(null);
                return t.words = new Array(Math.ceil(this.n / 13)), t
            }, y.prototype.ireduce = function (t) {
                var e, n = t;
                do {
                    this.split(n, this.tmp), e = (n = (n = this.imulK(n)).iadd(this.tmp)).bitLength()
                } while (e > this.n);
                var r = e < this.n ? -1 : n.ucmp(this.p);
                return 0 === r ? (n.words[0] = 0, n.length = 1) : r > 0 ? n.isub(this.p) : n.strip(), n
            }, y.prototype.split = function (t, e) {
                t.iushrn(this.n, 0, e)
            }, y.prototype.imulK = function (t) {
                return t.imul(this.k)
            }, i(m, y), m.prototype.split = function (t, e) {
                for (var n = Math.min(t.length, 9), r = 0; r < n; r++) e.words[r] = t.words[r];
                if (e.length = n, t.length <= 9) return t.words[0] = 0, void (t.length = 1);
                var i = t.words[9];
                for (e.words[e.length++] = 4194303 & i, r = 10; r < t.length; r++) {
                    var o = 0 | t.words[r];
                    t.words[r - 10] = (4194303 & o) << 4 | i >>> 22, i = o
                }
                i >>>= 22, t.words[r - 10] = i, 0 === i && t.length > 10 ? t.length -= 10 : t.length -= 9
            }, m.prototype.imulK = function (t) {
                t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                for (var e = 0, n = 0; n < t.length; n++) {
                    var r = 0 | t.words[n];
                    e += 977 * r, t.words[n] = 67108863 & e, e = 64 * r + (e / 67108864 | 0)
                }
                return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
            }, i(v, y), i(A, y), i(w, y), w.prototype.imulK = function (t) {
                for (var e = 0, n = 0; n < t.length; n++) {
                    var r = 19 * (0 | t.words[n]) + e, i = 67108863 & r;
                    r >>>= 26, t.words[n] = i, e = r
                }
                return 0 !== e && (t.words[t.length++] = e), t
            }, o._prime = function (t) {
                if (g[t]) return g[t];
                var e;
                if ("k256" === t) e = new m; else if ("p224" === t) e = new v; else if ("p192" === t) e = new A; else {
                    if ("p25519" !== t) throw new Error("Unknown prime " + t);
                    e = new w
                }
                return g[t] = e, e
            }, _.prototype._verify1 = function (t) {
                r(0 === t.negative, "red works only with positives"), r(t.red, "red works only with red numbers")
            }, _.prototype._verify2 = function (t, e) {
                r(0 == (t.negative | e.negative), "red works only with positives"), r(t.red && t.red === e.red, "red works only with red numbers")
            }, _.prototype.imod = function (t) {
                return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(this)
            }, _.prototype.neg = function (t) {
                return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
            }, _.prototype.add = function (t, e) {
                this._verify2(t, e);
                var n = t.add(e);
                return n.cmp(this.m) >= 0 && n.isub(this.m), n._forceRed(this)
            }, _.prototype.iadd = function (t, e) {
                this._verify2(t, e);
                var n = t.iadd(e);
                return n.cmp(this.m) >= 0 && n.isub(this.m), n
            }, _.prototype.sub = function (t, e) {
                this._verify2(t, e);
                var n = t.sub(e);
                return n.cmpn(0) < 0 && n.iadd(this.m), n._forceRed(this)
            }, _.prototype.isub = function (t, e) {
                this._verify2(t, e);
                var n = t.isub(e);
                return n.cmpn(0) < 0 && n.iadd(this.m), n
            }, _.prototype.shl = function (t, e) {
                return this._verify1(t), this.imod(t.ushln(e))
            }, _.prototype.imul = function (t, e) {
                return this._verify2(t, e), this.imod(t.imul(e))
            }, _.prototype.mul = function (t, e) {
                return this._verify2(t, e), this.imod(t.mul(e))
            }, _.prototype.isqr = function (t) {
                return this.imul(t, t.clone())
            }, _.prototype.sqr = function (t) {
                return this.mul(t, t)
            }, _.prototype.sqrt = function (t) {
                if (t.isZero()) return t.clone();
                var e = this.m.andln(3);
                if (r(e % 2 == 1), 3 === e) {
                    var n = this.m.add(new o(1)).iushrn(2);
                    return this.pow(t, n)
                }
                for (var i = this.m.subn(1), a = 0; !i.isZero() && 0 === i.andln(1);) a++, i.iushrn(1);
                r(!i.isZero());
                var s = new o(1).toRed(this), c = s.redNeg(), f = this.m.subn(1).iushrn(1), u = this.m.bitLength();
                for (u = new o(2 * u * u).toRed(this); 0 !== this.pow(u, f).cmp(c);) u.redIAdd(c);
                for (var l = this.pow(u, i), h = this.pow(t, i.addn(1).iushrn(1)), d = this.pow(t, i), p = a; 0 !== d.cmp(s);) {
                    for (var b = d, g = 0; 0 !== b.cmp(s); g++) b = b.redSqr();
                    r(g < p);
                    var y = this.pow(l, new o(1).iushln(p - g - 1));
                    h = h.redMul(y), l = y.redSqr(), d = d.redMul(l), p = g
                }
                return h
            }, _.prototype.invm = function (t) {
                var e = t._invmp(this.m);
                return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
            }, _.prototype.pow = function (t, e) {
                if (e.isZero()) return new o(1).toRed(this);
                if (0 === e.cmpn(1)) return t.clone();
                var n = new Array(16);
                n[0] = new o(1).toRed(this), n[1] = t;
                for (var r = 2; r < n.length; r++) n[r] = this.mul(n[r - 1], t);
                var i = n[0], a = 0, s = 0, c = e.bitLength() % 26;
                for (0 === c && (c = 26), r = e.length - 1; r >= 0; r--) {
                    for (var f = e.words[r], u = c - 1; u >= 0; u--) {
                        var l = f >> u & 1;
                        i !== n[0] && (i = this.sqr(i)), 0 !== l || 0 !== a ? (a <<= 1, a |= l, (4 == ++s || 0 === r && 0 === u) && (i = this.mul(i, n[a]), s = 0, a = 0)) : s = 0
                    }
                    c = 26
                }
                return i
            }, _.prototype.convertTo = function (t) {
                var e = t.umod(this.m);
                return e === t ? e.clone() : e
            }, _.prototype.convertFrom = function (t) {
                var e = t.clone();
                return e.red = null, e
            }, o.mont = function (t) {
                return new E(t)
            }, i(E, _), E.prototype.convertTo = function (t) {
                return this.imod(t.ushln(this.shift))
            }, E.prototype.convertFrom = function (t) {
                var e = this.imod(t.mul(this.rinv));
                return e.red = null, e
            }, E.prototype.imul = function (t, e) {
                if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
                var n = t.imul(e), r = n.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    i = n.isub(r).iushrn(this.shift), o = i;
                return i.cmp(this.m) >= 0 ? o = i.isub(this.m) : i.cmpn(0) < 0 && (o = i.iadd(this.m)), o._forceRed(this)
            }, E.prototype.mul = function (t, e) {
                if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
                var n = t.mul(e), r = n.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    i = n.isub(r).iushrn(this.shift), a = i;
                return i.cmp(this.m) >= 0 ? a = i.isub(this.m) : i.cmpn(0) < 0 && (a = i.iadd(this.m)), a._forceRed(this)
            }, E.prototype.invm = function (t) {
                return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
            }
        }(void 0 === t || t, this)
    }).call(this, n(138)(t))
}