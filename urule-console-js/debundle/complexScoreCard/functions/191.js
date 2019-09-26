var func191 = function (t, e) {
    !function (t) {
        "use strict";
        t.fn.emulateTransitionEnd = function (e) {
            var n = !1, r = this;
            return t(this).one("bsTransitionEnd", function () {
                n = !0
            }), setTimeout(function () {
                n || t(r).trigger(t.support.transition.end)
            }, e), this
        }, t(function () {
            t.support.transition = function () {
                var t = document.createElement("bootstrap"), e = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
                for (var n in e) if (void 0 !== t.style[n]) return {end: e[n]};
                return !1
            }(), t.support.transition && (t.event.special.bsTransitionEnd = {
                bindType: t.support.transition.end,
                delegateType: t.support.transition.end,
                handle: function (e) {
                    if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            })
        })
    }(jQuery)
}