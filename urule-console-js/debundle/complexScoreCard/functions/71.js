var func71 = function (t, e) {
    var n = Math.pow(2, 30) - 1;
    t.exports = function (t, e) {
        if ("number" != typeof t) throw new TypeError("Iterations not a number");
        if (t < 0) throw new TypeError("Bad iterations");
        if ("number" != typeof e) throw new TypeError("Key length not a number");
        if (e < 0 || e > n || e != e) throw new TypeError("Bad key length")
    }
}