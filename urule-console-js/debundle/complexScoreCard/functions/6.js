var func6 = function (t, e) {
    function n(t, e) {
        if (!t) throw new Error(e || "Assertion failed")
    }

    t.exports = n, n.equal = function (t, e, n) {
        if (t != e) throw new Error(n || "Assertion failed: " + t + " != " + e)
    }
}