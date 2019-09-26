var func270 = function (t, e, n) {
    "use strict";
    urule.Join = function (t) {
        this.type = "and", this.context = t, this.H = 30, this.W = 60, this.children = [], this.joinContainer = $("<span class='btn btn-default dropdown-toggle'></span>"), this.joinContainer.css({
            border: "solid gray 1px",
            padding: "3px",
            background: "#fff"
        }), this.joinLabel = $("<span>并且</span>"), this.joinContainer.append(this.joinLabel)
    }, urule.Join.prototype.initData = function (t) {
        var e = [], n = t.conditions, r = t.joints;
        if (this.setType(t.type), n && (e = n), r && (e = e.concat(r)), 0 != e.length) for (var i = 0; i < e.length; i++) {
            var o = e[i], a = !1;
            o.type && (a = !0);
            var s = this.addItem(a);
            a ? s.getJoin().initData(o) : s.getCondition().initData(o)
        }
    }, urule.Join.prototype.setType = function (t) {
        this.type = t, "or" == t ? URule.setDomContent(this.joinLabel, "或者") : URule.setDomContent(this.joinLabel, "并且"), window._setDirty()
    }, urule.Join.prototype.init = function (t) {
        t && (this.parentConnection = t, this.parent = t.getParentJoin());
        var e = $('<i class="glyphicon glyphicon-chevron-down rule-join-node"></i>'), n = this;
        n.menu = new URule.menu.Menu({
            menuItems: [{
                label: "并且", onClick: function () {
                    n.setType("and")
                }
            }, {
                label: "或者", onClick: function () {
                    n.setType("or")
                }
            }, {
                label: "添加条件", onClick: function () {
                    n.addItem(!1)
                }
            }]
        }), this.joinContainer.click(function (t) {
            n.menu.show(t)
        }), this.joinContainer.append(e)
    }, urule.Join.prototype.clean = function () {
        for (; this.children.length > 0;) {
            var t = this.children[0];
            this.removeConnection(t)
        }
    }, urule.Join.prototype.removeConnection = function (t) {
        var e = this.children.indexOf(t);
        this.children.length > 1 && this.resetItemPosition(e + 1, !1), t.remove(), this.children.splice(e, 1), this.resetContainerSize(), window._setDirty()
    }, urule.Join.prototype.addItem = function (t) {
        window._setDirty();
        var e = this.getChildrenCount();
        if (e > 0 && this.parent) {
            var n = this.parent.getChildren().indexOf(this.parentConnection);
            this.parent.resetItemPosition(n + 1, !0)
        }
        var r = e * this.H, i = parseInt(this.joinContainer.css("left")), o = parseInt(this.joinContainer.css("top")),
            a = i + this.W / 2, s = o + this.H / 5, c = a + this.W - 25, f = s + r;
        t && (f -= 5);
        var u = new urule.Connection(this.context, t, this);
        return u.drawPath(a, s, c, f), this.children.push(u), this.resetContainerSize(), u
    }, urule.Join.prototype.toXml = function () {
        for (var t = '<joint type="' + this.type + '">', e = 0; e < this.children.length; e++) t += this.children[e].toXml();
        return t + "</joint>"
    }, urule.Join.prototype.resetItemPosition = function (t, e) {
        if (-1 != t) {
            for (var n = t; n < this.children.length; n++) {
                var r = this.children[n], i = this.H;
                e || (i = -this.H), r.setEndY(r.getEndY() + i), 0 == t && r.setStartY(r.getStartY() + i), r.update(e)
            }
            if (t > 0 && this.parent) {
                var o = this.parent.getChildren().indexOf(this.parentConnection);
                this.parentConnection.getParentJoin().resetItemPosition(o + 1, e)
            }
            window._setDirty()
        }
    }, urule.Join.prototype.resetContainerSize = function () {
        var t = this.context.getCanvas(), e = t.css("height");
        e = parseInt(e);
        var n = this.context.getTotalChildrenCount();
        0 == n && (n = 1);
        var r = n * this.H + 10;
        t.css({height: r + "px"})
    }, urule.Join.prototype.getChildrenCount = function () {
        for (var t = 0, e = 0; e < this.children.length; e++) {
            var n = this.children[e].getJoin();
            if (n) {
                var r = n.getChildrenCount();
                0 == r && (r = 1), t += r
            } else t++
        }
        return t
    }, urule.Join.prototype.initTopJoin = function (t) {
        this.joinContainer.css({
            position: "absolute",
            left: 5,
            top: 5
        }), t.append(this.joinContainer), this.context.setRootJoin(this)
    }, urule.Join.prototype.getDisplayContainer = function () {
        if (0 == this.children.length) return null;
        for (var t = $("<span>"), e = 0; e < this.children.length; e++) {
            var n = this.children[e].getDisplayContainer();
            n && (e > 0 && ("or" == this.type ? t.append($("<span style='color:green'>&nbsp或&nbsp</span>")) : t.append($("<span style='color:red'>&nbsp并且&nbsp</span>"))), t.append(n))
        }
        return t
    }, urule.Join.prototype.getChildren = function () {
        return this.children
    }, urule.Join.prototype.getContainer = function () {
        return this.joinContainer
    }
}