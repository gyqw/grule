var func184 = function (t, e) {
    !function (t) {
        "use strict";
        var e = function (t, e) {
            this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
        };
        e.VERSION = "3.3.7", e.TRANSITION_DURATION = 150, e.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1,
            viewport: {selector: "body", padding: 0}
        }, e.prototype.init = function (e, n, r) {
            if (this.enabled = !0, this.type = e, this.$element = t(n), this.options = this.getOptions(r), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
            for (var i = this.options.trigger.split(" "), o = i.length; o--;) {
                var a = i[o];
                if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != a) {
                    var s = "hover" == a ? "mouseenter" : "focusin", c = "hover" == a ? "mouseleave" : "focusout";
                    this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(c + "." + this.type, this.options.selector, t.proxy(this.leave, this))
                }
            }
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, e.prototype.getDefaults = function () {
            return e.DEFAULTS
        }, e.prototype.getOptions = function (e) {
            return (e = t.extend({}, this.getDefaults(), this.$element.data(), e)).delay && "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }), e
        }, e.prototype.getDelegateOptions = function () {
            var e = {}, n = this.getDefaults();
            return this._options && t.each(this._options, function (t, r) {
                n[t] != r && (e[t] = r)
            }), e
        }, e.prototype.enter = function (e) {
            var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
            if (n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusin" == e.type ? "focus" : "hover"] = !0), n.tip().hasClass("in") || "in" == n.hoverState) n.hoverState = "in"; else {
                if (clearTimeout(n.timeout), n.hoverState = "in", !n.options.delay || !n.options.delay.show) return n.show();
                n.timeout = setTimeout(function () {
                    "in" == n.hoverState && n.show()
                }, n.options.delay.show)
            }
        }, e.prototype.isInStateTrue = function () {
            for (var t in this.inState) if (this.inState[t]) return !0;
            return !1
        }, e.prototype.leave = function (e) {
            var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
            if (n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusout" == e.type ? "focus" : "hover"] = !1), !n.isInStateTrue()) {
                if (clearTimeout(n.timeout), n.hoverState = "out", !n.options.delay || !n.options.delay.hide) return n.hide();
                n.timeout = setTimeout(function () {
                    "out" == n.hoverState && n.hide()
                }, n.options.delay.hide)
            }
        }, e.prototype.show = function () {
            var n = t.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(n);
                var r = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                if (n.isDefaultPrevented() || !r) return;
                var i = this, o = this.tip(), a = this.getUID(this.type);
                this.setContent(), o.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && o.addClass("fade");
                var s = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                    c = /\s?auto?\s?/i, f = c.test(s);
                f && (s = s.replace(c, "") || "top"), o.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(s).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
                var u = this.getPosition(), l = o[0].offsetWidth, h = o[0].offsetHeight;
                if (f) {
                    var d = s, p = this.getPosition(this.$viewport);
                    s = "bottom" == s && u.bottom + h > p.bottom ? "top" : "top" == s && u.top - h < p.top ? "bottom" : "right" == s && u.right + l > p.width ? "left" : "left" == s && u.left - l < p.left ? "right" : s, o.removeClass(d).addClass(s)
                }
                var b = this.getCalculatedOffset(s, u, l, h);
                this.applyPlacement(b, s);
                var g = function () {
                    var t = i.hoverState;
                    i.$element.trigger("shown.bs." + i.type), i.hoverState = null, "out" == t && i.leave(i)
                };
                t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", g).emulateTransitionEnd(e.TRANSITION_DURATION) : g()
            }
        }, e.prototype.applyPlacement = function (e, n) {
            var r = this.tip(), i = r[0].offsetWidth, o = r[0].offsetHeight, a = parseInt(r.css("margin-top"), 10),
                s = parseInt(r.css("margin-left"), 10);
            isNaN(a) && (a = 0), isNaN(s) && (s = 0), e.top += a, e.left += s, t.offset.setOffset(r[0], t.extend({
                using: function (t) {
                    r.css({top: Math.round(t.top), left: Math.round(t.left)})
                }
            }, e), 0), r.addClass("in");
            var c = r[0].offsetWidth, f = r[0].offsetHeight;
            "top" == n && f != o && (e.top = e.top + o - f);
            var u = this.getViewportAdjustedDelta(n, e, c, f);
            u.left ? e.left += u.left : e.top += u.top;
            var l = /top|bottom/.test(n), h = l ? 2 * u.left - i + c : 2 * u.top - o + f,
                d = l ? "offsetWidth" : "offsetHeight";
            r.offset(e), this.replaceArrow(h, r[0][d], l)
        }, e.prototype.replaceArrow = function (t, e, n) {
            this.arrow().css(n ? "left" : "top", 50 * (1 - t / e) + "%").css(n ? "top" : "left", "")
        }, e.prototype.setContent = function () {
            var t = this.tip(), e = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
        }, e.prototype.hide = function (n) {
            var r = this, i = t(this.$tip), o = t.Event("hide.bs." + this.type);

            function a() {
                "in" != r.hoverState && i.detach(), r.$element && r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type), n && n()
            }

            if (this.$element.trigger(o), !o.isDefaultPrevented()) return i.removeClass("in"), t.support.transition && i.hasClass("fade") ? i.one("bsTransitionEnd", a).emulateTransitionEnd(e.TRANSITION_DURATION) : a(), this.hoverState = null, this
        }, e.prototype.fixTitle = function () {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        }, e.prototype.hasContent = function () {
            return this.getTitle()
        }, e.prototype.getPosition = function (e) {
            var n = (e = e || this.$element)[0], r = "BODY" == n.tagName, i = n.getBoundingClientRect();
            null == i.width && (i = t.extend({}, i, {width: i.right - i.left, height: i.bottom - i.top}));
            var o = window.SVGElement && n instanceof window.SVGElement,
                a = r ? {top: 0, left: 0} : o ? null : e.offset(),
                s = {scroll: r ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()},
                c = r ? {width: t(window).width(), height: t(window).height()} : null;
            return t.extend({}, i, s, c, a)
        }, e.prototype.getCalculatedOffset = function (t, e, n, r) {
            return "bottom" == t ? {
                top: e.top + e.height,
                left: e.left + e.width / 2 - n / 2
            } : "top" == t ? {
                top: e.top - r,
                left: e.left + e.width / 2 - n / 2
            } : "left" == t ? {
                top: e.top + e.height / 2 - r / 2,
                left: e.left - n
            } : {top: e.top + e.height / 2 - r / 2, left: e.left + e.width}
        }, e.prototype.getViewportAdjustedDelta = function (t, e, n, r) {
            var i = {top: 0, left: 0};
            if (!this.$viewport) return i;
            var o = this.options.viewport && this.options.viewport.padding || 0, a = this.getPosition(this.$viewport);
            if (/right|left/.test(t)) {
                var s = e.top - o - a.scroll, c = e.top + o - a.scroll + r;
                s < a.top ? i.top = a.top - s : c > a.top + a.height && (i.top = a.top + a.height - c)
            } else {
                var f = e.left - o, u = e.left + o + n;
                f < a.left ? i.left = a.left - f : u > a.right && (i.left = a.left + a.width - u)
            }
            return i
        }, e.prototype.getTitle = function () {
            var t = this.$element, e = this.options;
            return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
        }, e.prototype.getUID = function (t) {
            do {
                t += ~~(1e6 * Math.random())
            } while (document.getElementById(t));
            return t
        }, e.prototype.tip = function () {
            if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
            return this.$tip
        }, e.prototype.arrow = function () {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, e.prototype.enable = function () {
            this.enabled = !0
        }, e.prototype.disable = function () {
            this.enabled = !1
        }, e.prototype.toggleEnabled = function () {
            this.enabled = !this.enabled
        }, e.prototype.toggle = function (e) {
            var n = this;
            e && ((n = t(e.currentTarget).data("bs." + this.type)) || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n))), e ? (n.inState.click = !n.inState.click, n.isInStateTrue() ? n.enter(n) : n.leave(n)) : n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
        }, e.prototype.destroy = function () {
            var t = this;
            clearTimeout(this.timeout), this.hide(function () {
                t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null, t.$element = null
            })
        };
        var n = t.fn.tooltip;
        t.fn.tooltip = function (n) {
            return this.each(function () {
                var r = t(this), i = r.data("bs.tooltip"), o = "object" == typeof n && n;
                !i && /destroy|hide/.test(n) || (i || r.data("bs.tooltip", i = new e(this, o)), "string" == typeof n && i[n]())
            })
        }, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function () {
            return t.fn.tooltip = n, this
        }
    }(jQuery)
}