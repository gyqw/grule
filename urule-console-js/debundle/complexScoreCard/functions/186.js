var func186 = function (t, e) {
    !function (t) {
        "use strict";
        var e = ".dropdown-backdrop", n = '[data-toggle="dropdown"]', r = function (e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };

        function i(e) {
            var n = e.attr("data-target");
            n || (n = (n = e.attr("href")) && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
            var r = n && t(n);
            return r && r.length ? r : e.parent()
        }

        function o(r) {
            r && 3 === r.which || (t(e).remove(), t(n).each(function () {
                var e = t(this), n = i(e), o = {relatedTarget: this};
                n.hasClass("open") && (r && "click" == r.type && /input|textarea/i.test(r.target.tagName) && t.contains(n[0], r.target) || (n.trigger(r = t.Event("hide.bs.dropdown", o)), r.isDefaultPrevented() || (e.attr("aria-expanded", "false"), n.removeClass("open").trigger(t.Event("hidden.bs.dropdown", o)))))
            }))
        }

        r.VERSION = "3.3.7", r.prototype.toggle = function (e) {
            var n = t(this);
            if (!n.is(".disabled, :disabled")) {
                var r = i(n), a = r.hasClass("open");
                if (o(), !a) {
                    "ontouchstart" in document.documentElement && !r.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", o);
                    var s = {relatedTarget: this};
                    if (r.trigger(e = t.Event("show.bs.dropdown", s)), e.isDefaultPrevented()) return;
                    n.trigger("focus").attr("aria-expanded", "true"), r.toggleClass("open").trigger(t.Event("shown.bs.dropdown", s))
                }
                return !1
            }
        }, r.prototype.keydown = function (e) {
            if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
                var r = t(this);
                if (e.preventDefault(), e.stopPropagation(), !r.is(".disabled, :disabled")) {
                    var o = i(r), a = o.hasClass("open");
                    if (!a && 27 != e.which || a && 27 == e.which) return 27 == e.which && o.find(n).trigger("focus"), r.trigger("click");
                    var s = o.find(".dropdown-menu li:not(.disabled):visible a");
                    if (s.length) {
                        var c = s.index(e.target);
                        38 == e.which && c > 0 && c--, 40 == e.which && c < s.length - 1 && c++, ~c || (c = 0), s.eq(c).trigger("focus")
                    }
                }
            }
        };
        var a = t.fn.dropdown;
        t.fn.dropdown = function (e) {
            return this.each(function () {
                var n = t(this), i = n.data("bs.dropdown");
                i || n.data("bs.dropdown", i = new r(this)), "string" == typeof e && i[e].call(n)
            })
        }, t.fn.dropdown.Constructor = r, t.fn.dropdown.noConflict = function () {
            return t.fn.dropdown = a, this
        }, t(document).on("click.bs.dropdown.data-api", o).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
            t.stopPropagation()
        }).on("click.bs.dropdown.data-api", n, r.prototype.toggle).on("keydown.bs.dropdown.data-api", n, r.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", r.prototype.keydown)
    }(jQuery)
}