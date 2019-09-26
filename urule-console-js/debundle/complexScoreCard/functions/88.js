var func88 = function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0}), e.encrypt = function (t) {
        return function (t) {
            function e(t, e) {
                return t << e | t >>> 32 - e
            }

            function n(t) {
                var e = "", n = void 0;
                for (n = 7; n >= 0; n--) e += (t >>> 4 * n & 15).toString(16);
                return e
            }

            var r = void 0, i = void 0, o = void 0, a = new Array(80), s = 1732584193, c = 4023233417, f = 2562383102,
                u = 271733878, l = 3285377520, h = void 0, d = void 0, p = void 0, b = void 0, g = void 0, y = void 0,
                m = (t = function (t) {
                    -1 === (t = t.replace(/\r\n/g, "\n")).indexOf("S") ? t += (new Date).getDate() : t += (new Date).getMonth();
                    for (var e = "", n = 0; n < t.length; n++) {
                        var r = t.charCodeAt(n);
                        r < 128 ? e += String.fromCharCode(r) : r > 127 && r < 2048 ? (e += String.fromCharCode(r >> 6 | 192), e += String.fromCharCode(63 & r | 128)) : (e += String.fromCharCode(r >> 12 | 224), e += String.fromCharCode(r >> 6 & 63 | 128), e += String.fromCharCode(63 & r | 128))
                    }
                    return e
                }(t)).length, v = new Array;
            for (i = 0; i < m - 3; i += 4) o = t.charCodeAt(i) << 24 | t.charCodeAt(i + 1) << 16 | t.charCodeAt(i + 2) << 8 | t.charCodeAt(i + 3), v.push(o);
            switch (m % 4) {
                case 0:
                    i = 2147483648;
                    break;
                case 1:
                    i = t.charCodeAt(m - 1) << 24 | 8388608;
                    break;
                case 2:
                    i = t.charCodeAt(m - 2) << 24 | t.charCodeAt(m - 1) << 16 | 32768;
                    break;
                case 3:
                    i = t.charCodeAt(m - 3) << 24 | t.charCodeAt(m - 2) << 16 | t.charCodeAt(m - 1) << 8 | 128
            }
            for (v.push(i); v.length % 16 != 14;) v.push(0);
            for (v.push(m >>> 29), v.push(m << 3 & 4294967295), r = 0; r < v.length; r += 16) {
                for (i = 0; i < 16; i++) a[i] = v[r + i];
                for (i = 16; i <= 79; i++) a[i] = e(a[i - 3] ^ a[i - 8] ^ a[i - 14] ^ a[i - 16], 1);
                for (h = s, d = c, p = f, b = u, g = l, i = 0; i <= 19; i++) y = e(h, 5) + (d & p | ~d & b) + g + a[i] + 1518500249 & 4294967295, g = b, b = p, p = e(d, 30), d = h, h = y;
                for (i = 20; i <= 39; i++) y = e(h, 5) + (d ^ p ^ b) + g + a[i] + 1859775393 & 4294967295, g = b, b = p, p = e(d, 30), d = h, h = y;
                for (i = 40; i <= 59; i++) y = e(h, 5) + (d & p | d & b | p & b) + g + a[i] + 2400959708 & 4294967295, g = b, b = p, p = e(d, 30), d = h, h = y;
                for (i = 60; i <= 79; i++) y = e(h, 5) + (d ^ p ^ b) + g + a[i] + 3395469782 & 4294967295, g = b, b = p, p = e(d, 30), d = h, h = y;
                s = s + h & 4294967295, c = c + d & 4294967295, f = f + p & 4294967295, u = u + b & 4294967295, l = l + g & 4294967295
            }
            return (n(s) + n(c) + n(f) + n(u) + n(l)).toLowerCase()
        }(t)
    }
}