var func155 = function (t, e, n) {
    (function (e) {
        var r = n(10), i = n(39), o = n(0), a = {
            "des-ede3-cbc": i.CBC.instantiate(i.EDE),
            "des-ede3": i.EDE,
            "des-ede-cbc": i.CBC.instantiate(i.EDE),
            "des-ede": i.EDE,
            "des-cbc": i.CBC.instantiate(i.DES),
            "des-ecb": i.DES
        };

        function s(t) {
            r.call(this);
            var n, i = t.mode.toLowerCase(), o = a[i];
            n = t.decrypt ? "decrypt" : "encrypt";
            var s = t.key;
            "des-ede" !== i && "des-ede-cbc" !== i || (s = e.concat([s, s.slice(0, 8)]));
            var c = t.iv;
            this._des = o.create({key: s, iv: c, type: n})
        }

        a.des = a["des-cbc"], a.des3 = a["des-ede3-cbc"], t.exports = s, o(s, r), s.prototype._update = function (t) {
            return new e(this._des.update(t))
        }, s.prototype._final = function () {
            return new e(this._des.final())
        }
    }).call(this, n(2).Buffer)
}