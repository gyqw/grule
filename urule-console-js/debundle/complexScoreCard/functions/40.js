var func40 = function (t, e, n) {
    (e = t.exports = function (t) {
        t = t.toLowerCase();
        var n = e[t];
        if (!n) throw new Error(t + " is not supported (we accept pull requests)");
        return new n
    }).sha = n(163), e.sha1 = n(162), e.sha224 = n(161), e.sha256 = n(77), e.sha384 = n(160), e.sha512 = n(76)
}