var func224 = function (t, e, n) {
    "use strict";
    urule.FunctionParameter = function (t) {
        this.container = $("<span>"), this.nameContainer = $("<span>"), this.rule = t, this.container.append(this.nameContainer), this.nameContainer.css({color: "gray"})
    }, urule.FunctionParameter.prototype.initData = function (t) {
        if (t) {
            this.name = t.name, URule.setDomContent(this.nameContainer, this.name + ":"), (t.needProperty || t.property) && (this.functionProperty = new urule.FunctionProperty, this.functionProperty.setProperty({
                name: t.property,
                label: t.propertyLabel
            })), this.inputType = new urule.InputType(null, null, this.functionProperty, this.rule);
            var e = t.objectParameter;
            if (e) {
                var n = e.valueType;
                this.inputType.setValueType(n, e)
            }
            this.container.append(this.inputType.getContainer()), this.functionProperty && (this.container.append($("<span>，</span>")), this.container.append($("<span style='color:gray'>属性:</span>")), this.container.append(this.functionProperty.getContainer()))
        }
    }, urule.FunctionParameter.prototype.toXml = function () {
        if (!this.name) return "";
        var t = "<function-parameter ";
        return t += 'name="' + this.name + '" ', this.functionProperty && (t += this.functionProperty.toXml()), t += ">", (t += this.inputType.toXml()) + "</function-parameter>"
    }, urule.FunctionParameter.prototype.getContainer = function () {
        return this.container
    }
}