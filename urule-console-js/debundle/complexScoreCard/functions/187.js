var func187 = function (t, e) {
    !function (t) {
        "use strict";
        var e = function (n, r) {
            this.$element = t(n), this.options = t.extend({}, e.DEFAULTS, r), this.$trigger = t('[data-toggle="collapse"][href="#' + n.id + '"],[data-toggle="collapse"][data-target="#' + n.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
        };

        function n(e) {
            var n, r = e.attr("data-target") || (n = e.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "");
            return t(r)
        }

        function r(n) {
            return this.each(function () {
                var r = t(this), i = r.data("bs.collapse"),
                    o = t.extend({}, e.DEFAULTS, r.data(), "object" == typeof n && n);
                !i && o.toggle && /show|hide/.test(n) && (o.toggle = !1), i || r.data("bs.collapse", i = new e(this, o)), "string" == typeof n && i[n]()
            })
        }

        e.VERSION = "3.3.7", e.TRANSITION_DURATION = 350, e.DEFAULTS = {toggle: !0}, e.prototype.dimension = function () {
            return this.$element.hasClass("width") ? "width" : "height"
        }, e.prototype.show = function () {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var n, i = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                if (!(i && i.length && (n = i.data("bs.collapse")) && n.transitioning)) {
                    var o = t.Event("show.bs.collapse");
                    if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                        i && i.length && (r.call(i, "hide"), n || i.data("bs.collapse", null));
                        var a = this.dimension();
                        this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                        var s = function () {
                            this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                        };
                        if (!t.support.transition) return s.call(this);
                        var c = t.camelCase(["scroll", a].join("-"));
                        this.$element.one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(e.TRANSITION_DURATION)[a](this.$element[0][c])
                    }
                }
            }
        }, e.prototype.hide = function () {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var n = t.Event("hide.bs.collapse");
                if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                    var r = this.dimension();
                    this.$element[r](this.$element[r]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                    var i = function () {
                        this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                    };
                    if (!t.support.transition) return i.call(this);
                    this.$element[r](0).one("bsTransitionEnd", t.proxy(i, this)).emulateTransitionEnd(e.TRANSITION_DURATION)
                }
            }
        }, e.prototype.toggle = function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }, e.prototype.getParent = function () {
            return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function (e, r) {
                var i = t(r);
                this.addAriaAndCollapsedClass(n(i), i)
            }, this)).end()
        }, e.prototype.addAriaAndCollapsedClass = function (t, e) {
            var n = t.hasClass("in");
            t.attr("aria-expanded", n), e.toggleClass("collapsed", !n).attr("aria-expanded", n)
        };
        var i = t.fn.collapse;
        t.fn.collapse = r, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function () {
            return t.fn.collapse = i, this
        }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (e) {
            var i = t(this);
            i.attr("data-target") || e.preventDefault();
            var o = n(i), a = o.data("bs.collapse") ? "toggle" : i.data();
            r.call(o, a)
        })
    }(jQuery)
}