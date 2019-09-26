var func228 = function (t, e, n) {
    "use strict";
    urule.MethodParameter = function (t) {
        this.inputType = new urule.InputType(null, null, null, t), this.container = this.inputType.getContainer()
    }, urule.MethodParameter.prototype.initData = function (t) {
        if (t && (this.name = t.name, this.type = t.type, t.value)) {
            var e = t.value;
            e.valueType && this.inputType.setValueType(e.valueType, e)
        }
    }, urule.MethodParameter.prototype.toXml = function () {
        var t = '<parameter name="' + this.name + '" type="' + this.type + '">';
        return (t += this.inputType.toXml()) + "</parameter>"
    }, urule.MethodParameter.prototype.getContainer = function () {
        return this.container
    }, urule.MethodParameter.prototype.getInputType = function () {
        return this.inputType
    }
}