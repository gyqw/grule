var func233 = function (t, e, n) {
    "use strict";
    urule.SimpleArithmetic = function () {
        this.container = $("<span>"), this.selectorLabel = generateContainer(), URule.setDomContent(this.selectorLabel, "."), this.selectorLabel.css({color: "#FFF"}), this.operator = "", this.container.append(this.selectorLabel), this.value = null;
        var t = this, e = function (e) {
            t.setOperator(e.name)
        };
        t.menu = new URule.menu.Menu({
            menuItems: [{label: "+", name: "Add", onClick: e}, {
                label: "-",
                name: "Sub",
                onClick: e
            }, {label: "x", name: "Mul", onClick: e}, {label: "÷", name: "Div", onClick: e}, {
                label: "%",
                name: "Mod",
                onClick: e
            }, {
                label: "删除", onClick: function () {
                    t.value && (t.value.getContainer().remove(), t.operator = null, t.value = null, URule.setDomContent(t.selectorLabel, "."), t.selectorLabel.css({
                        color: "#FFF",
                        "padding-left": "0px",
                        "padding-right": "0px"
                    }))
                }
            }]
        }), this.selectorLabel.click(function (e) {
            t.menu.show(e)
        })
    }, urule.SimpleArithmetic.prototype.initData = function (t) {
        if (t) {
            var e = t.type;
            this.setOperator(e), this.value.initData(t.value)
        }
    }, urule.SimpleArithmetic.prototype.setOperator = function (t) {
        window._setDirty(), this.operator = t;
        var e = "";
        switch (t) {
            case"Add":
                e = "+";
                break;
            case"Sub":
                e = "-";
                break;
            case"Mul":
                e = "x";
                break;
            case"Div":
                e = "÷";
                break;
            case"Mod":
                e = "%"
        }
        this.selectorLabel.css({
            color: "green",
            fontWeight: "blod",
            "padding-left": "5px",
            "padding-right": "5px"
        }), URule.setDomContent(this.selectorLabel, e), this.value || (this.simpleArithmetic = new urule.SimpleArithmetic, this.value = new urule.SimpleValue(this.simpleArithmetic), this.container.append(this.value.getContainer()))
    }, urule.SimpleArithmetic.prototype.toXml = function () {
        if (!this.operator || "" == this.operator) return "";
        if (!this.value) throw"请输入具体值！";
        var t = this.value.getValue();
        if ("" == t) throw"请输入具体值！";
        var e = '<simple-arith type="' + this.operator + '" value="' + t + '">';
        return (e += this.simpleArithmetic.toXml()) + "</simple-arith>"
    }, urule.SimpleArithmetic.prototype.getContainer = function () {
        return this.container
    }
}