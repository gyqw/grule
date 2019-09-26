var func235 = function (t, e, n) {
    "use strict";
    urule.VariableValue = function (t, e, n, r) {
        this.arithmetic = t, this.container = $("<span>"), this.label = generateContainer(), this.functionProperty = r, this.container.append(this.label), this.label.css({color: "darkcyan"}), URule.setDomContent(this.label, "请选择变量"), t && this.container.append(t.getContainer()), e && this.initData(e), window._VariableValueArray.push(this), this.act = n, this.initMenu()
    }, urule.VariableValue.prototype.registerClick = function (t) {
        this.callback = t
    }, urule.VariableValue.prototype.getDisplayContainer = function () {
        var t = $("<span>" + this.category + "." + this.variableLabel + "</span>");
        if (this.arithmetic) {
            var e = this.arithmetic.getDisplayContainer();
            e && t.append(e)
        }
        return t
    }, urule.VariableValue.prototype.matchAct = function (t) {
        return !this.act || t.indexOf(this.act) > -1
    }, urule.VariableValue.prototype.initMenu = function (t) {
        var e, n, r, i, o = window._uruleEditorVariableLibraries;
        t && (o = t), o && (e = this, n = function (t) {
            var n = {variableCategory: t.label, variables: t.variables};
            e.setValue(n), e.callback && (n.type = "variable", e.callback(n))
        }, r = function (t) {
            var n = {
                variables: t.parent.parent.variables,
                variableCategory: t.parent.parent.label,
                variableLabel: t.label,
                variableName: t.name,
                datatype: t.datatype
            };
            e.setValue(n), e.callback && (n.type = "variable", e.callback(n))
        }, i = {menuItems: []}, $.each(o, function (t, o) {
            $.each(o, function (t, o) {
                var a = o.variables;
                e.functionProperty && e.category && o.name == e.category && e.functionProperty.initMenu(a);
                var s = {label: o.name, variables: a, onClick: n};
                $.each(a || [], function (t, n) {
                    if (s.subMenu || (s.subMenu = {menuItems: []}), e.matchAct(n.act)) {
                        var i = {name: n.name, label: n.label, datatype: n.type, act: n.act, variables: a, onClick: r};
                        s.subMenu.menuItems.push(i)
                    }
                }), i.menuItems.push(s)
            })
        }), e.menu ? e.menu.setConfig(i) : e.menu = new URule.menu.Menu(i), this.label.click(function (t) {
            e.menu.show(t)
        }))
    }, urule.VariableValue.prototype.setValue = function (t) {
        this.category = t.variableCategory, this.variableName = t.variableName, this.variableLabel = t.variableLabel, this.datatype = t.datatype, this.functionProperty && this.functionProperty.initMenu(t.variables), this.variableLabel ? URule.setDomContent(this.label, this.category + "." + this.variableLabel) : URule.setDomContent(this.label, this.category), window._setDirty()
    }, urule.VariableValue.prototype.initData = function (t) {
        this.setValue(t), this.arithmetic && this.arithmetic.initData(t.arithmetic)
    }, urule.VariableValue.prototype.toXml = function () {
        if (!this.category || "" == this.category) throw"变量不能为空！";
        var t = 'var-category="' + this.category + '"';
        return this.variableName && (t += ' var="' + this.variableName + '" var-label="' + this.variableLabel + '" datatype="' + this.datatype + '"'), t
    }, urule.VariableValue.prototype.getType = function () {
        return this.variableName ? "Variable" : "VariableCategory"
    }, urule.VariableValue.prototype.getContainer = function () {
        return this.container
    }
}