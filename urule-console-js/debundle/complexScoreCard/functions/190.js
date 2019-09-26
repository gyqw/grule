var func190 = function (t, e) {
    !function (t) {
        "use strict";
        var e = '[data-dismiss="alert"]', n = function (n) {
            t(n).on("click", e, this.close)
        };
        n.VERSION = "3.3.7", n.TRANSITION_DURATION = 150, n.prototype.close = function (e) {
            var r = t(this), i = r.attr("data-target");
            i || (i = (i = r.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, ""));
            var o = t("#" === i ? [] : i);

            function a() {
                o.detach().trigger("closed.bs.alert").remove()
            }

            e && e.preventDefault(), o.length || (o = r.closest(".alert")), o.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (o.removeClass("in"), t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", a).emulateTransitionEnd(n.TRANSITION_DURATION) : a())
        };
        var r = t.fn.alert;
        t.fn.alert = function (e) {
            return this.each(function () {
                var r = t(this), i = r.data("bs.alert");
                i || r.data("bs.alert", i = new n(this)), "string" == typeof e && i[e].call(r)
            })
        }, t.fn.alert.Constructor = n, t.fn.alert.noConflict = function () {
            return t.fn.alert = r, this
        }, t(document).on("click.bs.alert.data-api", e, n.prototype.close)
    }(jQuery)
}