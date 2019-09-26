var func42 = function (t, e, n) {
    "use strict";
    var r = n(1).Buffer, i = r.isEncoding || function (t) {
        switch ((t = "" + t) && t.toLowerCase()) {
            case"hex":
            case"utf8":
            case"utf-8":
            case"ascii":
            case"binary":
            case"base64":
            case"ucs2":
            case"ucs-2":
            case"utf16le":
            case"utf-16le":
            case"raw":
                return !0;
            default:
                return !1
        }
    };

    function o(t) {
        var e;
        switch (this.encoding = function (t) {
            var e = function (t) {
                if (!t) return "utf8";
                for (var e; ;) switch (t) {
                    case"utf8":
                    case"utf-8":
                        return "utf8";
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return "utf16le";
                    case"latin1":
                    case"binary":
                        return "latin1";
                    case"base64":
                    case"ascii":
                    case"hex":
                        return t;
                    default:
                        if (e) return;
                        t = ("" + t).toLowerCase(), e = !0
                }
            }(t);
            if ("string" != typeof e && (r.isEncoding === i || !i(t))) throw new Error("Unknown encoding: " + t);
            return e || t
        }(t), this.encoding) {
            case"utf16le":
                this.text = c, this.end = f, e = 4;
                break;
            case"utf8":
                this.fillLast = s, e = 4;
                break;
            case"base64":
                this.text = u, this.end = l, e = 3;
                break;
            default:
                return this.write = h, void (this.end = d)
        }
        this.lastNeed = 0, this.lastTotal = 0, this.lastChar = r.allocUnsafe(e)
    }

    function a(t) {
        return t <= 127 ? 0 : t >> 5 == 6 ? 2 : t >> 4 == 14 ? 3 : t >> 3 == 30 ? 4 : t >> 6 == 2 ? -1 : -2
    }

    function s(t) {
        var e = this.lastTotal - this.lastNeed, n = function (t, e, n) {
            if (128 != (192 & e[0])) return t.lastNeed = 0, "�";
            if (t.lastNeed > 1 && e.length > 1) {
                if (128 != (192 & e[1])) return t.lastNeed = 1, "�";
                if (t.lastNeed > 2 && e.length > 2 && 128 != (192 & e[2])) return t.lastNeed = 2, "�"
            }
        }(this, t);
        return void 0 !== n ? n : this.lastNeed <= t.length ? (t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (t.copy(this.lastChar, e, 0, t.length), void (this.lastNeed -= t.length))
    }

    function c(t, e) {
        if ((t.length - e) % 2 == 0) {
            var n = t.toString("utf16le", e);
            if (n) {
                var r = n.charCodeAt(n.length - 1);
                if (r >= 55296 && r <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1], n.slice(0, -1)
            }
            return n
        }
        return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t[t.length - 1], t.toString("utf16le", e, t.length - 1)
    }

    function f(t) {
        var e = t && t.length ? this.write(t) : "";
        if (this.lastNeed) {
            var n = this.lastTotal - this.lastNeed;
            return e + this.lastChar.toString("utf16le", 0, n)
        }
        return e
    }

    function u(t, e) {
        var n = (t.length - e) % 3;
        return 0 === n ? t.toString("base64", e) : (this.lastNeed = 3 - n, this.lastTotal = 3, 1 === n ? this.lastChar[0] = t[t.length - 1] : (this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1]), t.toString("base64", e, t.length - n))
    }

    function l(t) {
        var e = t && t.length ? this.write(t) : "";
        return this.lastNeed ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e
    }

    function h(t) {
        return t.toString(this.encoding)
    }

    function d(t) {
        return t && t.length ? this.write(t) : ""
    }

    e.StringDecoder = o, o.prototype.write = function (t) {
        if (0 === t.length) return "";
        var e, n;
        if (this.lastNeed) {
            if (void 0 === (e = this.fillLast(t))) return "";
            n = this.lastNeed, this.lastNeed = 0
        } else n = 0;
        return n < t.length ? e ? e + this.text(t, n) : this.text(t, n) : e || ""
    }, o.prototype.end = function (t) {
        var e = t && t.length ? this.write(t) : "";
        return this.lastNeed ? e + "�" : e
    }, o.prototype.text = function (t, e) {
        var n = function (t, e, n) {
            var r = e.length - 1;
            if (r < n) return 0;
            var i = a(e[r]);
            return i >= 0 ? (i > 0 && (t.lastNeed = i - 1), i) : --r < n || -2 === i ? 0 : (i = a(e[r])) >= 0 ? (i > 0 && (t.lastNeed = i - 2), i) : --r < n || -2 === i ? 0 : (i = a(e[r])) >= 0 ? (i > 0 && (2 === i ? i = 0 : t.lastNeed = i - 3), i) : 0
        }(this, t, e);
        if (!this.lastNeed) return t.toString("utf8", e);
        this.lastTotal = n;
        var r = t.length - (n - this.lastNeed);
        return t.copy(this.lastChar, 0, r), t.toString("utf8", e, r)
    }, o.prototype.fillLast = function (t) {
        if (this.lastNeed <= t.length) return t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), this.lastNeed -= t.length
    }
}