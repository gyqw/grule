var func106 = function (t, e) {
    var n = [].indexOf;
    t.exports = function (t, e) {
        if (n) return t.indexOf(e);
        for (var r = 0; r < t.length; ++r) if (t[r] === e) return r;
        return -1
    }
}