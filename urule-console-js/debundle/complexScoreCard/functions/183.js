var func183 = function (t, e) {
    !function (t) {
        "use strict";
        var e = function (t, e) {
            this.init("popover", t, e)
        };
        if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
        e.VERSION = "3.3.7", e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }), (e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype)).constructor = e, e.prototype.getDefaults = function () {
            return e.DEFAULTS
        }, e.prototype.setContent = function () {
            var t = this.tip(), e = this.getTitle(), n = this.getContent();
            t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
        }, e.prototype.hasContent = function () {
            return this.getTitle() || this.getContent()
        }, e.prototype.getContent = function () {
            var t = this.$element, e = this.options;
            return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
        }, e.prototype.arrow = function () {
            return this.$arrow = this.$arrow || this.tip().find(".arrow")
        };
        var n = t.fn.popover;
        t.fn.popover = function (n) {
            return this.each(function () {
                var r = t(this), i = r.data("bs.popover"), o = "object" == typeof n && n;
                !i && /destroy|hide/.test(n) || (i || r.data("bs.popover", i = new e(this, o)), "string" == typeof n && i[n]())
            })
        }, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function () {
            return t.fn.popover = n, this
        }
    }(jQuery)
}