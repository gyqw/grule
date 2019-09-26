var func93 = function (t, e, n) {
    e.publicEncrypt = n(92), e.privateDecrypt = n(91), e.privateEncrypt = function (t, n) {
        return e.publicEncrypt(t, n, !0)
    }, e.publicDecrypt = function (t, n) {
        return e.privateDecrypt(t, n, !0)
    }
}