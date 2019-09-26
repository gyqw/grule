var func180 = function (t, e) {
    !function (t) {
        "use strict";
        var e = function (n, r) {
            this.options = t.extend({}, e.DEFAULTS, r), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(n), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
        };

        function n(n) {
            return this.each(function () {
                var r = t(this), i = r.data("bs.affix"), o = "object" == typeof n && n;
                i || r.data("bs.affix", i = new e(this, o)), "string" == typeof n && i[n]()
            })
        }

        e.VERSION = "3.3.7", e.RESET = "affix affix-top affix-bottom", e.DEFAULTS = {
            offset: 0,
            target: window
        }, e.prototype.getState = function (t, e, n, r) {
            var i = this.$target.scrollTop(), o = this.$element.offset(), a = this.$target.height();
            if (null != n && "top" == this.affixed) return i < n && "top";
            if ("bottom" == this.affixed) return null != n ? !(i + this.unpin <= o.top) && "bottom" : !(i + a <= t - r) && "bottom";
            var s = null == this.affixed, c = s ? i : o.top;
            return null != n && i <= n ? "top" : null != r && c + (s ? a : e) >= t - r && "bottom"
        }, e.prototype.getPinnedOffset = function () {
            if (this.pinnedOffset) return this.pinnedOffset;
            this.$element.removeClass(e.RESET).addClass("affix");
            var t = this.$target.scrollTop(), n = this.$element.offset();
            return this.pinnedOffset = n.top - t
        }, e.prototype.checkPositionWithEventLoop = function () {
            setTimeout(t.proxy(this.checkPosition, this), 1)
        }, e.prototype.checkPosition = function () {
            if (this.$element.is(":visible")) {
                var n = this.$element.height(), r = this.options.offset, i = r.top, o = r.bottom,
                    a = Math.max(t(document).height(), t(document.body).height());
                "object" != typeof r && (o = i = r), "function" == typeof i && (i = r.top(this.$element)), "function" == typeof o && (o = r.bottom(this.$element));
                var s = this.getState(a, n, i, o);
                if (this.affixed != s) {
                    null != this.unpin && this.$element.css("top", "");
                    var c = "affix" + (s ? "-" + s : ""), f = t.Event(c + ".bs.affix");
                    if (this.$element.trigger(f), f.isDefaultPrevented()) return;
                    this.affixed = s, this.unpin = "bottom" == s ? this.getPinnedOffset() : null, this.$element.removeClass(e.RESET).addClass(c).trigger(c.replace("affix", "affixed") + ".bs.affix")
                }
                "bottom" == s && this.$element.offset({top: a - n - o})
            }
        };
        var r = t.fn.affix;
        t.fn.affix = n, t.fn.affix.Constructor = e, t.fn.affix.noConflict = function () {
            return t.fn.affix = r, this
        }, t(window).on("load", function () {
            t('[data-spy="affix"]').each(function () {
                var e = t(this), r = e.data();
                r.offset = r.offset || {}, null != r.offsetBottom && (r.offset.bottom = r.offsetBottom), null != r.offsetTop && (r.offset.top = r.offsetTop), n.call(e, r)
            })
        })
    }(jQuery)
}