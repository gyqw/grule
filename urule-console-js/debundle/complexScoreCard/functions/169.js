var func169 = function (t, e, n) {
    "use strict";
    t.exports = o;
    var r = n(78), i = n(25);

    function o(t) {
        if (!(this instanceof o)) return new o(t);
        r.call(this, t)
    }

    i.inherits = n(24), i.inherits(o, r), o.prototype._transform = function (t, e, n) {
        n(null, t)
    }
}