var func101 = function (t, e, n) {
    var r = n(0), i = n(2).Buffer, o = n(54);

    function a(t) {
        o.call(this, t), this.enc = "pem"
    }

    r(a, o), t.exports = a, a.prototype.decode = function (t, e) {
        for (var n = t.toString().split(/[\r\n]+/g), r = e.label.toUpperCase(), a = /^-----(BEGIN|END) ([^-]+)-----$/, s = -1, c = -1, f = 0; f < n.length; f++) {
            var u = n[f].match(a);
            if (null !== u && u[2] === r) {
                if (-1 !== s) {
                    if ("END" !== u[1]) break;
                    c = f;
                    break
                }
                if ("BEGIN" !== u[1]) break;
                s = f
            }
        }
        if (-1 === s || -1 === c) throw new Error("PEM section not found for: " + r);
        var l = n.slice(s + 1, c).join("");
        l.replace(/[^a-z0-9\+\/=]+/gi, "");
        var h = new i(l, "base64");
        return o.prototype.decode.call(this, h, e)
    }
}