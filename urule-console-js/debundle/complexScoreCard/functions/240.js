var func240 = function (module, exports, __webpack_require__) {
    "use strict";
    !function () {
        window.URule || (window.URule = {}), URule.menu = {}, URule.menu.AbstractMenu = function (t) {
        }, URule.menu.AbstractMenu.prototype = {
            fadeSpeed: 100,
            above: "auto",
            preventDoubleContext: !0,
            compress: !1,
            createDom: function () {
            },
            getDom: function () {
                return this._dom || (this._dom = this.createDom(), $(this._dom).data("ref", this)), this._dom
            },
            render: function (t) {
                this._rendered || (t ? $(t).append(this.getDom()) : $("body").append(this.getDom())), this._rendered = !0
            },
            setConfig: function (t) {
                this.remove(), this.constructor.call(this, t)
            },
            remove: function () {
                this._dom && (this._dom.remove(), this._dom = null), this._rendered = !1
            }
        }, URule.menu.Menu = function (t) {
            URule.menu.Menu.prototype.superClass.call(this, t), $.extend(this, t)
        }, URule.menu.Menu.prototype = new URule.menu.AbstractMenu, URule.menu.Menu.prototype.superClass = URule.menu.AbstractMenu, URule.menu.Menu.prototype.constructor = URule.menu.Menu, URule.menu.Menu.prototype.createDom = function () {
            var t, e, n, r;
            t = this.compress ? " compressed-context" : "", e = (r = $("<ul class='dropdown-menu dropdown-context" + t + "' style='font-size:12px'></ul>"))[0], this._dom = e;
            var i = this;
            if ((n = this.menuItems).length > 20) {
                var o = $("<div style='margin-left: 2px;margin-right: 2px'>");
                o.append("<i class='glyphicon glyphicon-filter' style='color:#006600;margin-left: 2px;margin-right: 2px'></i>  "), this.search = $("<input type='text' class='form-control' placeholder='输入值后回车查询' style='width: 85%;display: inline-block;height: 26px;padding: 1px;font-size: 12px;'>"), o.append(this.search), r.append(o), this.search.click(function (t) {
                    t.stopPropagation()
                }), this.search.dblclick(function (t) {
                    t.stopPropagation()
                }), this.search.keypress(function (t) {
                    var e = t.keyCode ? t.keyCode : t.which;
                    if ("13" === e || 13 === e) {
                        var r = $(this).val();
                        if (!i.oldSearchValue || i.oldSearchValue !== r) {
                            for (i.oldSearchValue = r; i.menuItems.length > 0;) i.menuItems[0].remove();
                            for (var o = 0; o < n.length; o++) {
                                var a = n[o], s = a.label;
                                r && "" !== r ? s && s.indexOf(r) > -1 && i.addMenuItem(a) : i.addMenuItem(a)
                            }
                        }
                    }
                })
            }
            this.menuItems = [];
            for (var a = 0; a < n.length; a++) this.addMenuItem(n[a]);
            return e
        }, URule.menu.Menu.prototype.addMenuItem = function (menuItem) {
            var item;
            return item = menuItem instanceof URule.menu.MenuItem ? menuItem : menuItem.$type ? eval("(URule.menu." + menuItem.$type + "(menuItem))") : new URule.menu.MenuItem(menuItem), item.parent = this, item.render(this.getDom()), this.menuItems.push(item), item
        }, URule.menu.Menu.prototype.getMenuItem = function (t) {
            for (var e, n = 0; n < this.menuItems.length; n++) {
                if (e = this.menuItems[n], "string" != typeof t) return this.menuItems[t];
                if (e.name === t) return e;
                if (e.subMenu && (e = e.subMenu.getMenuItem(t))) return e
            }
        }, URule.menu.Menu.prototype.remove = function () {
            URule.menu.Menu.prototype.superClass.prototype.remove.call(this), this.parent && (this.parent.subMenu = null, this.parent.getDom().removeClass("dropdown-submenu"))
        }, URule.menu.Menu.prototype.show = function (t) {
            t.preventDefault(), t.stopPropagation(), this.render(), $(".modal").removeAttr("tabindex");
            for (var e = $(this.getDom()), n = $(t.target), r = 3; !n.is("body");) {
                var i = n.css("z-index");
                if (!isNaN(i) && "0" !== i) {
                    r = parseInt(i) + 1;
                    break
                }
                n = n.parent()
            }
            if (e.css("z-index", r), $(".dropdown-context:not(.dropdown-context-sub)").hide(), "boolean" == typeof this.above && this.above) e.addClass("dropdown-context-up").css({
                top: t.pageY - 20 - e.height(),
                left: t.pageX - 13
            }).fadeIn(this.fadeSpeed); else if ("string" == typeof this.above && "auto" == this.above) {
                e.removeClass("dropdown-context-up");
                var o = e.height() + 10;
                t.pageY + o > $("html").height() + 10 && t.pageY > o ? e.addClass("dropdown-context-up").css({
                    top: t.pageY - 20 - o,
                    left: t.pageX - 13
                }).fadeIn(this.fadeSpeed) : e.css({top: t.pageY + 10, left: t.pageX - 13}).fadeIn(this.fadeSpeed)
            }
            this.onShow && this.onShow(this)
        }, URule.menu.Menu.prototype.hide = function () {
            var t = $(this._dom);
            t.is(":visible") && (this.onHide && this.onHide(this), t.fadeOut(this.fadeSpeed, function () {
                t.css({display: ""}).find(".drop-left").removeClass("drop-left")
            }), this.parent && this.parent.parent.hide())
        }, URule.menu.MenuItem = function (t) {
            URule.menu.MenuItem.prototype.superClass.call(this, t), $.extend(this, t)
        }, URule.menu.MenuItem.prototype = new URule.menu.AbstractMenu, URule.menu.MenuItem.prototype.superClass = URule.menu.AbstractMenu, URule.menu.MenuItem.prototype.constructor = URule.menu.MenuItem, URule.menu.MenuItem.prototype.createDom = function () {
            var t, e, n;
            return n = this, t = $("<li style='cursor: default'></li>"), this._dom = t[0], e = this.icon ? "<i class='" + this.icon + "'></i> " + this.label : this.label, t.on("mouseenter", function () {
                t.siblings(".dropdown-submenu").each(function () {
                    $(this).find("ul.dropdown-context-sub").each(function () {
                        var t = $(this).data("ref");
                        $(this).fadeOut(t.fadeSpeed)
                    })
                })
            }), "divider" === this.type ? (t.addClass("divider"), t.append(e)) : "header" == this.type ? (t.addClass("nav-header"), t.append(e)) : (t.append("<a>" + e + "</a>"), this.subMenu && this.setSubMenu(this.subMenu)), n.onClick && (this.parent && this.parent.search ? (t.click(function (t) {
                t.stopPropagation()
            }), t.dblclick(function (t) {
                n.onClick(n, {event: t}), t.preventDefault(), t.stopPropagation(), n.parent.hide()
            })) : t.click(function (t) {
                t.preventDefault(), t.stopPropagation(), n.onClick(n, {event: t}), n.parent.hide()
            })), t[0]
        }, URule.menu.MenuItem.prototype.setSubMenu = function (t) {
            var e, n;
            return e = (n = this).getDom(), t instanceof URule.menu.Menu ? n.subMenu = t : n.subMenu = new URule.menu.Menu(t), n.subMenu.parent = this, $(e).attr("class", "dropdown-submenu").mouseover(function () {
                var t = $(this).find(".dropdown-context-sub:first");
                t.width() + t.offset().left > window.innerWidth && t.addClass("drop-left"), $(n.subMenu.getDom()).fadeIn(n.subMenu.fadeSpeed)
            }), this.subMenu.render(e), $(this.subMenu.getDom()).addClass("dropdown-context-sub"), this.subMenu
        }, URule.menu.MenuItem.prototype.remove = function () {
            var t;
            URule.menu.MenuItem.prototype.superClass.prototype.remove.call(this), t = this.parent.menuItems.indexOf(this), this.parent.menuItems.splice(t, 1)
        }, URule.menu.MenuItem.prototype.show = function () {
            $(this._dom).show()
        }, URule.menu.MenuItem.prototype.hide = function () {
            $(this._dom).hide()
        }, $(document).on("dblclick", "html", function () {
            $(".dropdown-context").each(function () {
                $(this).data("ref").hide()
            })
        }), URule.menu.AbstractMenu.preventDoubleContext && $(document).on("contextmenu", ".dropdown-context", function (t) {
            t.preventDefault()
        })
    }()
}