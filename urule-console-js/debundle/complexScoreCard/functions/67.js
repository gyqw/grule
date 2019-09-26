var func67 = function (t, e) {
    t.exports = function (t) {
        for (var e, n = t.length; n--;) {
            if (255 !== (e = t.readUInt8(n))) {
                e++, t.writeUInt8(e, n);
                break
            }
            t.writeUInt8(0, n)
        }
    }
}