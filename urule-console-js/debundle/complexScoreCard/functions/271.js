var func271 = function (t, e, n) {
    "use strict";
    urule.Condition = function (t) {
        this.container = $("<span>"), t.append(this.container);
        var e = this;
        this.operator = new urule.ComparisonOperator(function () {
            e.inputType = e.operator.getInputType(), e.inputType && e.container.append(e.inputType.getContainer())
        }), e.container.append(this.operator.getContainer())
    }, urule.Condition.prototype.initData = function (t) {
        var e = t.op;
        this.operator.setOperator(e), this.operator.initRightValue(t.value), this.inputType = this.operator.getInputType(), this.inputType && this.container.append(this.inputType.getContainer())
    }, urule.Condition.prototype.getDisplayContainer = function () {
        var t = $("<span>"), e = URule.getDomContent(this.operator.getContainer());
        return t.append($("<span style='color:blue'>" + e + "</span>")), this.inputType && t.append(this.inputType.getDisplayContainer()), t
    }, urule.Condition.prototype.toXml = function () {
        var t = '<condition op="' + this.operator.getOperator() + '">';
        return this.inputType && (t += this.inputType.toXml()), t + "</condition>"
    }, urule.Condition.prototype.getOperator = function () {
        return this.operator
    }, urule.Condition.prototype.getInputType = function () {
        return this.inputType
    }
}