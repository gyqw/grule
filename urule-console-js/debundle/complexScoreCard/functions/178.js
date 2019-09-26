var func178 = function (t, e) {
    e.read = function (t, e, n, r, i) {
        var o, a, s = 8 * i - r - 1, c = (1 << s) - 1, f = c >> 1, u = -7, l = n ? i - 1 : 0, h = n ? -1 : 1,
            d = t[e + l];
        for (l += h, o = d & (1 << -u) - 1, d >>= -u, u += s; u > 0; o = 256 * o + t[e + l], l += h, u -= 8) ;
        for (a = o & (1 << -u) - 1, o >>= -u, u += r; u > 0; a = 256 * a + t[e + l], l += h, u -= 8) ;
        if (0 === o) o = 1 - f; else {
            if (o === c) return a ? NaN : 1 / 0 * (d ? -1 : 1);
            a += Math.pow(2, r), o -= f
        }
        return (d ? -1 : 1) * a * Math.pow(2, o - r)
    }, e.write = function (t, e, n, r, i, o) {
        var a, s, c, f = 8 * o - i - 1, u = (1 << f) - 1, l = u >> 1,
            h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = r ? 0 : o - 1, p = r ? 1 : -1,
            b = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, a = u) : (a = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -a)) < 1 && (a--, c *= 2), (e += a + l >= 1 ? h / c : h * Math.pow(2, 1 - l)) * c >= 2 && (a++, c /= 2), a + l >= u ? (s = 0, a = u) : a + l >= 1 ? (s = (e * c - 1) * Math.pow(2, i), a += l) : (s = e * Math.pow(2, l - 1) * Math.pow(2, i), a = 0)); i >= 8; t[n + d] = 255 & s, d += p, s /= 256, i -= 8) ;
        for (a = a << i | s, f += i; f > 0; t[n + d] = 255 & a, d += p, a /= 256, f -= 8) ;
        t[n + d - p] |= 128 * b
    }
}