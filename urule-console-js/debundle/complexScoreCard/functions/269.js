var func269 = function (t, e, n) {
    "use strict";
    urule.Connection = function (t, e, n) {
        this.isJoin = e, this.context = t, this.parentJoin = n
    }, urule.Connection.prototype.drawPath = function (t, e, n, r) {
        this.startX = t, this.endX = n, this.isJoin ? (this.startY = e - 3, this.endY = r + 2) : (this.startY = e - 3, this.endY = r - 3), this.path = this.context.getPaper().path(this.buildPathInfo()), this.path.attr({stroke: "#777"}), this.isJoin ? this.initJoin() : this.initCondition()
    }, urule.Connection.prototype.toXml = function () {
        return this.isJoin ? this.join.toXml() : this.condition.toXml()
    }, urule.Connection.prototype.initJoin = function () {
        this.join = new urule.Join(this.context), this.join.init(this);
        var t = this.join.getContainer(), e = this.endX + 10 + "px", n = this.endY + "px";
        t.css({position: "absolute", left: e, top: n}), this.context.getCanvas().append(t)
    }, urule.Connection.prototype.getDisplayContainer = function () {
        return this.join ? this.join.getDisplayContainer() : this.condition.getDisplayContainer()
    }, urule.Connection.prototype.remove = function () {
        this.path.remove(), this.join ? this.join.getContainer().remove() : this.conditionContainer.remove(), window._setDirty()
    }, urule.Connection.prototype.initCondition = function () {
        this.conditionContainer = $("<div>");
        var t = this.endX + 10 + "px", e = this.endY + "px";
        this.conditionContainer.css({
            position: "absolute",
            left: t,
            top: e
        }), this.condition = new urule.Condition(this.conditionContainer);
        var n = $('<i class="glyphicon glyphicon-trash" style="color: #019dff;cursor: pointer;font-size: 9pt;padding-left:5px"></i>'),
            r = this;
        n.click(function () {
            r.parentJoin.removeConnection(r)
        }), this.conditionContainer.append(n), this.context.getCanvas().append(this.conditionContainer)
    }, urule.Connection.prototype.update = function (t) {
        var e = this.buildPathInfo();
        this.path.attr("path", e);
        var n = this.endY + "px";
        this.conditionContainer ? this.conditionContainer.css({top: n}) : this.join.getContainer().css({top: n}), this.join && this.join.resetItemPosition(0, t)
    }, urule.Connection.prototype.getParentJoin = function () {
        return this.parentJoin
    }, urule.Connection.prototype.getCondition = function () {
        return this.condition
    }, urule.Connection.prototype.getJoin = function () {
        return this.join
    }, urule.Connection.prototype.getStartX = function () {
        return this.startX
    }, urule.Connection.prototype.getStartY = function () {
        return this.startY
    }, urule.Connection.prototype.getEndX = function () {
        return this.endX
    }, urule.Connection.prototype.getEndY = function () {
        return this.endY
    }, urule.Connection.prototype.setStartX = function (t) {
        this.startX = t
    }, urule.Connection.prototype.setStartY = function (t) {
        this.startY = t
    }, urule.Connection.prototype.setEndX = function (t) {
        this.endX = t
    }, urule.Connection.prototype.setEndY = function (t) {
        this.endY = t
    }, urule.Connection.prototype.buildPathInfo = function () {
        return "M" + (this.startX + 10) + "," + (this.startY + 8) + " C" + (this.startX + 10) + "," + (this.endY + 8) + "," + (this.startX + 10) + "," + (this.endY + 8) + "," + (this.endX + 10) + "," + (this.endY + 8)
    }
}