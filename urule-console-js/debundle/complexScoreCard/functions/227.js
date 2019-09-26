var func227 = function (t, e, n) {
    "use strict";
    urule.ParameterValue = function (t, e, n) {
        this.arithmetic = t, this.container = $("<span>"), this.label = generateContainer(), this.container.append(this.label), this.label.css({color: "#6b3db0"}), URule.setDomContent(this.label, "请选择参数"), t && this.container.append(t.getContainer()), e && this.initData(e), window._ParameterValueArray.push(this), this.act = n, this.initMenu()
    }, urule.ParameterValue.prototype.getDisplayContainer = function () {
        var t = $("<span>参数." + this.parameterLabel + "</span>");
        if (this.arithmetic) {
            var e = this.arithmetic.getDisplayContainer();
            e && t.append(e)
        }
        return t
    }, urule.ParameterValue.prototype.matchAct = function (t) {
        return !this.act || t.indexOf(this.act) > -1
    }, urule.ParameterValue.prototype.registerClick = function (t) {
        this.callback = t
    }, urule.ParameterValue.prototype.initMenu = function (t) {
        var e, n, r, i = window._uruleEditorParameterLibraries;
        t && (i = t), i && (e = this, n = function (t) {
            var n = {variableName: t.name, variableLabel: t.label, datatype: t.datatype};
            e.setValue(n), e.callback && (n.type = "parameter", e.callback(n))
        }, r = {menuItems: []}, $.each(i, function (t, i) {
            $.each(i || [], function (t, i) {
                if (e.matchAct(i.act)) {
                    var o = {name: i.name, label: i.label, datatype: i.type, act: i.act, onClick: n};
                    r.menuItems.push(o)
                }
            })
        }), e.menu ? e.menu.setConfig(r) : e.menu = new URule.menu.Menu(r), this.label.click(function (t) {
            e.menu.show(t)
        }))
    }, urule.ParameterValue.prototype.setValue = function (t) {
        this.parameterName = t.variableName, this.parameterLabel = t.variableLabel, this.datatype = t.datatype, URule.setDomContent(this.label, "参数." + this.parameterLabel), window._setDirty()
    }, urule.ParameterValue.prototype.initData = function (t) {
        this.setValue(t), this.arithmetic && this.arithmetic.initData(t.arithmetic)
    }, urule.ParameterValue.prototype.toXml = function () {
        if (!this.parameterLabel || "" == this.parameterLabel) throw"参数不能为空！";
        return ' var-category="参数" var="' + this.parameterName + '" var-label="' + this.parameterLabel + '" datatype="' + this.datatype + '"'
    }, urule.ParameterValue.prototype.getContainer = function () {
        return this.container
    }
}