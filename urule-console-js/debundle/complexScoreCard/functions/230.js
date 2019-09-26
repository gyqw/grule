var func230 = function (t, e, n) {
    "use strict";
    urule.NextType = function (t) {
        this.container = $("<span>"), this.rule = t, this.inputType = null, this.paren = null, this.selectorLabel = generateContainer(), this.selectorLabel.css({
            fontWeight: "blod",
            color: "#fff"
        }), this.container.append(this.selectorLabel), URule.setDomContent(this.selectorLabel, ".");
        var e = this, n = function (t) {
            var n = t.name;
            e.doNext(n), window._setDirty()
        };
        e.menu = new URule.menu.Menu({
            menuItems: [{label: "值", name: "value", onClick: n}, {
                label: "括号",
                name: "paren",
                onClick: n
            }]
        }), this.selectorLabel.click(function (t) {
            e.menu.show(t)
        })
    }, urule.NextType.prototype.initData = function (t) {
        var e = t.value;
        if (e) {
            var n = e.valueType;
            "Paren" == n ? (this.doNext("paren"), this.paren.initData(e)) : (this.doNext("value"), this.inputType.setValueType(n, e))
        }
    }, urule.NextType.prototype.toXml = function () {
        if (this.paren) return this.paren.toXml();
        if (this.inputType) return this.inputType.toXml();
        throw"请选择具体值！"
    }, urule.NextType.prototype.getDisplayContainer = function () {
        return this.inputType ? this.inputType.getDisplayContainer() : this.paren ? this.paren.getDisplayContainer() : null
    }, urule.NextType.prototype.getContainer = function () {
        return this.container
    }, urule.NextType.prototype.doNext = function (t) {
        "value" == t ? (this.paren && (this.paren.getContainer().remove(), this.paren = null), this.inputType || (this.inputType = new urule.InputType(null, null, null, this.rule), this.container.append(this.inputType.getContainer()))) : "paren" == t && (this.inputType && (this.inputType.getContainer().remove(), this.inputType = null), this.paren || (this.paren = new urule.Paren(this.rule), this.container.append(this.paren.getContainer())))
    }
}