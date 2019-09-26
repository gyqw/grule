var func223 = function (t, e, n) {
    "use strict";
    urule.FunctionValue = function (t, e, n) {
        this.arithmetic = t, this.container = $("<span>"), this.rule = n, this.leftParn = $("<span style='color:blue'>(</span>"), this.rightParn = $("<span style='color:blue'>)</span>"), this.label = generateContainer(), this.container.append(this.label), this.label.css({color: "#008080"}), this.functionContainer = $("<span></span>"), this.container.append(this.functionContainer), URule.setDomContent(this.label, "请选择函数"), t && this.container.append(t.getContainer()), e && (this.setFunction(e), t && t.initData(e.arithmetic)), window._FunctionValueArray.push(this), this.initMenu()
    }, urule.FunctionValue.prototype.getDisplayContainer = function () {
        var t = $("<span>" + this.functionName + "</span>");
        if (this.arithmetic) {
            var e = this.arithmetic.getDisplayContainer();
            e && t.append(e)
        }
        return t
    }, urule.FunctionValue.prototype.toXml = function () {
        if (!this.functionLabel) throw"请选择函数";
        if (!this.functionName) throw"请选择函数";
        return ' function-label="' + this.functionLabel + '"' + ' function-name="' + this.functionName + '"'
    }, urule.FunctionValue.prototype.initMenu = function (t) {
        var e, n, r, i = window._uruleEditorFunctionLibraries;
        t && (i = t), e = this, n = function (t) {
            e.setFunction({parameter: t.parameter, label: t.label, name: t.name})
        }, r = {menuItems: []}, $.each(i || [], function (t, e) {
            r.menuItems.push({name: e.name, label: e.label, parameter: e.argument, onClick: n})
        }), e.menu ? e.menu.setConfig(r) : e.menu = new URule.menu.Menu(r), this.label.click(function (t) {
            e.menu.show(t)
        })
    }, urule.FunctionValue.prototype.initData = function (t) {
        t && this.setFunction(t)
    }, urule.FunctionValue.prototype.setFunction = function (t) {
        window._setDirty(), this.functionContainer.empty(), URule.setDomContent(this.label, t.label), this.functionContainer.append(this.leftParn), this.functionLabel = t.label, this.functionName = t.name, this.parameter = new urule.FunctionParameter(this.rule), this.parameter.initData(t.parameter), this.functionContainer.append(this.parameter.getContainer()), this.functionContainer.append(this.rightParn)
    }, urule.FunctionValue.prototype.getFirstParameter = function () {
        return this.firstParameter
    }, urule.FunctionValue.prototype.getParameter = function () {
        return this.parameter
    }, urule.FunctionValue.prototype.getContainer = function () {
        return this.container
    }
}