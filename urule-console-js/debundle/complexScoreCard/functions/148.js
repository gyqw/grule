var func148 = function (t, e) {
    e.encrypt = function (t, e) {
        return t._cipher.encryptBlock(e)
    }, e.decrypt = function (t, e) {
        return t._cipher.decryptBlock(e)
    }
}