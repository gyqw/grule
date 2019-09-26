var func185 = function (t, e) {
    !function (t) {
        "use strict";
        var e = function (e, n) {
            this.options = n, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        };

        function n(n, r) {
            return this.each(function () {
                var i = t(this), o = i.data("bs.modal"),
                    a = t.extend({}, e.DEFAULTS, i.data(), "object" == typeof n && n);
                o || i.data("bs.modal", o = new e(this, a)), "string" == typeof n ? o[n](r) : a.show && o.show(r)
            })
        }

        e.VERSION = "3.3.7", e.TRANSITION_DURATION = 300, e.BACKDROP_TRANSITION_DURATION = 150, e.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, e.prototype.toggle = function (t) {
            return this.isShown ? this.hide() : this.show(t)
        }, e.prototype.show = function (n) {
            var r = this, i = t.Event("show.bs.modal", {relatedTarget: n});
            this.$element.trigger(i), this.isShown || i.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
                r.$element.one("mouseup.dismiss.bs.modal", function (e) {
                    t(e.target).is(r.$element) && (r.ignoreBackdropClick = !0)
                })
            }), this.backdrop(function () {
                var i = t.support.transition && r.$element.hasClass("fade");
                r.$element.parent().length || r.$element.appendTo(r.$body), r.$element.show().scrollTop(0), r.adjustDialog(), i && r.$element[0].offsetWidth, r.$element.addClass("in"), r.enforceFocus();
                var o = t.Event("shown.bs.modal", {relatedTarget: n});
                i ? r.$dialog.one("bsTransitionEnd", function () {
                    r.$element.trigger("focus").trigger(o)
                }).emulateTransitionEnd(e.TRANSITION_DURATION) : r.$element.trigger("focus").trigger(o)
            }))
        }, e.prototype.hide = function (n) {
            n && n.preventDefault(), n = t.Event("hide.bs.modal"), this.$element.trigger(n), this.isShown && !n.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(e.TRANSITION_DURATION) : this.hideModal())
        }, e.prototype.enforceFocus = function () {
            t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
                document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
            }, this))
        }, e.prototype.escape = function () {
            this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function (t) {
                27 == t.which && this.hide()
            }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
        }, e.prototype.resize = function () {
            this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
        }, e.prototype.hideModal = function () {
            var t = this;
            this.$element.hide(), this.backdrop(function () {
                t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
            })
        }, e.prototype.removeBackdrop = function () {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, e.prototype.backdrop = function (n) {
            var r = this, i = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var o = t.support.transition && i;
                if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + i).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function (t) {
                    this.ignoreBackdropClick ? this.ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide())
                }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !n) return;
                o ? this.$backdrop.one("bsTransitionEnd", n).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : n()
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                var a = function () {
                    r.removeBackdrop(), n && n()
                };
                t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : a()
            } else n && n()
        }, e.prototype.handleUpdate = function () {
            this.adjustDialog()
        }, e.prototype.adjustDialog = function () {
            var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
            this.$element.css({
                paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
                paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
            })
        }, e.prototype.resetAdjustments = function () {
            this.$element.css({paddingLeft: "", paddingRight: ""})
        }, e.prototype.checkScrollbar = function () {
            var t = window.innerWidth;
            if (!t) {
                var e = document.documentElement.getBoundingClientRect();
                t = e.right - Math.abs(e.left)
            }
            this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
        }, e.prototype.setScrollbar = function () {
            var t = parseInt(this.$body.css("padding-right") || 0, 10);
            this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
        }, e.prototype.resetScrollbar = function () {
            this.$body.css("padding-right", this.originalBodyPad)
        }, e.prototype.measureScrollbar = function () {
            var t = document.createElement("div");
            t.className = "modal-scrollbar-measure", this.$body.append(t);
            var e = t.offsetWidth - t.clientWidth;
            return this.$body[0].removeChild(t), e
        };
        var r = t.fn.modal;
        t.fn.modal = n, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function () {
            return t.fn.modal = r, this
        }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (e) {
            var r = t(this), i = r.attr("href"), o = t(r.attr("data-target") || i && i.replace(/.*(?=#[^\s]+$)/, "")),
                a = o.data("bs.modal") ? "toggle" : t.extend({remote: !/#/.test(i) && i}, o.data(), r.data());
            r.is("a") && e.preventDefault(), o.one("show.bs.modal", function (t) {
                t.isDefaultPrevented() || o.one("hidden.bs.modal", function () {
                    r.is(":visible") && r.trigger("focus")
                })
            }), n.call(o, a, this)
        })
    }(jQuery)
}