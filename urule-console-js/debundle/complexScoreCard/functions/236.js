var func236 = function (t, e, n) {
    "use strict";
    urule.ComplexArithmetic = function (t) {
        this.container = $("<span>"), this.operator = "", this.rule = t, this.selectorLabel = generateContainer(), this.selectorLabel.css({fontWeight: "blod"}), this.container.append(this.selectorLabel), this.nextType = null;
        var e = this, n = function (t) {
            e.setOperator(t.name)
        };
        e.menu = new URule.menu.Menu({
            menuItems: [{label: "+", name: "Add", onClick: n}, {
                label: "-",
                name: "Sub",
                onClick: n
            }, {label: "x", name: "Mul", onClick: n}, {label: "÷", name: "Div", onClick: n}, {
                label: "%",
                name: "Mod",
                onClick: n
            }, {
                label: "删除", onClick: function () {
                    window._setDirty(), e.nextType && (e.nextType.getContainer().remove(), e.nextType = null, URule.setDomContent(e.selectorLabel, "."), e.selectorLabel.css({
                        color: "#fff",
                        "padding-left": "0px",
                        "padding-right": "0px"
                    }))
                }
            }]
        }), this.selectorLabel.click(function (t) {
            e.menu.show(t)
        })
    }, urule.ComplexArithmetic.prototype.setOperator = function (t) {
        switch (window._setDirty(), this.operator = t, this.info = "", t) {
            case"Add":
                this.info = "+";
                break;
            case"Sub":
                this.info = "-";
                break;
            case"Mul":
                this.info = "x";
                break;
            case"Div":
                this.info = "÷";
                break;
            case"Mod":
                this.info = "%"
        }
        URule.setDomContent(this.selectorLabel, this.info), this.selectorLabel.css({
            color: "green",
            "padding-left": "4px"
        }), this.nextType || (this.nextType = new urule.NextType(this.rule), this.container.append(this.nextType.getContainer()))
    }, urule.ComplexArithmetic.prototype.initData = function (t) {
        if (t) {
            var e = t.type;
            this.setOperator(e), this.nextType.initData(t)
        }
    }, urule.ComplexArithmetic.prototype.getDisplayContainer = function () {
        if (this.nextType) {
            var t = $("<span>" + this.info + "</span>");
            return t.append(this.nextType.getDisplayContainer()), t
        }
        return null
    }, urule.ComplexArithmetic.prototype.toXml = function () {
        if (!this.nextType) return "";
        var t = '<complex-arith type="' + this.operator + '">';
        return (t += this.nextType.toXml()) + "</complex-arith>"
    }, urule.ComplexArithmetic.prototype.getContainer = function () {
        return this.container
    }
}