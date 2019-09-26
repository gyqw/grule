var func99 = function (t, e, n) {
    var r = n(0), i = n(53);

    function o(t) {
        i.call(this, t), this.enc = "pem"
    }

    r(o, i), t.exports = o, o.prototype.encode = function (t, e) {
        for (var n = i.prototype.encode.call(this, t).toString("base64"), r = ["-----BEGIN " + e.label + "-----"], o = 0; o < n.length; o += 64) r.push(n.slice(o, o + 64));
        return r.push("-----END " + e.label + "-----"), r.join("\n")
    }
}