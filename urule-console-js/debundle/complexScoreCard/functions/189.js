var func189 = function (t, e) {
    !function (t) {
        "use strict";
        var e = function (n, r) {
            this.$element = t(n), this.options = t.extend({}, e.DEFAULTS, r), this.isLoading = !1
        };

        function n(n) {
            return this.each(function () {
                var r = t(this), i = r.data("bs.button"), o = "object" == typeof n && n;
                i || r.data("bs.button", i = new e(this, o)), "toggle" == n ? i.toggle() : n && i.setState(n)
            })
        }

        e.VERSION = "3.3.7", e.DEFAULTS = {loadingText: "loading..."}, e.prototype.setState = function (e) {
            var n = "disabled", r = this.$element, i = r.is("input") ? "val" : "html", o = r.data();
            e += "Text", null == o.resetText && r.data("resetText", r[i]()), setTimeout(t.proxy(function () {
                r[i](null == o[e] ? this.options[e] : o[e]), "loadingText" == e ? (this.isLoading = !0, r.addClass(n).attr(n, n).prop(n, !0)) : this.isLoading && (this.isLoading = !1, r.removeClass(n).removeAttr(n).prop(n, !1))
            }, this), 0)
        }, e.prototype.toggle = function () {
            var t = !0, e = this.$element.closest('[data-toggle="buttons"]');
            if (e.length) {
                var n = this.$element.find("input");
                "radio" == n.prop("type") ? (n.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), t && n.trigger("change")
            } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
        };
        var r = t.fn.button;
        t.fn.button = n, t.fn.button.Constructor = e, t.fn.button.noConflict = function () {
            return t.fn.button = r, this
        }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (e) {
            var r = t(e.target).closest(".btn");
            n.call(r, "toggle"), t(e.target).is('input[type="radio"], input[type="checkbox"]') || (e.preventDefault(), r.is("input,button") ? r.trigger("focus") : r.find("input:visible,button:visible").first().trigger("focus"))
        }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (e) {
            t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
        })
    }(jQuery)
}