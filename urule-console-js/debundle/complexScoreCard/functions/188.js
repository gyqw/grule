var func188 = function (t, e) {
    !function (t) {
        "use strict";
        var e = function (e, n) {
            this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
        };

        function n(n) {
            return this.each(function () {
                var r = t(this), i = r.data("bs.carousel"),
                    o = t.extend({}, e.DEFAULTS, r.data(), "object" == typeof n && n),
                    a = "string" == typeof n ? n : o.slide;
                i || r.data("bs.carousel", i = new e(this, o)), "number" == typeof n ? i.to(n) : a ? i[a]() : o.interval && i.pause().cycle()
            })
        }

        e.VERSION = "3.3.7", e.TRANSITION_DURATION = 600, e.DEFAULTS = {
            interval: 5e3,
            pause: "hover",
            wrap: !0,
            keyboard: !0
        }, e.prototype.keydown = function (t) {
            if (!/input|textarea/i.test(t.target.tagName)) {
                switch (t.which) {
                    case 37:
                        this.prev();
                        break;
                    case 39:
                        this.next();
                        break;
                    default:
                        return
                }
                t.preventDefault()
            }
        }, e.prototype.cycle = function (e) {
            return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
        }, e.prototype.getItemIndex = function (t) {
            return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
        }, e.prototype.getItemForDirection = function (t, e) {
            var n = this.getItemIndex(e);
            if (("prev" == t && 0 === n || "next" == t && n == this.$items.length - 1) && !this.options.wrap) return e;
            var r = (n + ("prev" == t ? -1 : 1)) % this.$items.length;
            return this.$items.eq(r)
        }, e.prototype.to = function (t) {
            var e = this, n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
            if (!(t > this.$items.length - 1 || t < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
                e.to(t)
            }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", this.$items.eq(t))
        }, e.prototype.pause = function (e) {
            return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
        }, e.prototype.next = function () {
            if (!this.sliding) return this.slide("next")
        }, e.prototype.prev = function () {
            if (!this.sliding) return this.slide("prev")
        }, e.prototype.slide = function (n, r) {
            var i = this.$element.find(".item.active"), o = r || this.getItemForDirection(n, i), a = this.interval,
                s = "next" == n ? "left" : "right", c = this;
            if (o.hasClass("active")) return this.sliding = !1;
            var f = o[0], u = t.Event("slide.bs.carousel", {relatedTarget: f, direction: s});
            if (this.$element.trigger(u), !u.isDefaultPrevented()) {
                if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                    this.$indicators.find(".active").removeClass("active");
                    var l = t(this.$indicators.children()[this.getItemIndex(o)]);
                    l && l.addClass("active")
                }
                var h = t.Event("slid.bs.carousel", {relatedTarget: f, direction: s});
                return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(n), o[0].offsetWidth, i.addClass(s), o.addClass(s), i.one("bsTransitionEnd", function () {
                    o.removeClass([n, s].join(" ")).addClass("active"), i.removeClass(["active", s].join(" ")), c.sliding = !1, setTimeout(function () {
                        c.$element.trigger(h)
                    }, 0)
                }).emulateTransitionEnd(e.TRANSITION_DURATION)) : (i.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(h)), a && this.cycle(), this
            }
        };
        var r = t.fn.carousel;
        t.fn.carousel = n, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function () {
            return t.fn.carousel = r, this
        };
        var i = function (e) {
            var r, i = t(this), o = t(i.attr("data-target") || (r = i.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""));
            if (o.hasClass("carousel")) {
                var a = t.extend({}, o.data(), i.data()), s = i.attr("data-slide-to");
                s && (a.interval = !1), n.call(o, a), s && o.data("bs.carousel").to(s), e.preventDefault()
            }
        };
        t(document).on("click.bs.carousel.data-api", "[data-slide]", i).on("click.bs.carousel.data-api", "[data-slide-to]", i), t(window).on("load", function () {
            t('[data-ride="carousel"]').each(function () {
                var e = t(this);
                n.call(e, e.data())
            })
        })
    }(jQuery)
}