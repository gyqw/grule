var func96 = function (t, e, n) {
    (function (e) {
        var r = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r\+\/\=]+)[\n\r]+/m,
            i = /^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----/m,
            o = /^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----([0-9A-z\n\r\+\/\=]+)-----END \1-----$/m, a = n(30),
            s = n(38);
        t.exports = function (t, n) {
            var c, f = t.toString(), u = f.match(r);
            if (u) {
                var l = "aes" + u[1], h = new e(u[2], "hex"), d = new e(u[3].replace(/[\r\n]/g, ""), "base64"),
                    p = a(n, h.slice(0, 8), parseInt(u[1], 10)).key, b = [], g = s.createDecipheriv(l, p, h);
                b.push(g.update(d)), b.push(g.final()), c = e.concat(b)
            } else {
                var y = f.match(o);
                c = new e(y[2].replace(/[\r\n]/g, ""), "base64")
            }
            return {tag: f.match(i)[1], data: c}
        }
    }).call(this, n(2).Buffer)
}