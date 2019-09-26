var func272 = function (t, e, n) {
    "use strict";
    window._conditionId = 0, urule.CellCondition = function (t) {
        this.container = $(t), this.container.css({height: "40px", position: "relative"});
        var e = new urule.Context(this.container);
        this.join = new urule.Join(e), this.join.init(null), this.join.initTopJoin(this.container), this.join.setType("and"), this.id = window._conditionId++
    }, urule.CellCondition.prototype.clean = function () {
        this.join.clean(), window._setDirty()
    }, urule.CellCondition.prototype.getId = function () {
        return this.id
    }, urule.CellCondition.prototype.renderTo = function (t) {
        t.append(this.container)
    }, urule.CellCondition.prototype.getDisplayContainer = function () {
        var t = null;
        return this.join && (t = this.join.getDisplayContainer()), t || (t = $("<span style='color:gray'>无</span>")), t
    }, urule.CellCondition.prototype.initData = function (t) {
        this.join && this.join.initData(t)
    }, urule.CellCondition.prototype.toXml = function () {
        return this.join.toXml()
    }
}