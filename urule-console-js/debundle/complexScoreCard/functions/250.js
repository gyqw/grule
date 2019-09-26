var func250 = function (t, e, n) {
    "use strict";
    var r, i = (r = n(197)) && r.__esModule ? r : {default: r};
    urule.Context = function (t, e) {
        this.container = t, this.paper = new i.default(this.container.get(0), "100%", "100%"), this.rule = e
    }, urule.Context.prototype.getCanvas = function () {
        return this.container
    }, urule.Context.prototype.getPaper = function () {
        return this.paper
    }, urule.Context.prototype.setRootJoin = function (t) {
        this.rootJoin = t
    }, urule.Context.prototype.getRootJoin = function () {
        return this.rootJoin
    }, urule.Context.prototype.getTotalChildrenCount = function () {
        return this.rootJoin.getChildrenCount()
    }
}